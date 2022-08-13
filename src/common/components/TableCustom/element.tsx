import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { some } from "../../constants";
import "./styles.scss";

interface TableRowWrapperProps {
  children(
    open: Boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ): ReactElement;
}
export const TableRowWrapper = (props: TableRowWrapperProps) => {
  const { children } = props;
  const [open, setOpen] = useState(false);
  return <>{children(open, setOpen)}</>;
};

export type SortType = "decrease" | "increase" | undefined;
interface TableCellHeaderWrapperProps {
  children(params: {
    sort: SortType;
    setSort: React.Dispatch<React.SetStateAction<SortType>>;
  }): ReactElement;
  defaultSorter?: SortType;
}
export const TableCellHeaderWrapper = (props: TableCellHeaderWrapperProps) => {
  const { children, defaultSorter } = props;
  const [sort, setSort] = useState<SortType>(defaultSorter);
  return <>{children({ sort, setSort })}</>;
};

export const HeaderCaret = (props: { sort: SortType }) => {
  const { sort } = props;
  return (
    <Box display="inline-flex" flexDirection="column" alignItems="center">
      <ArrowDropUpIcon
        style={{ margin: "-7px 0px" }}
        color={sort === "increase" ? undefined : "disabled"}
      />
      <ArrowDropDownIcon
        style={{ margin: "-7px 0px" }}
        color={sort === "decrease" ? undefined : "disabled"}
      />
    </Box>
  );
};

export interface FilterHeaderProps {
  formData?: some;
  iconFilter?: (params: {
    filtered: boolean;
    methods: UseFormReturn<FieldValues>;
  }) => React.ReactNode;
  schemaForm?: (params: {
    methods: UseFormReturn<FieldValues>;
    onClose: () => void;
    open: boolean;
    filtered: boolean;
  }) => React.ReactNode;
  idFilter?: string;
}

export const FilterHeader = (props: FilterHeaderProps) => {
  const { schemaForm, idFilter, iconFilter, formData } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const methods = useForm({
    reValidateMode: "onChange",
    mode: "onSubmit",
  });
  const filtered = methods.formState.isDirty && methods.formState.isSubmitted;

  useEffect(() => {
    methods.reset(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <ButtonBase id={idFilter} onClick={handleClick}>
        {iconFilter ? (
          iconFilter({ filtered, methods })
        ) : (
          <FilterAltIcon
            sx={{ width: 16, height: 24, pointerEvents: "none" }}
            color={filtered ? "primary" : "disabled"}
          />
        )}
      </ButtonBase>
      <ClickAwayListener
        onClickAway={(e: any) => {
          if (e.target.id !== idFilter) {
            setAnchorEl(null);
          }
        }}
      >
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          style={{ zIndex: 800 }}
        >
          <Paper sx={{ p: 1 }} variant="outlined">
            {schemaForm &&
              schemaForm({
                methods,
                open,
                filtered,
                onClose: () => {
                  setAnchorEl(null);
                },
              })}
          </Paper>
        </Popper>
      </ClickAwayListener>
    </>
  );
};
