import { DateRangePicker, StaticDateRangePickerProps } from "@mui/lab";
import { Box } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";
import TextFieldElement from "../text-field/TextFieldElement";

export interface PropsDateRangePickerElement
  extends Omit<
    StaticDateRangePickerProps,
    "defaultValue" | "renderInput" | "minDate" | "maxDate"
  > {
  required?: boolean;
  error?: boolean;
  isSubmitting?: boolean;
  name?: string;
  spacing?: number;
  minDate?: string;
  maxDate?: string;
}

interface Props extends PropsDateRangePickerElement {}

const DateRangePickerElement = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      name,
      error,
      isSubmitting,
      required,
      value = [null, null],
      spacing,
      minDate,
      maxDate,
      ...rest
    } = props;

    return (
      <DateRangePicker
        mask="__/__/____"
        startText={<FormattedMessage id="startDate" />}
        endText={<FormattedMessage id="endDate" />}
        value={value || [null, null]}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextFieldElement
              {...startProps}
              required={required}
              inputRef={ref}
            />
            <Box sx={{ marginRight: spacing || 2 }} />
            <TextFieldElement {...endProps} required={required} />
          </React.Fragment>
        )}
        minDate={minDate ? moment(minDate).toDate() : null}
        maxDate={maxDate ? moment(maxDate).toDate() : null}
        {...rest}
      />
    );
  }
);
export default memo(DateRangePickerElement);
