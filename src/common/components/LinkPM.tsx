import { Tooltip } from "@mui/material";
import { get, uniq } from "lodash";
import React from "react";
import { LinkProps } from "react-router-dom";
import { some } from "../constants";
import useGeneralHook from "../hook/useGeneralHook";
import { RawLink } from "./elements";

interface Props extends LinkProps {
  permission?: string[][];
  tooltip?: React.ReactNode;
  arrow?: boolean;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}

const LinkPM = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { location } = useGeneralHook();

  const { children, to, permission, tooltip, placement, arrow, ...rest } =
    props;

  const getPropsTo = React.useMemo(() => {
    if (typeof to === "object") {
      return {
        ...to,
        state: {
          ...(get(location, "state", {}) as some),
          ...(get(to, "state", {}) as some),
          router: uniq([
            `${to.pathname}`,
            `${location.pathname}`,
            ...(get(location, "state.router", []) as string[]),
          ]),
        },
      };
    }
    return {
      pathname: to as string,
      state: {
        ...(get(location.state, "state", {}) as some),
        router: uniq([
          `${to}`,
          `${location.pathname}`,
          ...(get(location, "state.router", []) as string[]),
        ]),
      },
    };
  }, [location, to]);

  return (
    <Tooltip title={tooltip || ""} placement={placement || "top"} arrow>
      <RawLink to={getPropsTo as any} {...rest}>
        {children}
      </RawLink>
    </Tooltip>
  );
});

export default LinkPM;
