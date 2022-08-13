import Close from "@mui/icons-material/Close";
import {
  Box,
  Container,
  Dialog,
  DialogProps,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { HEADER_HEIGHT } from "../../layout/constants";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...(props as any)} />;
});

interface Props extends Omit<DialogProps, "onClose" | "title"> {
  onClose?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
  title?: React.ReactNode;
}

const DialogCustomFullScreen: React.FunctionComponent<Props> = (props) => {
  const { children, onClose, title, ...rest } = props;
  const [open, setOpen] = React.useState(rest.open);

  useEffect(() => {
    setOpen(rest.open);
  }, [rest.open]);

  return (
    <Dialog
      keepMounted={false}
      // transitionDuration={{ exit: 0 }}
      TransitionComponent={Transition}
      fullScreen
      {...rest}
      PaperProps={{
        ...rest.PaperProps,
        style: {
          top: HEADER_HEIGHT / 2,
          borderRadius: "16px 16px 0px 0px",
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          ...rest.PaperProps?.style,
        },
        sx: {
          bgcolor: "background.paper",
          backgroundImage: "unset",
        },
      }}
      onClose={(_, reason) => {
        if (reason === "escapeKeyDown") {
          onClose && onClose();
          setOpen(false);
        }
      }}
      open={open}
    >
      <IconButton
        onClick={() => {
          onClose && onClose();
          setOpen(false);
        }}
        sx={{
          position: "fixed",
          top: 6,
          right: 0,
          marginX: 2,
          marginY: 1,
          zIndex: 3,
          color: "white",
        }}
        size="small"
      >
        <Close />
      </IconButton>
      <Container maxWidth="md">
        <Box
          style={{
            top: 0,
            padding: "32px 16px 0px",
            zIndex: 2,
          }}
        >
          {typeof title === "string" ? (
            <Typography variant="h6">
              <FormattedMessage id={title} />
            </Typography>
          ) : (
            title
          )}
        </Box>
        <Box padding={2}>{children}</Box>
      </Container>
    </Dialog>
  );
};
export default DialogCustomFullScreen;
