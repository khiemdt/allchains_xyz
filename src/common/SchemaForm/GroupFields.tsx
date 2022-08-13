import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { some } from "../constants";
import SchemaElement from "./SchemaElement";
import { mergeFieldName } from "./utils";
interface Props {
  schema: some;
  fieldName?: `${string}` | `${string}.${string}` | `${string}.${number}`;
}

function GroupFields(props: Props) {
  const { schema, fieldName } = props;

  const {
    fields,
    propsWrapper,
    propsGridContainer,
    paper,
    title,
    paperProps,
    className,
  } = schema;
  const content = React.useMemo(() => {
    const elementsBox = fields?.map(
      ({ key_element, ...value }: some, index: number) => {
        return (
          <SchemaElement
            key={key_element}
            propsElement={value}
            fieldName={mergeFieldName({ name: key_element, parent: fieldName })}
          />
        );
      }
    );

    let tmpContent;
    if (elementsBox?.length) {
      tmpContent = (
        <Grid container spacing={2} wrap="wrap" {...propsGridContainer}>
          {elementsBox}
        </Grid>
      );
    }

    if (title) {
      tmpContent = (
        <>
          {typeof title === "string" ? (
            <Box marginBottom={1.5} component="div">
              <Typography variant="h6">{title}</Typography>
            </Box>
          ) : (
            title
          )}
          {tmpContent}
        </>
      );
    }
    if (paper) {
      tmpContent = (
        <Paper variant="outlined" className={className} {...paperProps}>
          {tmpContent}
        </Paper>
      );
    }

    tmpContent = (
      <Grid item xs={12} {...propsWrapper}>
        {tmpContent}
      </Grid>
    );
    return tmpContent;
  }, [
    className,
    fieldName,
    fields,
    paper,
    paperProps,
    propsGridContainer,
    propsWrapper,
    title,
  ]);

  return <>{content}</>;
}

export default GroupFields;
