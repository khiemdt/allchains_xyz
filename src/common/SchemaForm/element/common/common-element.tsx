/* eslint-disable react/destructuring-assignment */
import { Tooltip, Typography } from "@mui/material";
import React from "react";

export const RenderTag = (value: any[], e: any, label?: string) => {
  return (
    <Tooltip
      title={value.map((v) => (label ? v[label] : v.name)).join(",\r\n")}
    >
      <Typography
        variant="body2"
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: 200,
          paddingLeft: 8,
        }}
      >
        {value.map((v) => (label ? v[label] : v.name)).join(", ")}
      </Typography>
    </Tooltip>
  );
};
