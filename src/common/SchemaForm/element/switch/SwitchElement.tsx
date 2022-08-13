import {
  FormControlLabel,
  FormControlLabelProps,
  InputLabel,
  Switch,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const switchStyle = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
}));

export interface PropsSwitchElement
  extends Omit<
    FormControlLabelProps,
    "label" | "control" | "defaultValue" | "onChange"
  > {
  label?: React.ReactNode;
  onChange?: (value: boolean) => void;
  required?: boolean;
  error?: boolean;
}
export interface Props extends PropsSwitchElement {}

const SwitchElement = React.forwardRef<any, Props>((props: Props, ref) => {
  const {
    labelPlacement,
    label = "",
    onChange,
    required,
    value,
    error,
    ...rest
  } = props;
  const classes = switchStyle();

  return (
    <FormControlLabel
      label={
        <InputLabel
          required={required}
          error={error}
          shrink
          style={{ margin: 0, display: "flex", alignItems: "center" }}
        >
          {label}
        </InputLabel>
      }
      control={<Switch color="primary" inputRef={ref} />}
      labelPlacement={labelPlacement}
      classes={
        labelPlacement && ["end", "start"].includes(labelPlacement)
          ? classes
          : {}
      }
      {...rest}
      checked={value as any}
      onChange={(e, checked) => {
        onChange && onChange(checked);
      }}
    />
  );
});

export default SwitchElement;
