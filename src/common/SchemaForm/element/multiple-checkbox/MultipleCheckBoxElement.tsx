import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";
import { some } from "../../../constants";

export interface PropsMultipleCheckBoxElement
  extends Omit<CheckboxProps, "defaultValue"> {
  options?: some[];
  label?: React.ReactNode;
  value?: any[];
  onChange?: (value) => void;
  row?: boolean;
  error?: boolean;
  rawOptions?: boolean;
  className?: string;
  name?: string;
}

interface Props extends PropsMultipleCheckBoxElement {}
function MultipleCheckBoxElement(props: Props) {
  const {
    options = [],
    label,
    onChange,
    value = [],
    row,
    className,
    error,
    name,
    rawOptions,
    ...rest
  } = props;

  const handleChange = (item) => {
    const isContain = value?.includes(item);
    let tmp = value;
    if (isContain) {
      tmp = tmp.filter((v) => v !== item);
    } else {
      tmp = [...tmp, item];
    }
    onChange && onChange(tmp);
  };

  return (
    <FormControl
      name={name}
      component="fieldset"
      className={className}
      error={!!error}
    >
      {label && (
        <FormLabel component="legend">
          <Typography variant="body2" component="div">
            {label}
          </Typography>
        </FormLabel>
      )}
      <FormGroup aria-label="position" row={row}>
        {options?.map(
          ({ name: labelOption = "", id, ...one }: some, index: number) => {
            return (
              <FormControlLabel
                {...one}
                checked={value?.includes(id)}
                onChange={() => handleChange(id)}
                key={index}
                label={
                  typeof labelOption === "string" ? (
                    rawOptions ? (
                      labelOption
                    ) : (
                      <Typography variant="inherit">
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
                control={
                  <Checkbox
                    color="secondary"
                    style={{ padding: 2 }}
                    {...rest}
                  />
                }
              />
            );
          }
        )}
      </FormGroup>
    </FormControl>
  );
}
export default memo(MultipleCheckBoxElement);
