import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export interface TextFieldElementProps
  extends Omit<TextFieldProps, "defaultValue"> {
  id?: string;
  defaultValue?: any;
  readOnly?: boolean;
}

const TextFieldElement = React.forwardRef<
  HTMLDivElement,
  TextFieldElementProps
>((props: TextFieldElementProps, ref: any) => {
  const { id, readOnly, required, ...rest } = props;

  return (
    <TextField
      ref={ref}
      inputProps={{
        autoComplete: "off",
      }}
      size="small"
      fullWidth
      variant="outlined"
      {...rest}
      InputProps={{
        readOnly: readOnly,
        ...rest?.InputProps,
      }}
      InputLabelProps={{
        shrink: true,
        required: required,
        ...rest.InputLabelProps,
      }}
    />
  );
});

export default TextFieldElement;
