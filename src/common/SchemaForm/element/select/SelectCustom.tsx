import Close from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBaseProps,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { isEqual } from "lodash";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";
import { some } from "../../../constants";

interface IOption {
  id?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  name?: React.ReactNode | string | number;
}

export interface SelectCustomProps
  extends Omit<SelectProps, "defaultValue" | "onChange" | "ref"> {
  label?: React.ReactNode;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  className?: string;
  required?: boolean;
  options?: (IOption | some)[];
  placeholder?: string;
  rawOptions?: boolean;
  disableCloseBtn?: boolean;
  InputProps?: InputBaseProps;
  loadOptions?: (text: string) => Promise<some[]>;
  onChange?: (val: any) => void;
  initialSearch?: string;
  hasAllOptions?: boolean;
}

const SelectCustom = React.forwardRef<HTMLDivElement | null, SelectCustomProps>(
  (props: SelectCustomProps, ref) => {
    const {
      label,
      className,
      required,
      options,
      placeholder,
      rawOptions,
      error,
      InputProps,
      loadOptions,
      onChange,
      disableCloseBtn,
      initialSearch = "",
      hasAllOptions,
      ...rest
    } = props;
    const [optionsTmp, setOption] = React.useState<typeof options>(options);

    const onLoadOptions = React.useCallback(
      async (text) => {
        if (loadOptions) {
          const data = await loadOptions(text);
          if (data && data.length > 0) {
            setOption(data);
          }
        }
      },
      [loadOptions]
    );

    React.useEffect(() => {
      if (!isEqual(options, optionsTmp)) {
        setOption(options);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    React.useEffect(() => {
      onLoadOptions(initialSearch);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <FormControl error={!!error} className={className} fullWidth ref={ref}>
        {label && (
          <InputLabel required={required} shrink>
            {label}
          </InputLabel>
        )}
        <Select
          fullWidth
          sx={{
            "&:hover": {
              // backgroundColor: "black",
              "& .clear-btn": {
                display: "flex",
              },
            },
          }}
          endAdornment={
            rest.value !== " " &&
            !rest.readOnly &&
            !rest.disabled &&
            !disableCloseBtn ? (
              <InputAdornment
                position="end"
                sx={{
                  display: "none",
                  position: "absolute",
                  right: 16,
                }}
                className="clear-btn"
              >
                <IconButton
                  size="small"
                  onClick={() => onChange && onChange(" ")} // để 1 chuỗi rỗng để có thể ăn khớp với userPagination còn api thì sẽ tự remove vs stringtify
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null
          }
          onChange={onChange}
          defaultValue=" "
          {...rest}
        >
          {(placeholder || hasAllOptions) && (
            <MenuItem value=" " disabled={!hasAllOptions}>
              <Typography
                variant="body2"
                style={{ opacity: hasAllOptions ? 1 : ".5" }}
              >
                {hasAllOptions ? <FormattedMessage id={"all"} /> : placeholder}
              </Typography>
            </MenuItem>
          )}
          {Array.isArray(optionsTmp) &&
            optionsTmp?.map((option: IOption, index: number) => {
              const { name, disabled, id, ...rest } = option;
              return (
                <MenuItem key={index} value={id} disabled={disabled} {...rest}>
                  {typeof name === "string" ? (
                    rawOptions || loadOptions ? (
                      name
                    ) : (
                      <Typography variant="body2" color="inherit">
                        {name ? <FormattedMessage id={name} /> : ""}
                      </Typography>
                    )
                  ) : (
                    name
                  )}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    );
  }
);

export default memo(SelectCustom);
