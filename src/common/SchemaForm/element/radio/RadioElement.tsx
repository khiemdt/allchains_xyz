import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  InputLabel,
  Radio,
  RadioProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { memo } from "react";

const checkRadioStyle = makeStyles(() => ({
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

export interface PropsRadioElement extends Omit<RadioProps, "defaultValue"> {
  label?: React.ReactNode;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  fromControlProps?: FormControlLabelProps;
  required?: boolean;
  error?: boolean;
}
interface Props extends PropsRadioElement {}

const RadioElement = (props: Props) => {
  const {
    label,
    labelPlacement = "end",
    required,
    fromControlProps,
    error,
    value,
    ...rest
  } = props;

  const classes = checkRadioStyle();

  return (
    <FormControl required={required} error={!!error} component="fieldset">
      <FormControlLabel
        control={
          <Radio
            color="primary"
            style={{ padding: 2 }}
            checked={value as any}
            {...rest}
          />
        }
        label={
          <InputLabel
            required={required}
            style={{
              marginBottom: labelPlacement === "top" ? 4 : 0,
              height: "auto",
            }}
          >
            {label}
          </InputLabel>
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
};

export default memo(RadioElement);
