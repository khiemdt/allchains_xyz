import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE, some } from "../constants";
import { stringifyUrl } from "../utils";

const defaultPagination = {
  page: 0,
  pageSize: Number(Cookies.get(PAGE_SIZE)) || 10,
};
export interface HookPaginationProps
  extends ReturnType<typeof usePaginationHook> {}
interface Pagination {
  page: number;
  pageSize: number;
}
interface Props {
  defaultFilter?: some;
  getOldFilter?: boolean;
  disableLink?: boolean;
}
const usePaginationHook = (props?: Props) => {
  const { defaultFilter = {}, getOldFilter, disableLink } = props || {};
  const location = useLocation();
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [filter, setFilter] = useState<some>(defaultFilter);
  const history = useNavigate();
  const clearParams = useCallback(
    (value?: some) => {
      if (disableLink) {
        setPagination(defaultPagination);
        setFilter(value || defaultFilter);
      } else {
        history(
          {
            search: stringifyUrl({
              page: pagination.page,
              pageSize: pagination.pageSize,
              ...(filter?.tab ? { tab: filter.tab } : {}),
              ...(value || defaultFilter),
            }),
          },
          { replace: true, state: location.state }
        );
        setPagination(defaultPagination);
        setFilter({
          ...(filter?.tab ? { tab: filter.tab } : {}),
          ...(value || defaultFilter),
        });
      }
    },
    [
      defaultFilter,
      disableLink,
      filter.tab,
      history,
      location.state,
      pagination.page,
      pagination.pageSize,
    ]
  );

  const setParams = useCallback(
    (form: some) => {
      if (disableLink) {
        setPagination({
          page: form.page || pagination.page,
          pageSize: form.pageSize || pagination.pageSize,
        });
        setFilter({ ...filter, ...form });
      } else {
        history(
          {
            search: stringifyUrl({
              ...pagination,
              ...filter,
              page: 0,
              ...form,
            }),
          },
          { replace: true, state: location.state }
        );
      }
    },
    [disableLink, filter, history, location, pagination]
  );

  const onPageChange = useCallback(
    (event: unknown, newPage: number) => {
      if (disableLink) {
        setPagination((old) => ({ ...old, page: newPage }));
      } else {
        history(
          {
            search: stringifyUrl({ ...pagination, ...filter, page: newPage }),
          },
          { replace: true, state: location.state }
        );
      }
    },
    [disableLink, filter, history, location, pagination]
  );

  const onRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disableLink) {
        setPagination((old) => ({
          ...old,
          pageSize: parseInt(event.target.value, 10),
          page: 0,
        }));
      } else {
        history(
          {
            search: stringifyUrl({
              ...pagination,
              ...filter,
              pageSize: parseInt(event.target.value, 10),
              page: 0,
            }),
          },
          { replace: true, state: location.state }
        );
      }
    },
    [disableLink, filter, history, location, pagination]
  );

  useEffect(() => {
    Cookies.set(PAGE_SIZE, String(pagination.pageSize));
  }, [pagination.pageSize]);

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

      const { page, pageSize, ...rest } = tmp;

      setPagination({
        page: page || 0,
        pageSize: pageSize || Number(Cookies.get(PAGE_SIZE)) || 10,
      });
      if (getOldFilter) {
        setFilter((old) => ({ ...old, ...rest }));
      } else {
        setFilter(rest);
      }
    }
  }, [disableLink, getOldFilter, location.search]);

  const { tab, ...restFilter } = filter;

  return {
    pagination,
    filter,
    params: { ...pagination, ...restFilter } as some,
    tab,
    setParams,
    clearParams,
    onPageChange,
    onRowsPerPageChange,
  };
};

export default usePaginationHook;
