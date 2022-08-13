import { TableCellProps, TypographyProps } from "@mui/material";
import { get } from "lodash";
import React from "react";
import { some } from "../../constants";
import { FilterHeaderProps, SortType } from "./element";
import "./styles.scss";
export interface Columns extends some {
  title?: React.ReactNode;
  dataIndex?: string;
  key?: string;
  align?: TableCellProps["align"];
  rowSpan?: TableCellProps["rowSpan"];
  colSpan?: TableCellProps["colSpan"];
  props?: ((record: some) => TableCellProps) | TableCellProps;
  headerProps?: TableCellProps;
  render?: (col: some, index: number) => JSX.Element | string;
  fixed?: "right" | "left";
  width?: number | string;
  minWidth?: number | string;
  hidden?: boolean;
  disableAction?: boolean;
  lastCell?: LastCell;
  children?: Columns[];
  sorter?: (a: any, b: any) => number;
  onSorter?: (params: {
    sort: SortType;
    setSort: React.Dispatch<React.SetStateAction<SortType>>;
  }) => void;
  defaultSorter?: SortType;
  renderFilter?: Omit<FilterHeaderProps, "idFilter">;
  variant?: TypographyProps["variant"];
}

export interface LastCell extends Omit<Columns, "render"> {
  render?: (selectedRowKeys?: some[]) => JSX.Element;
}
export interface RowSelection {
  key?: string;
  columnTitle?: React.ReactNode;
  columnWidth?: string | number;
  fixed?: boolean;
  hideSelectAll?: boolean;
  selectedRowKeys?: some[];
  onSelect?: (params: {
    record: some;
    selected: boolean;
    selectedRows: some[];
  }) => void;
  onSelectAll?: (params: {
    changeRows: some[];
    selected: boolean;
    selectedRows: some[];
  }) => void;
  onChange?: (params: {
    selectedRowKeys: (string | number)[];
    selectedRows: some[];
  }) => void;
  render?: (
    params: {
      record: some;
      selected: boolean;
      selectedRows: some[];
      onChange: (selected: boolean) => void;
    },
    defaultContent: React.ReactNode
  ) => React.ReactNode;
  hidden?: (record: some) => boolean;
}

export const getArrayDepth = (columns: Columns[]) => {
  return (
    1 +
    Math.max(
      ...columns.map((v) => (v.children ? getArrayDepth(v.children) : 0)),
      0
    )
  );
};

export const getColSpan = (columns: Columns): number => {
  let sum = 0;
  if (columns.children && columns.children.length > 0) {
    sum = sum + columns.children.reduce((v, c) => v + getColSpan(c), 0);
  } else {
    sum = sum + 1;
  }
  return sum;
};

export const getColumns = (columns: Columns[]): Columns[] => {
  let tmp: Columns[] = [];
  columns.forEach((column: Columns) => {
    if (column.children) {
      tmp = [...tmp, ...getColumns(column.children)];
    } else {
      tmp = [...tmp, column];
    }
  });

  return tmp;
};

const getColumnsHeader = (columns: Columns[], floor: number = 0, tmp?: any) => {
  columns.forEach((val: Columns, index: number) => {
    const { children = [], ...column } = val;
    const depth = getArrayDepth(columns);
    const colSpan = getColSpan(val);
    tmp = {
      ...tmp,
      [floor]: [
        ...(get(tmp, floor, []) as any),
        {
          colSpan: colSpan === 1 ? undefined : colSpan,
          rowSpan: children.length > 0 ? 1 : depth,
          ...column,
        },
      ],
    };
    if (children.length > 0) {
      tmp = getColumnsHeader(children, floor + 1, tmp);
    }
  });
  return tmp;
};
export const renderColumnHeader = (columns: Columns[]) => {
  return Object.values(getColumnsHeader(columns)) as Columns[][];
};

export const getFlatDataSource = (data: some[]) => {
  return data.filter(Boolean).reduce((val: some[], current: some) => {
    return [...val, current, ...getFlatDataSource(current.children || [])];
  }, []);
};
