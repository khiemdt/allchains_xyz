import {
  Button,
  FormHelperText,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { get, pickBy } from "lodash";
import _ from "lodash/fp";
import moment from "moment";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { BE_DATE_FORMAT, some } from "../constants";
import ArrayElement from "./element/array-element/ArrayElement";
import DateRangePickerElement from "./element/date-range/DateRangePickerElement";
import DateTimePickerElement from "./element/datepickerTime-element/DateTimePickerElement";
import SectionElement from "./element/section-element/SectionElement";
import TimePickerElement from "./element/timepicker-element/TimePickerElement";
import { ElementFormProps, ElementType, FreeElementSchemaProps } from "./utils";

const AutoCompleteElement = React.lazy(
  () => import("./element/autocomplete/AutoCompleteElement")
);
const FormControlAutoComplete = React.lazy(
  () => import("./element/autocomplete/FormControlAutoComplete")
);
const CheckBoxElement = React.lazy(
  () => import("./element/checkbox/CheckBoxElement")
);
const DatePickerElement = React.lazy(
  () => import("./element/datepicker-element/DatePickerElement")
);
const MultipleCheckBoxElement = React.lazy(
  () => import("./element/multiple-checkbox/MultipleCheckBoxElement")
);
const MultipleRadioElement = React.lazy(
  () => import("./element/multiple-radio/MultipleRadioElement")
);
const RadioElement = React.lazy(() => import("./element/radio/RadioElement"));
const SelectElement = React.lazy(
  () => import("./element/select/SelectElement")
);
const SwitchElement = React.lazy(
  () => import("./element/switch/SwitchElement")
);
const TextFieldElement = React.lazy(
  () => import("./element/text-field/TextFieldElement")
);
const UploadFileElement = React.lazy(
  () => import("./element/uploadFile/UploadFileElement")
);
const UploadImageElement = React.lazy(
  () => import("./element/uploadImage/UploadImageElement")
);
const TextEditorElement = React.lazy(
  () => import("./element/text-editor/TextEditorElement")
);
interface Props {
  fieldName: string;
  rawElement?: boolean;
  propsElement: ElementFormProps;
}

SchemaElement.defaultProps = {};

function SchemaElement(props: Props | some) {
  const { fieldName, rawElement, propsElement } = props;
  const {
    type,
    component,
    unregister,
    xs,
    register: registerElement = {},
    propsWrapper,
    defaultValue,
    inputType,
    tooltipError,
    submitLabel,
    typeButton,
    noHelperText,
    shouldUnregister,
    ...rest
  } = propsElement;

  const methods = useFormContext();
  const {
    control,
    register,
    formState: { errors },
  } = methods;

  const { valueAsDate, valueAsNumber, pattern, setValueAs, ...restRegis } =
    registerElement;

  const required = Object.keys(restRegis).length > 0;

  const getElement = React.useMemo(() => {
    let element;
    if (!type) {
      return [];
    }
    switch (type as ElementType) {
      case "hidden":
        element = <input type="hidden" {...register(fieldName)} />;
        break;
      case "text-field":
        element = unregister ? (
          <TextFieldElement
            fullWidth
            onChange={(e) => {
              rest?.onChange && rest?.onChange(e.target.value);
            }}
            type={inputType}
          />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { error },
            }) => (
              <>
                <TextFieldElement
                  inputRef={ref}
                  fullWidth
                  required={required}
                  name={name}
                  {...rest}
                  // value={value || ''}//In case value is 0 this will show empty string =>wrong
                  value={
                    typeof value === "string" || typeof value === "number"
                      ? value
                      : ""
                  }
                  onChange={(...params) => {
                    onChange(...params);
                    rest.onChange && rest.onChange(...params);
                  }}
                  type={inputType}
                  error={!!error}
                />
              </>
            )}
          />
        );
        break;
      case "uploadFile":
        element = unregister ? (
          <UploadFileElement fullWidth {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { error },
            }) => (
              <UploadFileElement
                inputRef={ref}
                fullWidth
                required={required}
                name={name}
                {...rest}
                value={value}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "uploadImage":
        element = unregister ? (
          <UploadImageElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { error },
            }) => (
              <UploadImageElement
                required={required}
                name={name}
                {...rest}
                value={value}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "checkbox":
        element = unregister ? (
          <CheckBoxElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || false}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <CheckBoxElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "multiple-checkbox":
        element = unregister ? (
          <MultipleCheckBoxElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || []}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <MultipleCheckBoxElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "radio":
        element = unregister ? (
          <RadioElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || false}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <RadioElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "multiple-radio":
        element = unregister ? (
          <MultipleRadioElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <MultipleRadioElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "select":
        element = unregister ? (
          <SelectElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <SelectElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "switch":
        element = unregister ? (
          <SwitchElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || false}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <SwitchElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "auto-complete":
        element = unregister ? (
          <FormControlAutoComplete fullWidth {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue}
            render={(propsRender) => (
              <AutoCompleteElement
                required={required}
                {...rest}
                {...propsRender}
              />
            )}
          />
        );
        break;
      case "datePicker":
        element = unregister ? (
          <DatePickerElement {...(rest as any)} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || null}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <DatePickerElement
                required={required}
                {...rest}
                onChange={(value) => {
                  const tmp = value
                    ? moment(value).format(BE_DATE_FORMAT)
                    : null;
                  onChange(tmp);
                  rest.onChange && rest.onChange(tmp);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "dateTimePicker":
        element = unregister ? (
          <DatePickerElement {...(rest as any)} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || null}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <DateTimePickerElement
                required={required}
                {...rest}
                onChange={(value) => {
                  const tmp = value
                    ? moment(value).format(BE_DATE_FORMAT)
                    : null;
                  onChange(tmp);
                  rest.onChange && rest.onChange(tmp);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "timePicker":
        element = unregister ? (
          <TimePickerElement {...(rest as any)} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || null}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <TimePickerElement
                required={required}
                {...rest}
                onChange={(value) => {
                  onChange(value);
                  rest.onChange && rest.onChange(value);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "dateRange":
        element = unregister ? (
          <DateRangePickerElement {...(rest as any)} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || null}
            render={({
              field: { value, onChange, ...field },
              fieldState: { error },
            }) => (
              <DateRangePickerElement
                required={required}
                {...field}
                {...rest}
                value={[value?.from || null, value?.to || null]}
                onChange={(value: any) => {
                  const tmp = {
                    from: value?.[0]
                      ? moment(value?.[0]).format(BE_DATE_FORMAT)
                      : null,
                    to: value?.[1]
                      ? moment(value?.[1]).format(BE_DATE_FORMAT)
                      : null,
                  };
                  onChange(tmp);
                  rest.onChange && rest.onChange(tmp);
                }}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "text-editor":
        element = unregister ? (
          <TextEditorElement {...rest} />
        ) : (
          <Controller
            shouldUnregister={shouldUnregister}
            name={fieldName}
            control={control}
            rules={registerElement}
            defaultValue={defaultValue || null}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <TextEditorElement
                required={required}
                {...rest}
                onChange={(...params) => {
                  onChange(...params);
                  rest.onChange && rest.onChange(...params);
                }}
                {...field}
                error={!!error}
              />
            )}
          />
        );
        break;
      case "array":
        element = <ArrayElement {...rest} name={fieldName} />;
        break;
      case "section":
        element = <SectionElement {...rest} name={fieldName} />;
        break;
      case "submitButton":
        element = (
          <Button
            type={typeButton || "submit"}
            variant="contained"
            color="primary"
            {...rest}
          >
            {rest.label || submitLabel || <FormattedMessage id="save" />}
          </Button>
        );
        break;
      case "button":
        element = (
          <Button
            type={typeButton || "button"}
            variant="contained"
            color="primary"
            {...rest}
          >
            {rest.label}
          </Button>
        );
        break;
      case "raw":
        element = typeof component === "function" && component(rest);
        break;
      default:
        try {
          element = unregister ? (
            typeof type === "function" ? (
              type(rest)
            ) : (
              React.createElement(type as any, rest)
            )
          ) : (
            <Controller
              shouldUnregister={shouldUnregister}
              name={fieldName}
              defaultValue={defaultValue}
              render={(propsRender) => (
                <>
                  {typeof type === "function"
                    ? type({ ...rest, ...propsRender })
                    : React.createElement(
                        type as any,
                        {
                          ...rest,
                          ...propsRender,
                        } as FreeElementSchemaProps
                      )}
                </>
              )}
              rules={registerElement}
            />
          );
        } catch (e) {}
        break;
    }
    return element;
  }, [
    type,
    register,
    fieldName,
    unregister,
    inputType,
    shouldUnregister,
    control,
    registerElement,
    defaultValue,
    rest,
    typeButton,
    submitLabel,
    component,
    required,
  ]);

  const errorMessage = React.useCallback(() => {
    const tmp = pickBy(get(errors, fieldName), (value, key) => {
      return key !== "ref";
    });

    const type_tmp = tmp?.type;
    const message = tmp?.message;
    delete tmp.type;
    delete tmp.message;
    return { ...tmp, message: message || type_tmp };
  }, [errors, fieldName]);

  // const tmp = fieldName ? watch(fieldName, undefined) : watch();

  // const previousValue = React.useRef(undefined);

  // React.useEffect(() => {
  //   if (
  //     !isEqual(tmp || null, previousValue.current || null) &&
  //     onChangeField &&
  //     typeof previousValue.current !== 'undefined'
  //   ) {
  //     onChangeField(tmp);
  //   }
  //   previousValue.current = tmp || null;
  // }, [fieldName, onChangeField, tmp, watch]);

  const content = React.useMemo(() => {
    const messageError = rest?.readOnly ? (
      <FormattedMessage id="readOnly" />
    ) : (
      errorMessage() &&
      _.entries(errorMessage()).map(
        ([type_error, message]: [string, unknown]) =>
          typeof message === "string" &&
          (message ? type_error !== "type" : true) && (
            <span key={type_error}>
              {message === "required" ? (
                <FormattedMessage id="required" />
              ) : (
                message
              )}
              <br />
            </span>
          )
      )
    );
    return (
      <>
        {getElement}
        {type !== "submitButton" &&
          type !== "button" &&
          typeof type === "string" &&
          !noHelperText && (
            <Tooltip title={tooltipError ? messageError : ""} arrow>
              <FormHelperText
                style={{ height: 8 }}
                error={!rest?.readOnly}
                component="div"
              >
                <Typography
                  variant="caption"
                  color="inherit"
                  noWrap
                  component="div"
                >
                  {messageError}
                </Typography>
              </FormHelperText>
            </Tooltip>
          )}
      </>
    );
  }, [
    errorMessage,
    getElement,
    noHelperText,
    rest?.readOnly,
    tooltipError,
    type,
  ]);
  if (type === "hidden") {
    return content;
  }
  if (rawElement) {
    return <div {...propsWrapper}>{content}</div>;
  }
  return (
    <Grid item xs={xs || 12} {...propsWrapper}>
      {content}
    </Grid>
  );
}

export default SchemaElement;
