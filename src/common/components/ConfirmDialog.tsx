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

export interface ParamsPromptConfirmation {
  title?: React.ReactNode | string;
  content?: React.ReactNode | string;
  dialogProps?: Omit<DialogProps, "open">;
  okId?: React.ReactNode | string;
  cancelId?: React.ReactNode | string;
  warning?: boolean;
  open?: boolean;
  close?: () => void;
  onOK?: () => void;
  onCancel?: () => void;
}
export interface ConfirmDialogParams {
  promptConfirmation: (setting?: ParamsPromptConfirmation) => Promise<unknown>;
  close: () => void;
  open: boolean;
  setOptions: React.Dispatch<React.SetStateAction<Props>>;
  resetSetting: () => void;
}

interface Props extends ParamsPromptConfirmation {
  children?: (params: ConfirmDialogParams) => React.ReactNode;
}

const ConfirmDialog = forwardRef((props: Props, ref) => {
  const { open, close: onCloseProps, onOK, onCancel } = props;
  const classes = useStyles();
  const [settings, setOptions] = useState<Props>(props);
  const [confirmDialogResolveRef, setConfirmDialogResolveRef] = React.useState<
    | {
        resolve?: (confirm: boolean) => void; //Đố biết sao phải để trong Object
      }
    | undefined
  >();
  const { warning, children, title, content, dialogProps, okId, cancelId } =
    settings;

  const promptConfirmation = useCallback(
    async (setting?: Omit<Props, "children">) => {
      setting && setOptions((old) => ({ ...old, ...setting }));
      const confirmTmp = await new Promise((resolve) => {
        setConfirmDialogResolveRef({ resolve });
      });
      return confirmTmp;
    },
    []
  );

  const close = useCallback(() => {
    setConfirmDialogResolveRef(undefined);
  }, []);

  const params: ConfirmDialogParams = useMemo(
    () => ({
      promptConfirmation,
      close,
      open: confirmDialogResolveRef?.resolve !== undefined,
      setOptions: (val) => setOptions((old) => ({ ...old, ...val })),
      resetSetting: () => setOptions(props),
    }),
    [promptConfirmation, close, confirmDialogResolveRef?.resolve, props]
  );

  const onClose = useCallback(() => {
    confirmDialogResolveRef?.resolve && confirmDialogResolveRef?.resolve(false);
    onCloseProps && onCloseProps();
    onCancel && onCancel();
  }, [confirmDialogResolveRef, onCancel, onCloseProps]);

  const onAccept = useCallback(() => {
    confirmDialogResolveRef?.resolve && confirmDialogResolveRef?.resolve(true);
    onCloseProps && onCloseProps();
    onOK && onOK();
  }, [confirmDialogResolveRef, onCloseProps, onOK]);

  const openDialog = confirmDialogResolveRef?.resolve !== undefined || !!open;

  useImperativeHandle(ref, () => params);

  return (
    <>
      {children && children(params)}
      <Dialog
        {...dialogProps}
        open={openDialog}
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
        <DialogActions style={{ padding: 16 }}>
          <Button
            variant="outlined"
            color="primary"
            classes={{ root: classes.button }}
            onClick={onClose}
          >
            {typeof cancelId !== "string" && typeof cancelId !== "undefined" ? (
              cancelId
            ) : (
              <FormattedMessage id={cancelId || "cancel"} />
            )}
          </Button>
          <Box marginLeft={2}>
            <Button
              color={warning ? "error" : "primary"}
              variant="contained"
              classes={{ root: classes.button }}
              onClick={onAccept}
            >
              {typeof okId !== "string" && typeof okId !== "undefined" ? (
                okId
              ) : (
                <FormattedMessage id={okId || "ok"} />
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default ConfirmDialog;
