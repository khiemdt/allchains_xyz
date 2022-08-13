import { DateTimePicker, DateTimePickerProps } from "@mui/lab";
import { TextField } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";

export interface PropsDateTimePickerElement
  extends Omit<
    DateTimePickerProps,
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

interface Props extends PropsDateTimePickerElement {}

const DateTimePickerElement = React.forwardRef<HTMLInputElement, Props>(
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
      <DateTimePicker
        inputFormat="P HH:mm:ss"
        mask="__/__/____ __:__:__"
        openTo="year"
        views={["year", "month", "day", "hours", "minutes", "seconds"]}
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
export default memo(DateTimePickerElement);
