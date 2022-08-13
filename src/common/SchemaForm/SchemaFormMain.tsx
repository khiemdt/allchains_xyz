import { GridProps } from "@mui/material";
import { isEqual } from "lodash";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { some } from "../constants";
import useGeneralHook from "../hook/useGeneralHook";
import { usePrompt } from "../hook/usePrompt";
import SchemaView from "./SchemaView";
import { ISchemaForm } from "./utils";

type Mode = "edit" | "create";

interface Props {
  schema?: ISchemaForm;
  formId?: string;
  fieldName?: `${string}` | `${string}.${string}` | `${string}.${number}`;
  onSubmit?: (data: some, methods: UseFormReturn) => void;
  onCancel?: (methods: UseFormReturn) => void;
  onReset?: (methods: UseFormReturn) => void | boolean;
  formData?: some;
  initialData?: any;
  hiddenField?: some;
  mode?: Mode;
  onChange?: (value: some, methods: UseFormReturn) => void;
  hideSubmitButton?: boolean;
  notForm?: boolean;
  methods?: UseFormReturn;
  formProps?: JSX.IntrinsicElements["form"];
  showConfirmBeforeLeave?: boolean | React.ReactNode;
  propsGridContainer?: GridProps;
}
export const SchemaFormMain = forwardRef<any, Props | some>(
  (props: Props | some, ref) => {
    const {
      schema,
      formId,
      fieldName = "",
      onSubmit,
      formData,
      hideSubmitButton = false,
      hiddenField,
      methods: methodsProps,
      formProps,
      initialData,
      notForm,
      showConfirmBeforeLeave,
      propsGridContainer,
    } = props;
    const mainProps = useGeneralHook();
    const defaultValues = formData || initialData || {};
    // const { defaultValues } = getFieldForm(undefined, undefined, schema);
    const defaultMethods = useForm({
      defaultValues:
        Object.keys(defaultValues)?.length > 0 ? defaultValues : undefined,
      reValidateMode: "onChange",
      mode: "onSubmit",
    });

    const methods = useMemo(() => {
      return methodsProps || defaultMethods;
    }, [methodsProps, defaultMethods]);

    const onSubmitForm = (data: any) => {
      let dataMerge = { ...data, ...hiddenField };
      dataMerge = schema?.changeDataBeforeSubmit
        ? schema?.changeDataBeforeSubmit(dataMerge, { ...props, ...mainProps })
        : dataMerge;
      methods.reset(methods.getValues());
      onSubmit && onSubmit(dataMerge, dataMerge, methods);
    };

    useImperativeHandle(ref, () => methods);

    const content = useMemo(() => {
      return (
        <SchemaView
          schema={schema}
          fieldName={fieldName}
          showSubmitButton={!hideSubmitButton}
          hiddenField={hiddenField}
          propsGridContainer={propsGridContainer}
          formProps={{ ...props, ...mainProps }}
        />
      );
    }, [
      fieldName,
      hiddenField,
      hideSubmitButton,
      mainProps,
      props,
      propsGridContainer,
      schema,
    ]);

    React.useEffect(() => {
      if (!!formData && !isEqual(formData, methods.getValues())) {
        methods.reset(formData);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    usePrompt(
      typeof showConfirmBeforeLeave === "string"
        ? showConfirmBeforeLeave
        : mainProps.intl.formatMessage({ id: "youHaveUnsavedData" }),
      methods?.formState.isDirty && !!showConfirmBeforeLeave
    );

    if (notForm) {
      return content;
    }

    return (
      <>
        <FormProvider {...methods}>
          <form
            {...formProps}
            style={{
              display: "flex",
              flexDirection: "column",
              ...formProps?.style,
            }}
            onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
              // this part is for stopping parent forms to trigger their submit
              if (event) {
                // sometimes not true, e.g. React Native
                if (typeof event.preventDefault === "function") {
                  event.preventDefault();
                }
                if (typeof event.stopPropagation === "function") {
                  // prevent any outer forms from receiving the event too
                  event.stopPropagation();
                }
              }

              return methods.handleSubmit(onSubmitForm)(event);
            }}
          >
            {content}
            <input type="submit" id={formId} style={{ display: "none" }} />
          </form>
        </FormProvider>
      </>
    );
  }
);

export default SchemaFormMain;
