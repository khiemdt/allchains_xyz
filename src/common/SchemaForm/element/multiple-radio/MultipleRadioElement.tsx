import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";
import { some } from "../../../constants";

export interface PropsMultipleRadioElement
  extends Omit<RadioGroupProps, "defaultValue"> {
  label?: React.ReactNode;
  onChange?: (value) => void;
  className?: string;
  options?: some[];
  error?: boolean;
  rawOptions?: boolean;
  radioProps?: RadioProps;
  variant?: TypographyProps["variant"];
  required?: boolean;
  disabled?: boolean;
}

interface Props extends PropsMultipleRadioElement {}

const MultipleRadioElement = React.forwardRef<FormControlProps["ref"], Props>(
  (props: Props, ref: any) => {
    const {
      options,
      label,
      row = false,
      onChange,
      className,
      name,
      value,
      error,
      rawOptions,
      radioProps,
      variant,
      required,
      disabled,
      ...rest
    } = props;

    const handleChange = (event) => {
      let tmp = event.target.value;
      if (typeof value === "number") {
        tmp = Number.parseInt(tmp, 10);
      }
      onChange && onChange(tmp);
    };

    return (
      <FormControl
        component="fieldset"
        className={className}
        error={!!error}
        ref={ref}
        disabled={disabled}
      >
        {label && (
          <FormLabel component="legend">
            {label ? (
              <InputLabel
                required={required}
                style={{
                  height: "auto",
                  display: "unset",
                }}
              >
                {label}
              </InputLabel>
            ) : (
              <div />
            )}
          </FormLabel>
        )}
        <RadioGroup
          {...rest}
          aria-label={name}
          name={name}
          key={`${value}`}
          value={value}
          row={row}
          onChange={handleChange}
        >
          {options?.map(
            ({ name: labelOption = "", id, ...one }: some, index: number) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Radio
                      color="secondary"
                      style={{ padding: 2 }}
                      {...radioProps}
                    />
                  }
                  style={{ marginLeft: 0 }}
                  label={
                    typeof labelOption === "string" ? (
                      rawOptions ? (
                        labelOption
                      ) : (
                        <Typography variant={variant || "body2"}>
                          {labelOption ? (
                            <FormattedMessage id={labelOption} />
                          ) : (
                            ""
                          )}
                        </Typography>
                      )
                    ) : (
                      labelOption
                    )
                  }
                  value={id}
                  {...one}
                />
              );
            }
          )}
        </RadioGroup>
      </FormControl>
    );
  }
);
export default memo(MultipleRadioElement);
