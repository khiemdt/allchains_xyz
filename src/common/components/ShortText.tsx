import { Typography } from "@mui/material";
import { useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useGeneralHook from "../hook/useGeneralHook";

interface Props {
  text: string;
  start?: number;
  end?: number;
}
const ShortText = (props: Props) => {
  const { openSnackbar, intl } = useGeneralHook();
  const { text, start, end } = props;

  const shortText = useMemo(() => {
    if (text?.length > 13) {
      return `${text?.slice(0, start || 5)}...${text?.slice(end || -5)}`;
    }
    return text;
  }, [end, start, text]);

  return (
    <>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          openSnackbar({
            message: intl.formatMessage({ id: "copied" }),
          });
        }}
      >
        <Typography
          variant="inherit"
          color="inherit"
          component="span"
          style={{ cursor: "pointer" }}
        >
          {shortText}
        </Typography>
      </CopyToClipboard>
    </>
  );
};

export default ShortText;
