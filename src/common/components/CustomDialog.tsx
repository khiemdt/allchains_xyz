import Close from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogProps,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

interface Props extends Omit<DialogProps, "onClose" | "title"> {
  onClose?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
  title?: React.ReactNode;
}

const CustomDialog: React.FunctionComponent<Props> = (props) => {
  const { children, onClose, title, ...rest } = props;
  const [open, setOpen] = React.useState(rest.open);

  useEffect(() => {
    setOpen(rest.open);
  }, [rest.open]);

  return (
    <Dialog
      keepMounted={false}
      {...rest}
      onClose={() => {
        onClose && onClose();
        setOpen(false);
      }}
      open={open}
    >
      <Box
        position="absolute"
        top={6}
        right={0}
        marginX={2}
        marginY={1}
        zIndex={3}
      >
        <IconButton
          onClick={() => {
            onClose && onClose();
            setOpen(false);
          }}
          size="small"
        >
          <Close />
        </IconButton>
      </Box>
      <Box bgcolor={"background.paper"} overflow="auto">
        <Box paddingX={2} paddingY={1}>
          {typeof title === "string" ? (
            <Typography variant="h4">
              <FormattedMessage id={title} />
            </Typography>
          ) : (
            title
          )}
        </Box>
        {children}
      </Box>
    </Dialog>
  );
};
export default CustomDialog;
