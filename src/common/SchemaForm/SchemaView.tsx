import RefreshIcon from "@mui/icons-material/Refresh";
import { Grid, GridProps } from "@mui/material";
import { isEqual } from "lodash";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";
import { some } from "../constants";
import GroupFields from "./GroupFields";
import SchemaElement from "./SchemaElement";
import {
  FieldsElementType,
  FormProps,
  getFieldForm,
  ISchemaForm,
  mergeFieldName,
} from "./utils";

interface Props extends some {
  schema: ISchemaForm;
  fieldName?: `${string}` | `${string}.${string}` | `${string}.${number}`;
  showSubmitButton?: boolean;
  formProps: FormProps;
  propsGridContainer?: GridProps;
}

SchemaView.defaultProps = {
  fieldName: "",
  showSubmitButton: false,
};

function SchemaView(props: Props) {
  const { schema, fieldName, showSubmitButton, formProps } = props;
  const { onChange } = formProps;
  const { propsGridContainer } = schema;
  const previousValue = React.useRef(undefined);
  const methods = useFormContext();

  const { watch } = methods;

  React.useEffect(() => {
    const tmp = fieldName ? watch(fieldName) : watch();
    if (previousValue.current !== undefined) {
      if (!isEqual(tmp, previousValue.current) && onChange) {
        onChange(tmp, methods);
        previousValue.current = tmp || null;
      }
    } else {
      previousValue.current = tmp;
    }
  }, [fieldName, methods, onChange, watch]);

  const groupFields = React.useMemo(() => {
    const { groupFields } = getFieldForm(
      methods,
      formProps,
      schema,
      fieldName,
      showSubmitButton,
      { refreshIcon: <RefreshIcon color="primary" /> }
    );
    return groupFields;
  }, [fieldName, methods, formProps, schema, showSubmitButton]);

  const listElement = React.useMemo(() => {
    const tmp: any[] = [];
    groupFields?.forEach((schemaFiled: FieldsElementType, index: any) => {
      if (!schemaFiled.hidden) {
        tmp.push(
          <GroupFields
            key={index}
            schema={{
              // propsGridContainer của schema sẽ bị ghi đề bởi propsGridContainer trong UI
              ...schemaFiled,
              propsGridContainer: {
                ...propsGridContainer,
                ...schemaFiled?.propsGridContainer,
              },
            }}
            fieldName={fieldName}
          />
        );
      }
    });
    return tmp;
  }, [fieldName, groupFields, propsGridContainer]);

  const listElementNoHidden = React.useMemo(() => {
    const tmp: any[] = [];
    groupFields?.forEach((schemaFiled: FieldsElementType, index: any) => {
      tmp.push(
        <GroupFields
          key={index}
          schema={{
            ...schemaFiled,
            propsGridContainer: {
              ...propsGridContainer,
              ...schemaFiled?.propsGridContainer,
            },
          }}
          fieldName={fieldName}
        />
      );
    });
    return tmp;
  }, [fieldName, groupFields, propsGridContainer]);

  const getFieldsElement = React.useMemo(() => {
    return groupFields?.reduce((value: some, current: some, index: number) => {
      return {
        ...value,
        [current?.id || index]: current?.fields.reduce(
          (val: some, { key_element, ...cur }: some, idx: number) => {
            return {
              ...val,
              [key_element]: (
                <SchemaElement
                  propsElement={cur}
                  fieldName={mergeFieldName({
                    name: key_element,
                    parent: fieldName,
                  })}
                  key={`${index}-${idx}`}
                  rawElement
                />
              ),
            };
          },
          {}
        ),
      };
    }, {});
  }, [fieldName, groupFields]);

  if (!schema) {
    return null;
  }

  const view = (
    <Grid container spacing={2} wrap="wrap" {...props?.propsGridContainer}>
      {listElement}
    </Grid>
  );

  if (schema?.layout) {
    return (
      <>
        {schema.layout({
          valuesField: methods.getValues(),
          fields: getFieldsElement,
          methods,
          formProps,
          view,
          listElement: listElementNoHidden,
        })}
      </>
    );
  }

  return view;
}

export default memo(SchemaView);
