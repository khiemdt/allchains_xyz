/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  CircularProgress,
  OutlinedInputProps,
} from "@mui/material";
import { debounce, isEqual } from "lodash";
import React, { ReactNode, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { some } from "../../../constants";
import TextFieldElement from "../text-field/TextFieldElement";
import { ListboxComponent } from "./ListboxComponent";

export interface FormControlAutoCompletePropsBase {
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  error?: boolean;
  disableCloseOnSelect?: boolean;
  placeholder?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  required?: boolean;
  loadOptions?: (input: string) => Promise<some[]>;
  loadKey?: any;
  disableSearchByText?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  freeSolo?: boolean;
  multiple?: boolean;
  loading?: boolean;
  disableClearable?: boolean;
  onChangeInput?: OutlinedInputProps["onChange"];
  options?: some[];
  windowScroll?: boolean;
  getOptionLabel?: (option: some) => string;
  isOptionEqualToValue?: (option: some, value: some) => boolean;
  getOptionDisabled?: (option: some) => boolean;
  groupBy?: (option: some) => string;
  initialSearch?: string;
  disableReSearchOnBlur?: boolean;
  limitTags?: number;
  renderOption?:
    | ((
        props: React.HTMLAttributes<HTMLLIElement>,
        option: some,
        state: AutocompleteRenderOptionState
      ) => React.ReactNode)
    | undefined;
}

export interface FormControlAutoCompleteProps
  extends FormControlAutoCompletePropsBase {
  innerRef?: React.Ref<any>;
}

export const FormControlAutoComplete = (
  props: FormControlAutoCompleteProps | some
) => {
  const {
    label,
    placeholder,
    error,
    formControlStyle,
    required,
    renderInput,
    options,
    loadOptions,
    startAdornment,
    endAdornment,
    inputStyle,
    labelStyle,
    innerRef,
    readOnly,
    onChangeInput,
    autoFocus,
    windowScroll,
    initialSearch,
    disableReSearchOnBlur,
    loadKey,
    disableSearchByText,
    loading: loadingProps,
    ...rest
  } = props;

  const [optionsTmp, setOption] = React.useState<typeof options>(options);
  const [firstOption, setFirstOption] = React.useState<typeof options>(options);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadOptionsFnc = async (input: string) => {
    if (loadOptions) {
      setLoading(true);
      const data = await loadOptions(input);
      setLoading(false);
      if (data && data.length > 0) {
        setOption(data);
      }
      if (input === initialSearch) {
        setFirstOption(data);
      }
    }
  };

  const onLoadOptions = React.useCallback(
    debounce(
      (input: string) => {
        loadOptionsFnc(input);
      },
      500,
      {
        trailing: true,
        leading: false,
      }
    ),
    []
  );

  useEffect(() => {
    if (!isEqual(options, optionsTmp)) {
      setOption(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (!!loadOptions) {
      loadOptionsFnc(initialSearch);
    }
  }, [loadKey]);

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      loading={loading}
      options={optionsTmp || []}
      onInputChange={(event: object, value: string, reason: string) => {
        reason === "input" &&
          !disableSearchByText &&
          loadOptions &&
          onLoadOptions(value);
      }}
      onBlur={() => {
        loadOptions &&
          !disableReSearchOnBlur &&
          !disableSearchByText &&
          setOption(firstOption);
      }}
      noOptionsText={<FormattedMessage id="noOption" />}
      disabled={readOnly}
      renderInput={
        renderInput ||
        (({ InputProps, ...params }) => (
          <TextFieldElement
            {...params}
            disabled={rest.disabled || false}
            fullWidth
            error={error}
            label={label}
            inputRef={innerRef}
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              autoComplete: "off",
            }}
            required={required}
            InputProps={{
              ...InputProps,
              readOnly,
              autoFocus: autoFocus,
              style: {
                padding: 0,
                paddingRight: 24,
                ...inputStyle,
              },
              startAdornment: (
                <>
                  {startAdornment}
                  {InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {InputProps.endAdornment}
                  {endAdornment}
                </>
              ),
              error: error,
            }}
            onChange={onChangeInput}
            variant="outlined"
            size="small"
          />
        ))
      }
      getOptionLabel={(option: any) => option.name || " "}
      isOptionEqualToValue={(option: some, value: some) =>
        option.id === value.id
      }
      autoComplete
      ListboxComponent={
        windowScroll
          ? (ListboxComponent as React.ComponentType<
              React.HTMLAttributes<HTMLElement>
            >)
          : undefined
      }
      onMouseDownCapture={(e) => !optionsTmp?.length && e.stopPropagation()}
      disableCloseOnSelect={!!rest.multiple}
      // PopperComponent={(val) => <Popper {...val} disablePortal />} dùng khi để fullscreen
      {...(loadOptions && !disableSearchByText
        ? { filterOptions: (option) => option }
        : {})}
      {...rest}
    />
  );
};

export default FormControlAutoComplete;
