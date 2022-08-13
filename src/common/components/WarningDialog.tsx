import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
  paper: { minWidth: 460 },
  button: { minWidth: 110 },
}));

export interface ParamsPromptWarning {
  title?: React.ReactNode | string;
  content?: React.ReactNode | string;
  dialogProps?: Omit<DialogProps, "open">;
  okId?: React.ReactNode | string;
  onClose?: () => void;
}
export interface WaringDialogParams {
  openDialog: (params: ParamsPromptWarning) => void;
}

interface Props extends ParamsPromptWarning {
  children?: (params: WaringDialogParams) => React.ReactNode;
}

const WarningDialog = forwardRef((props: Props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [settings, setOptions] = useState<Props>(props);
  const { children, title, content, dialogProps, okId } = settings;

  const onClose = useCallback(() => {
    setOpen(false);
    props.onClose && props.onClose();
  }, [props]);

  const onOpen = useCallback((setting?: Omit<Props, "children">) => {
    setting && setOptions((old) => ({ ...old, ...setting }));
    setOpen(true);
  }, []);

  const params: WaringDialogParams = useMemo(
    () => ({
      open: open,
      openDialog: onOpen,
      onClose: onClose,
    }),
    [onClose, onOpen, open]
  );

  useImperativeHandle(ref, () => params);

  return (
    <>
      {children && children(params)}
      <Dialog
        {...dialogProps}
        open={open}
        classes={{ paper: classes.paper, ...dialogProps?.classes }}
        onClose={() => {
          onClose();
          setOptions(props);
        }}
        keepMounted={false}
      >
        <Box style={{ padding: 16, display: "flex", alignItems: "flex-end" }}>
          <Box flex={1}>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
          </Box>
        </Box>
        <DialogContent style={{ padding: 16 }}>
          <Typography variant="body1" component="div">
            {content}
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: 16, justifyContent: "center" }}>
          <Button
            color="primary"
            classes={{ root: classes.button }}
            onClick={onClose}
          >
            {typeof okId !== "string" && typeof okId !== "undefined" ? (
              okId
            ) : (
              <FormattedMessage id={okId || "ok"} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default WarningDialog;
