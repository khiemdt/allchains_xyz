import { TimePicker, TimePickerProps } from "@mui/lab";
import { TextField } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";

export interface PropsTimePickerElement
  extends Omit<
    TimePickerProps,
    "defaultValue" | "renderInput" | "onChange" | "value"
  > {
  onChange?: (value?: string) => void;
  required?: boolean;
  error?: boolean;
  isSubmitting?: boolean;
  value?: string;
  name?: string;
}

interface Props extends PropsTimePickerElement {}

const TimePickerElement = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      name,
      error,
      isSubmitting,
      required,
      value = null,
      onChange,
      inputFormat = "HH:mm",
      ...rest
    } = props;

    return (
      <TimePicker
        ampm={false}
        openTo="hours"
        views={["hours", "minutes"]}
        inputFormat={inputFormat}
        mask="__:__"
        value={value ? moment(value, inputFormat).toDate() : null}
        onChange={(newValue: any, string) => {
          if (moment(newValue).isValid()) {
            onChange && onChange(moment(newValue).format(inputFormat));
          } else {
            onChange && onChange(undefined);
          }
        }}
        inputRef={ref}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              required: required,
            }}
            variant="outlined"
            fullWidth
            error={!!error}
          />
        )}
        {...(rest as Omit<
          TimePickerProps,
          "defaultValue" | "renderInput" | "onChange" | "value"
        >)}
      />
    );
  }
);
export default memo(TimePickerElement);
