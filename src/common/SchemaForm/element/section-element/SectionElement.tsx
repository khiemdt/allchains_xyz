import { Box, GridProps, Paper, PaperProps, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import { some } from "../../../constants";
import useGeneralHook from "../../../hook/useGeneralHook";
import SchemaView from "../../SchemaView";
import { ISchemaForm } from "../../utils";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "16px 12px",
  },
}));
export interface PropsSectionElement {
  schema?: ISchemaForm;
  title?: React.ReactNode;
  paper?: boolean;
  paperProps?: PaperProps;
  propsGridContainer?: GridProps;
}
interface Props extends PropsSectionElement {
  name: string;
}

const SectionElement = (props: Props | some) => {
  const {
    name,
    schema,
    title,
    paperProps,
    propsGridContainer,
    paper,
    ...rest
  } = props;
  const mainProps = useGeneralHook();
  const classes = useStyles();

  const contentSection = useMemo(() => {
    let tmp = (
      <>
        {title && (
          <Box marginBottom={1.5}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        )}
        <SchemaView
          fieldName={name}
          schema={schema}
          formProps={{ ...rest, ...mainProps }}
          propsGridContainer={propsGridContainer}
        />
      </>
    );
    if (paper || !!paperProps) {
      tmp = (
        <Paper className={classes.paper} {...paperProps}>
          {tmp}
        </Paper>
      );
    }
    return tmp;
  }, [
    classes.paper,
    mainProps,
    name,
    paper,
    paperProps,
    propsGridContainer,
    rest,
    schema,
    title,
  ]);

  return contentSection;
};

export default memo(SectionElement);
