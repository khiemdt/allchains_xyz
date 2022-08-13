import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { memo } from "react";

const checkBoxStyle = makeStyles(() => ({
  inline: {
    marginTop: 20,
    marginLeft: 0,
    "&label": {
      fontSize: "inherit",
      overflow: "unset",
    },
  },
  column: {
    alignItems: "flex-start",
    marginLeft: 0,
  },
}));

export interface PropsCheckBoxElement
  extends Omit<CheckboxProps, "defaultValue"> {
  label?: React.ReactNode;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  fromControlProps?: Omit<FormControlLabelProps, "control" | "label">;
  required?: boolean;
  error?: boolean;
}

interface Props extends PropsCheckBoxElement {}
const CheckBoxElement = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      required,
      fromControlProps,
      error,
      value,
      label,
      labelPlacement = "end",
      ...rest
    } = props;
    const classes = checkBoxStyle();
    return (
      <FormControl required={required} error={!!error} component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              style={{ padding: 2 }}
              checked={value as any}
              inputRef={ref}
              {...rest}
            />
          }
          label={
            label ? (
              <InputLabel
                required={required}
                style={{
                  marginBottom: labelPlacement === "top" ? 4 : 0,
                  height: "auto",
                  display: "unset",
                }}
              >
                {label}
              </InputLabel>
            ) : (
              <div />
            )
          }
          labelPlacement={labelPlacement}
          className={
            labelPlacement && ["end", "start"].includes(labelPlacement)
              ? classes.inline
              : classes.column
          }
          {...fromControlProps}
        />
      </FormControl>
    );
  }
);
export default memo(CheckBoxElement);
