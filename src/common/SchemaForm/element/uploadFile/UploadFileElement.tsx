import DownloadIcon from "@mui/icons-material/Download";
import { Button, IconButton, InputAdornment } from "@mui/material";
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import useGeneralHook from "../../../hook/useGeneralHook";
import TextFieldElement, {
  TextFieldElementProps,
} from "../text-field/TextFieldElement";
export interface UploadFileElementProps
  extends Omit<TextFieldElementProps, "value"> {
  multiple?: boolean;
  accept?: string | undefined;
  value?: string | string[];
}

const UploadFileElement = React.forwardRef<
  HTMLDivElement,
  UploadFileElementProps
>((props: UploadFileElementProps, ref) => {
  const { onChange, multiple, accept, value, ...rest } = props;
  const { setLoading, dispatch, fetchThunk } = useGeneralHook();

  const sendFile = useCallback(
    async (files: FileList | null) => {
      if (!files) {
        return;
      }
      if (multiple) {
        setLoading(true);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
        // const json = await dispatch(
        //   fetchThunk(
        //     API_PATHS.upload.uploadMultiFile,
        //     "post",
        //     formData,
        //     "multipart/form-data"
        //   )
        // );
        // json.data && onChange && onChange(json.data);
      } else {
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
      }
    },
    [
      // API_PATHS.upload.uploadMultiFile,
      // API_PATHS.upload.uploadSingleFile,
      dispatch,
      fetchThunk,
      multiple,
      onChange,
      setLoading,
    ]
  );

  return (
    <TextFieldElement
      inputRef={ref}
      {...rest}
      value={Array.isArray(value) ? value?.join(",") : value || ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Button component="label" style={{ height: 24 }}>
              <input
                accept={accept || "image/png, image/jpeg, image/jpg"}
                hidden
                type="file"
                onChange={(e) => {
                  sendFile(e.target.files);
                }}
                multiple={multiple}
              />
              <FormattedMessage id="chooseFile" />
            </Button>
          </InputAdornment>
        ),
        endAdornment: value && typeof value === "string" && (
          <InputAdornment position="end">
            {/* <a href={API_PATHS.upload.getFile(value)} download> */}
            <IconButton
              component="label"
              style={{ padding: 4, marginRight: -8 }}
            >
              <DownloadIcon />
            </IconButton>
            {/* </a> */}
          </InputAdornment>
        ),
      }}
      readOnly={true}
      inputProps={{ multiple: multiple }}
    />
  );
});

export default UploadFileElement;
