import React, { memo, useEffect } from "react";
import SelectCustom, { SelectCustomProps } from "./SelectCustom";

export interface PropsSelectElement extends SelectCustomProps {}

interface Props extends Omit<SelectCustomProps, "onChange"> {
  onChange?: (value: any) => void;
}

const SelectElement = React.forwardRef<any, Props>((props: Props, ref) => {
  const { value, options, required, multiple, onChange } = props;

  useEffect(() => {
    if (!value && options?.length === 1 && required && !options[0].disabled) {
      const returnValue = multiple ? options.map((v) => v.id) : options[0].id;
      onChange && onChange(returnValue);
    }
  }, [multiple, onChange, options, required, value]);

  return (
    <SelectCustom
      ref={ref}
      {...props}
      value={
        value !== undefined && value !== null ? value : multiple ? [] : " "
      }
      onChange={onChange}
    />
  );
});

export default memo(SelectElement);
