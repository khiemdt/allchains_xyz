import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { some } from "../constants";
import { stringifyUrl } from "../utils";

export interface HookFilterProps extends ReturnType<typeof useFilterHook> {}

interface Props {
  defaultFilter?: some;
  getOldFilter?: boolean;
  disableLink?: boolean;
}

const useFilterHook = (props?: Props) => {
  const { defaultFilter = {}, getOldFilter, disableLink } = props || {};
  const location = useLocation();
  const [filter, setFilter] = useState<some>(defaultFilter);
  const history = useNavigate();
  const clearParams = useCallback(
    (value?: some) => {
      if (disableLink) {
        setFilter(value || defaultFilter);
      } else {
        history(
          {
            search: stringifyUrl({
              ...(filter?.tab ? { tab: filter.tab } : {}),
              ...(value || defaultFilter),
            }),
          },
          { replace: true, state: location.state }
        );
        setFilter({
          ...(filter?.tab ? { tab: filter.tab } : {}),
          ...(value || defaultFilter),
        });
      }
    },
    [defaultFilter, disableLink, filter.tab, history, location.state]
  );

  const setParams = useCallback(
    (form: some) => {
      if (disableLink) {
        setFilter({ ...filter, ...form });
      } else {
        history(
          {
            search: stringifyUrl({
              ...filter,
              ...form,
            }),
          },
          { replace: true, state: location.state }
        );
      }
    },
    [disableLink, filter, history, location]
  );

  useEffect(() => {
    if (!disableLink) {
      let tmp: some = {};
      const search = new URLSearchParams(location.search);
      search.forEach(function (value, key) {
        if (value.trim() !== "") {
          try {
            tmp[key] = JSON.parse(value);
          } catch (e) {
            tmp[key] = value;
          }
        } else {
          tmp[key] = undefined;
        }
      });

      if (getOldFilter) {
        setFilter((old) => ({ ...old, ...tmp }));
      } else {
        setFilter(tmp);
      }
    }
  }, [disableLink, getOldFilter, location.search]);

  return {
    filter,
    setParams,
    clearParams,
  };
};

export default useFilterHook;
