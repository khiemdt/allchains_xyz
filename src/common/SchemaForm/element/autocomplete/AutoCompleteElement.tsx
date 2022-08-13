/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import { some } from "../../../constants";
import { IControllerRenderProps } from "../../utils";
import FormControlAutoComplete, {
  FormControlAutoCompleteProps,
} from "./FormControlAutoComplete";

export interface PropsAutoCompleteElement
  extends FormControlAutoCompleteProps,
    IControllerRenderProps {
  onChange?: (value) => void;
}

function AutoCompleteElement(props: PropsAutoCompleteElement | some) {
  const {
    field,
    fieldState,
    formState,
    onChange: onChangeProps,
    ...rest
  } = props;
  const { value, onChange, ref } = field;
  const { error } = fieldState;

  useEffect(() => {
    if (
      !value &&
      rest.options?.length === 1 &&
      rest.required &&
      (rest.getOptionDisabled ? !rest.getOptionDisabled(rest.options[0]) : true)
    ) {
      onChange(rest.multiple ? rest.options : rest.options[0]);
      onChangeProps &&
        onChangeProps(rest.multiple ? rest.options : rest.options[0]);
    }
  }, [rest.options]);

  return (
    <FormControlAutoComplete
      fullWidth
      {...rest}
      innerRef={ref}
      value={rest.multiple ? value || [] : value || null}
      onChange={(_, data) => {
        onChange(data);
        onChangeProps && onChangeProps(data);
      }}
      error={!!error}
    />
  );
}
export default memo(AutoCompleteElement, () => false);
