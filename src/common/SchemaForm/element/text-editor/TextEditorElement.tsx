import { FormControl, InputLabel } from "@mui/material";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import React, { forwardRef, memo, useEffect, useRef } from "react";
import "./styles.scss";

export function extractHTMLContent(html) {
  if (!html) {
    return null;
  }
  return new DOMParser().parseFromString(html, "text/html").documentElement
    .textContent;
}

export interface TextEditorElementProps
  extends Omit<IAllProps, "defaultValue" | "onChange"> {
  readOnly?: boolean;
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  name?: string;
  height?: number | string;
}

interface Props extends TextEditorElementProps {}

const TextEditorElement = forwardRef((props: Props, ref: any) => {
  const {
    name,
    error,
    readOnly,
    required,
    label,
    className,
    disabled,
    value,
    onChange,
    height,
    ...rest
  } = props;
  const refTmp = useRef<any>(null);
  const editorRef = useRef<any>(null);

  const getEditorInstance = (evt: any, editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!!error) {
      editorRef.current.execCommand("mceFocus");
      refTmp?.current.scrollIntoView();
    }
  }, [error]);

  return (
    <FormControl
      error={!!error}
      className={!!error ? `${className} MuiFormControl-error` : className}
      fullWidth
      style={{ fontSize: 14 }}
      ref={refTmp}
    >
      {label && (
        <InputLabel required={required} shrink>
          {label}
        </InputLabel>
      )}
      <Editor
        apiKey="8391gf9rtzhu8mhsuzmx1uebstrxdhejzjym972rutkjwego"
        onInit={getEditorInstance}
        value={value}
        onEditorChange={(value) => {
          onChange && onChange(value);
        }}
        {...rest}
        init={{
          height: height || 360,
          menubar: false,
          branding: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "formatselect | " +
            "bold italic underline backcolor | alignleft aligncenter" +
            "alignright alignjustify | bullist numlist | " +
            "removeformat",
          content_style:
            "body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:16px } p {margin: 0}",
          ...rest.init,
        }}
        disabled={disabled || readOnly}
      />
    </FormControl>
  );
});

export default memo(TextEditorElement);
