import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Close from "@mui/icons-material/Close";
import Delete from "@mui/icons-material/Delete";
import WarningRounded from "@mui/icons-material/WarningRounded";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import {
  alpha,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  Theme,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import useGeneralHook from "../../../hook/useGeneralHook";

export interface UploadImageElementProps {
  readOnly?: boolean;
  disabled?: boolean;
  accept?: string | undefined;
  value?: string;
  onChange?: (value?: string) => void;
  label?: React.ReactNode;
  required?: boolean;
  error?: boolean;
  limitSizeImage?: number;
  variant?: "square" | "rounded" | "circular" | undefined;
  style?: React.CSSProperties;
  avatarStyle?: React.CSSProperties;
  hideMessage?: boolean;
}

const UploadImageElement = React.forwardRef<
  HTMLInputElement,
  UploadImageElementProps
>((props: UploadImageElementProps, ref) => {
  const {
    onChange,
    readOnly,
    accept,
    value,
    required,
    label,
    error,
    limitSizeImage,
    variant,
    style,
    avatarStyle,
    disabled,
    hideMessage,
  } = props;
  const { setLoading, dispatch, fetchThunk, API_PATHS } = useGeneralHook();
  const [open, setOpen] = useState<boolean>(false);
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const disabledTmp = readOnly || disabled;
  const sendFile = useCallback(
    async (files: FileList | null) => {
      if (!files) {
        return;
      }

      if (limitSizeImage && files[0]?.size > limitSizeImage * 1000) {
        setOpenWarning(true);
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", files[0]);
      // const json = await dispatch(
      //   fetchThunk(
      //     API_PATHS.upload.uploadSingleFile,
      //     "post",
      //     formData,
      //     "multipart/form-data"
      //   )
      // );
      // json.data && onChange && onChange(json.data);
    },
    [limitSizeImage, setLoading]
  );

  return (
    <>
      <FormControl
        required={required}
        error={!!error}
        component="fieldset"
        fullWidth
      >
        <FormControlLabel
          style={{ alignItems: "flex-start", margin: 0, ...style }}
          control={
            <Box display="flex" alignItems="center">
              <Box
                position="relative"
                sx={{
                  "&:hover": {
                    "& .action-area": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <ButtonBase
                  sx={{
                    bgcolor: "background.paper",
                  }}
                  onClick={() => value && setOpen(true)}
                >
                  <Avatar
                    // src={value ? API_PATHS.upload.getFile(value) : undefined}
                    style={{ height: 128, width: 128, ...avatarStyle }}
                    variant={variant || "rounded"}
                  />
                </ButtonBase>
                <Box
                  className="action-area"
                  position="absolute"
                  bottom={0}
                  right={0}
                  left={0}
                  top={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ opacity: 0, transition: "0.3s all" }}
                >
                  {disabledTmp ? (
                    <ButtonBase
                      sx={{
                        bgcolor: "background.paper",
                        padding: 1,
                        borderRadius: "50%",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      <ZoomInIcon color="inherit" />
                    </ButtonBase>
                  ) : (
                    <Box display="flex">
                      {value && (
                        <ButtonBase
                          sx={{
                            bgcolor: "background.paper",
                            padding: 1,
                            borderRadius: "50%",
                            marginRight: 1,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onChange && onChange(undefined);
                          }}
                        >
                          <Delete color="inherit" fontSize="small" />
                        </ButtonBase>
                      )}
                      <ButtonBase
                        sx={{
                          bgcolor: "background.paper",
                          padding: 1,
                          borderRadius: "50%",
                        }}
                        component="label"
                      >
                        <AddAPhotoIcon
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: "tranlate(-50%,-50%)",
                            backgroundColor: "grey.100",
                          }}
                        />
                        <input
                          accept={accept || "image/*"}
                          ref={ref}
                          hidden
                          type="file"
                          multiple
                          onChange={(event) => {
                            if (
                              event.target.files &&
                              event.target.files?.length > 0
                            ) {
                              sendFile(event.target.files);
                            }
                          }}
                        />
                      </ButtonBase>
                    </Box>
                  )}
                </Box>
              </Box>
              {limitSizeImage && !hideMessage && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ marginLeft: 2 }}
                >
                  <FormattedMessage
                    id={"limitSizeImageNote"}
                    values={{ num: limitSizeImage }}
                  />
                </Typography>
              )}
            </Box>
          }
          label={
            <InputLabel
              required={required}
              style={{
                maxWidth: "unset",
                overflow: "unset",
              }}
            >
              {label}
            </InputLabel>
          }
          labelPlacement={"top"}
        />
      </FormControl>
      <Dialog
        open={openWarning}
        onClose={() => {
          setOpenWarning(false);
        }}
        PaperProps={{
          style: {
            minWidth: 250,
            textAlign: "center",
            padding: "16px 24px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <WarningRounded color="error" style={{ height: 160, width: "auto" }} />
        <Typography variant="body1">
          <FormattedMessage
            id={"limitSizeImage"}
            values={{ num: limitSizeImage }}
          />
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpenWarning(false)}
          style={{ marginTop: 16 }}
          fullWidth
        >
          <FormattedMessage id={"ok"} />
        </Button>
      </Dialog>
      <Dialog
        open={open}
        fullScreen
        PaperProps={{
          style: {
            alignItems: "center",
            justifyContent: "center",
            background: "unset",
          },
        }}
        onClose={() => setOpen(false)}
      >
        <ButtonBase
          sx={{
            padding: 1,
            borderRadius: "50%",
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: (theme: Theme) => alpha(theme.palette.common.black, 0.7),
          }}
          onClick={() => setOpen(false)}
        >
          <Close style={{ color: "white" }} />
        </ButtonBase>
        <Box position="relative" marginX="auto" maxWidth={"70vw"}>
          {/* {value && (
            <img
              alt="img"
              style={{
                maxWidth: "70vw",
                maxHeight: "80vh",
                objectFit: "cover",
              }}
              src={API_PATHS.upload.getFile(value)}
            />
          )} */}
        </Box>
      </Dialog>
    </>
  );
});

export default UploadImageElement;
