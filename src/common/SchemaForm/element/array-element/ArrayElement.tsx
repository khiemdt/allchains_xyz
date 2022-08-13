import { Add } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  ButtonProps,
  Grid,
  GridProps,
  IconButton,
  Paper,
  PaperProps,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { memo, useMemo } from "react";
import {
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { some } from "../../../constants";
import useGeneralHook from "../../../hook/useGeneralHook";
import SchemaView from "../../SchemaView";
import { FormProps, ISchemaForm, mergeFieldName } from "../../utils";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 16,
    position: "relative",
  },
}));
export interface ArrayRawComponentProps {
  formProps: FormProps;
  methods: UseFormReturn<FieldValues>;
  name: string;
  methodsArray: UseFieldArrayReturn<FieldValues, any, "id">;
}
export interface PropsArrayElement extends some {
  schema?: ISchemaForm;
  disableCloseBtn?: (item: some, index: number) => boolean | boolean;
  title?: React.ReactNode;
  paper?: boolean;
  shouldUnregister?: boolean;
  paperProps?: PaperProps;
  gridItemProps?: GridProps;
  gridContainerProps?: GridProps;
  paperItemProps?: PaperProps;
  propsGridContainer?: PaperProps;
  appendButtonProps: ButtonProps;
  label?: React.ReactNode;
  onChange?: (value) => void;
  render?: (
    props: ArrayRawComponentProps
  ) => React.ReactElement<any, any> | null;
}
interface Props extends PropsArrayElement {
  name: any;
}
function ArrayElement(props: Props) {
  const {
    name,
    schema,
    disableCloseBtn,
    title,
    paper,
    paperProps,
    gridItemProps,
    gridContainerProps,
    paperItemProps,
    appendButtonProps,
    label,
    onChange,
    shouldUnregister,
    render,
    propsGridContainer,
    ...rest
  } = props;
  const mainProps = useGeneralHook();
  const classes = useStyles();
  const methods = useFormContext();
  const { control } = methods;
  const methodsArray = useFieldArray({
    control,
    name,
    shouldUnregister: !!shouldUnregister,
  });
  const { fields, append, remove } = methodsArray;

  React.useEffect(() => {
    onChange && onChange(fields);
  }, [fields, onChange]);

  React.useLayoutEffect(() => {
    if (fields.length === 0) {
      append({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contentRender = useMemo(() => {
    let content = render ? (
      render({
        formProps: { ...rest, ...mainProps },
        methods,
        name,
        methodsArray,
      })
    ) : (
      <>
        {title && (
          <Box marginBottom={1.5}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        )}
        <Grid container spacing={2} wrap="wrap" {...gridContainerProps}>
          {fields.map((item: some, index: number) => {
            const disabled =
              typeof disableCloseBtn === "function"
                ? disableCloseBtn(item, index)
                : disableCloseBtn;
            return (
              <Grid key={item.id} item xs={12} {...gridItemProps}>
                <Paper
                  className={classes.paper}
                  variant="outlined"
                  {...paperItemProps}
                >
                  {!disabled && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        remove(index);
                      }}
                      style={{
                        position: "absolute",
                        zIndex: 999,
                        top: 4,
                        right: 4,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  {schema && (
                    <SchemaView
                      fieldName={mergeFieldName({ name, index })}
                      schema={schema}
                      propsGridContainer={propsGridContainer}
                      formProps={{
                        ...rest,
                        ...mainProps,
                        arrayData: { value: item, index: index },
                        methodsArray,
                      }}
                    />
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Button
          variant="text"
          color="primary"
          style={{ marginTop: 8 }}
          startIcon={<Add />}
          {...appendButtonProps}
          onClick={() => {
            append({});
          }}
        >
          {label || <FormattedMessage id="append" />}
        </Button>
      </>
    );
    if (paper || !!paperProps) {
      content = (
        <Paper className={classes.paper} {...paperProps}>
          {content}
        </Paper>
      );
    }
    return content;
  }, [
    render,
    rest,
    mainProps,
    methods,
    name,
    methodsArray,
    title,
    gridContainerProps,
    fields,
    appendButtonProps,
    label,
    paper,
    disableCloseBtn,
    gridItemProps,
    classes.paper,
    paperItemProps,
    schema,
    propsGridContainer,
    remove,
    append,
    paperProps,
  ]);

  return contentRender;
}
export default memo(ArrayElement);
