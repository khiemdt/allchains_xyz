import { DatePicker, DatePickerProps } from "@mui/lab";
import { TextField } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";

export interface PropsDatePickerElement
  extends Omit<
    DatePickerProps,
    "defaultValue" | "onChange" | "minDate" | "maxDate"
  > {
  onChange?: (value: Date | null) => void;
  required?: boolean;
  error?: boolean;
  isSubmitting?: boolean;
  name?: string;
  minDate?: string;
  maxDate?: string;
}

interface Props extends PropsDatePickerElement {}

const DatePickerElement = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      name,
      error,
      isSubmitting,
      required,
      value = null,
      minDate,
      maxDate,
      ...rest
    } = props;

    return (
      <DatePicker
        mask="__/__/____"
        fullWidth
        value={value}
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
        minDate={minDate ? moment(minDate).toDate() : null}
        maxDate={maxDate ? moment(maxDate).toDate() : null}
        {...(rest as any)}
      />
    );
  }
);
export default memo(DatePickerElement);
