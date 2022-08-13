import { ButtonProps, GridProps, PaperProps } from "@mui/material";
import { get } from "lodash";
import React, { ReactNode } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";
import { some } from "../constants";
import useGeneralHook from "../hook/useGeneralHook";
import { PropsArrayElement } from "./element/array-element/ArrayElement";
import { FormControlAutoCompletePropsBase } from "./element/autocomplete/FormControlAutoComplete";
import { PropsCheckBoxElement } from "./element/checkbox/CheckBoxElement";
import { PropsDateRangePickerElement } from "./element/date-range/DateRangePickerElement";
import { PropsDatePickerElement } from "./element/datepicker-element/DatePickerElement";
import { PropsDateTimePickerElement } from "./element/datepickerTime-element/DateTimePickerElement";
import { PropsMultipleCheckBoxElement } from "./element/multiple-checkbox/MultipleCheckBoxElement";
import { PropsMultipleRadioElement } from "./element/multiple-radio/MultipleRadioElement";
import { PropsRadioElement } from "./element/radio/RadioElement";
import { PropsSectionElement } from "./element/section-element/SectionElement";
import { PropsSelectElement } from "./element/select/SelectElement";
import { PropsSwitchElement } from "./element/switch/SwitchElement";
import { TextEditorElementProps } from "./element/text-editor/TextEditorElement";
import { TextFieldElementProps } from "./element/text-field/TextFieldElement";
import { PropsTimePickerElement } from "./element/timepicker-element/TimePickerElement";
import { UploadFileElementProps } from "./element/uploadFile/UploadFileElement";
import { UploadImageElementProps } from "./element/uploadImage/UploadImageElement";

export type ElementType =
  | "select"
  | "auto-complete"
  | "switch"
  | "checkbox"
  | "multiple-checkbox"
  | "radio"
  | "multiple-radio"
  | "array"
  | "section"
  | "datePicker"
  | "dateTimePicker"
  | "submitButton"
  | "button"
  | "text-editor"
  | "uploadImage"
  | "uploadFile"
  | "raw"
  | ReactNode;
export interface IControllerRenderProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}
/*---------------------------*/
interface ElementBaseProps {
  type: ElementType;
  key_element?: string;
  register?: RegisterOptions;
  propsWrapper?: GridProps;
  defaultValue?: any;
  unregister?: boolean;
  tooltipError?: boolean;
  noHelperText?: boolean;
  hidden?: boolean;
  shouldUnregister?: boolean;
}

interface IHiddenElement {
  type?: "hiddenField";
}
export interface IRawElement extends ElementBaseProps {
  component?: React.ReactNode;
}
export interface ISubmitButtonElement
  extends ElementBaseProps,
    Omit<ButtonProps, "defaultValue" | "type"> {
  type: "submitButton";
  typeButton?: "button" | "submit" | "reset" | undefined;
}
export interface IArrayElement extends ElementBaseProps, PropsArrayElement {
  type: "array";
}
export interface IButtonElement
  extends ElementBaseProps,
    Omit<ButtonProps, "defaultValue" | "type"> {
  type: "button";
  typeButton?: "button" | "submit" | "reset" | undefined;
  label?: React.ReactNode | string;
}
export interface ITextFieldElement
  extends ElementBaseProps,
    TextFieldElementProps {
  type: "text-field";
  inputType?: string;
}
export interface ISectionElement extends ElementBaseProps, PropsSectionElement {
  type: "section";
  inputType?: string;
}
export interface IUploadFileElement
  extends ElementBaseProps,
    UploadFileElementProps {
  type: "uploadFile";
}
export interface IUploadImageElement
  extends ElementBaseProps,
    UploadImageElementProps {
  type: "uploadImage";
}

export interface ICheckBoxElement
  extends ElementBaseProps,
    PropsCheckBoxElement {
  type: "checkbox";
}

export interface IMultipleCheckBoxElement
  extends ElementBaseProps,
    PropsMultipleCheckBoxElement {
  type: "multiple-checkbox";
}

export interface IRadioElement extends ElementBaseProps, PropsRadioElement {
  type: "checkbox";
}
export interface ISelectElement extends ElementBaseProps, PropsSelectElement {
  type: "select";
}

export interface IMultipleRadioElement
  extends ElementBaseProps,
    PropsMultipleRadioElement {
  type: "multiple-radio";
}

export interface ISwitchElement extends ElementBaseProps, PropsSwitchElement {
  type: "switch";
}
export interface IDatePickerElement
  extends ElementBaseProps,
    PropsDatePickerElement {
  type: "datePicker";
}
export interface IDateTimePickerElement
  extends ElementBaseProps,
    PropsDateTimePickerElement {
  type: "dateTimePicker";
}
export interface ITimePickerElement
  extends ElementBaseProps,
    PropsTimePickerElement {
  type: "datePicker";
}
export interface IDateRangePickerElement
  extends ElementBaseProps,
    PropsDateRangePickerElement {
  type: "dateRange";
}

export interface IAutoCompleteElement extends FormControlAutoCompletePropsBase {
  type: "auto-complete";
}
export interface ITextEditorElement extends TextEditorElementProps {
  type: "text-editor";
}

export type ElementFormProps =
  | IHiddenElement
  | ElementBaseProps
  | IAutoCompleteElement
  | ITextFieldElement
  | IUploadFileElement
  | IUploadImageElement
  | ICheckBoxElement
  | IMultipleCheckBoxElement
  | IRadioElement
  | ISelectElement
  | IMultipleRadioElement
  | ISwitchElement
  | IDatePickerElement
  | IDateTimePickerElement
  | ITimePickerElement
  | IDateRangePickerElement
  | ISubmitButtonElement
  | IButtonElement
  | ISectionElement
  | ITextEditorElement
  | ElementBaseProps
  | IArrayElement
  | IRawElement;

export interface SchemaType {
  [key: string]: ElementFormProps;
}

/*---------------------------*/

export interface FormProps extends ReturnType<typeof useGeneralHook>, some {}

export type ISchemaFields = (params: {
  methods: UseFormReturn<FieldValues>;
  fieldName?: string;
  formProps: FormProps;
  valuesField: some;
}) => SchemaType;
export interface FieldsType {
  id: string;
  fields: (string | undefined)[];
  title?: ReactNode;
  paper?: boolean;
  paperProps?: PaperProps;
  propsWrapper?: GridProps;
  propsGridContainer?: GridProps;
  hidden?: boolean;
  [key: string]: any;
}

export interface FieldsElementType extends Omit<FieldsType, "fields"> {
  fields: ElementFormProps[];
}

export type IUiFields = (params: {
  methods: UseFormReturn<FieldValues>;
  formProps: FormProps;
  valuesField?: some;
}) => FieldsType[] | any[];

export interface IParamsLayoutFields {
  valuesField: some;
  fields: some;
  methods: UseFormReturn<FieldValues>;
  formProps: FormProps;
  view: ReactNode;
  listElement: ReactNode[];
}

export type ILayoutFields = (params: IParamsLayoutFields) => ReactNode;

export interface ISchemaForm {
  // propsWrapperContainer?: GridProps;
  propsGridContainer?: GridProps;
  fields: ISchemaFields | SchemaType;
  ui?: IUiFields | FieldsType[];
  layout?: ILayoutFields;
  changeDataBeforeSubmit?: (values: some, props: FormProps) => some;
}

/*---------------------------*/

export const mergeFieldName = (params: {
  name: string;
  parent?: string;
  index?: number;
}) => {
  const { name, parent, index } = params;
  if (parent && typeof index === "number") {
    return `${parent}.${index}.${name}`;
  }
  if (parent) {
    return `${parent}.${name}`;
  }
  if (typeof index === "number") {
    return `${name}.${index}`;
  }
  return name;
};

export const getFieldForm = (
  methods: UseFormReturn<FieldValues>,
  formProps: FormProps,
  schema?: ISchemaForm,
  fieldName?: `${string}` | `${string}.${string}` | `${string}.${number}`,
  showSubmitButton?: boolean,
  props?: any
) => {
  if (!schema) {
    return { groupFields: [] };
  }
  const { intl } = formProps;
  const valuesField = methods
    ? ((fieldName ? methods?.watch(fieldName) : methods?.watch()) as some)
    : {};
  const fields =
    typeof schema?.fields === "function"
      ? schema?.fields({ valuesField, methods, fieldName, formProps })
      : schema?.fields;
  const ui =
    typeof schema?.ui === "function"
      ? schema?.ui({ valuesField, methods, formProps })
      : schema?.ui;

  let groupFields = ui
    ? (ui
        .filter(Boolean)
        .reduce((value: some[], current: some, index: number) => {
          const flatValue = value
            .filter((v) => !v.hidden)
            .reduce((val: some[], cur: some, idx: number) => {
              return [
                ...val,
                ...get(cur, "fields", [])
                  .map(
                    (v) =>
                      // v.type !== "submitButton" ? v.key_element : undefined
                      v.key_element
                  )
                  .filter(Boolean),
              ];
            }, []);
          const tmp = get(current, "fields", []);
          return [
            ...value,
            {
              ...current,
              fields: (Array.isArray(tmp) ? tmp : [])
                .filter((val) => !flatValue.includes(val))
                .map((val: string) => {
                  const field = get(fields, val);
                  return field && { ...field, key_element: val };
                })
                .filter(Boolean),
            },
          ];
        }, [])
        .filter(Boolean) as FieldsElementType[])
    : ([
        {
          id: "default",
          fields: Object.entries(fields).map(([key, value]) => {
            return { key_element: key, ...(value as any) };
          }),
        },
      ] as FieldsElementType[]);

  groupFields = [
    ...(groupFields as FieldsElementType[]),
    showSubmitButton &&
      ({
        id: "submitButton",
        fields: [
          {
            key_element: "default",
            type: "submitButton",
            style: { minWidth: 100 },
            submitLabel: formProps.submitLabel,
            propsWrapper: {
              xs: "auto",
            },
          },
          formProps?.onCancel && {
            key_element: "cancel",
            type: "button",
            variant: "outlined",
            style: { minWidth: 100 },
            label:
              formProps.cancelLabel || intl.formatMessage({ id: "cancel" }),
            onClick: () => formProps?.onCancel(methods),
            propsWrapper: {
              xs: "auto",
            },
          },
          formProps?.onReset && {
            key_element: "reset",
            type: "button",
            variant: "text",
            style: { minWidth: 40 },
            label: props.refreshIcon,
            onClick: () =>
              typeof formProps?.onReset === "function"
                ? formProps?.onReset(methods)
                : methods.reset(),
            color: "inherit",
            propsWrapper: {
              xs: "auto",
            },
          },
        ].filter(Boolean),
      } as FieldsElementType),
  ].filter(Boolean) as FieldsElementType[];

  return { groupFields };
};
export interface FreeElementSchemaProps extends some {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}
/*---------------------------*/
export const submitForm = (id: string) => {
  const submitBtn = document.getElementById(id);
  if (
    submitBtn &&
    submitBtn.tagName === "INPUT" &&
    submitBtn.getAttribute("type") === "submit"
  ) {
    submitBtn.click();
  }
};
