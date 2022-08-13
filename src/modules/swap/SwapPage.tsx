import { Box, Paper } from "@mui/material";
import React from "react";
import SettingBox from "./SettingBox";
import SwapContent from "./SwapContent";
import useSwapLogic from "./useSwapLogic";

interface Props {}

const SwapPage = (props: Props) => {
  const hook = useSwapLogic({});

  return (
    <Box
      style={{
        padding: "32px 42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 24,
      }}
    >
      <Paper
        style={{
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <SwapContent {...hook} />
        <SettingBox {...hook} />
      </Paper>
    </Box>
  );
};

export default SwapPage;
