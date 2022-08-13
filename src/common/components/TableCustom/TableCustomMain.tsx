import styled from "@emotion/styled";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Checkbox,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableProps,
  TableRow,
  TableRow as TableRowRaw,
  TableRowProps,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BoxProps } from "@mui/system";
import { get } from "lodash";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { NoData } from "../../../svg";
import { some } from "../../constants";
import {
  FilterHeader,
  HeaderCaret,
  TableCellHeaderWrapper,
  TableRowWrapper,
} from "./element";
import "./styles.scss";
import TablePaginationActionsCustom from "./TablePaginationActionsCustom";
import {
  Columns,
  getColumns,
  getFlatDataSource,
  renderColumnHeader,
  RowSelection,
} from "./utils";
export const Row = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0px 4px;
`;

function useStickyResult(value) {
  const val = useRef<some[]>([]);
  if (value !== undefined) val.current = value;
  return val.current || [];
}

function useStickyCountPagin(value) {
  const val = useRef<number>(0);
  if (value !== undefined && value !== val.current) val.current = value;
  return val.current || 0;
}

const useStyles = makeStyles((theme: Theme) => ({
  indeterminateColor: {
    color: theme.palette.primary.main,
  },
}));

interface Props {
  tableProps?: TableProps;
  containerProps?: TableContainerProps;
  boxProps?: BoxProps;
  bodyProps?: TableBodyProps;
  rowProps?: (col: some, index: number) => TableRowProps;
  dataSource?: some[];
  columns: Columns[];
  paginationProps?: TablePaginationProps;
  loading?: boolean;
  hideColumnIndex?: boolean;
  fixIndexColumn?: boolean;
  hiddenHeader?: boolean;
  isLoadDone?: boolean;
  rowSelection?: RowSelection;
  caption?: React.ReactNode;
  skeletonRow?: number;
}

export const TableCustomMain = (propTable: Props) => {
  const {
    dataSource: data,
    columns,
    tableProps,
    containerProps,
    bodyProps,
    rowProps,
    paginationProps,
    loading,
    hideColumnIndex,
    fixIndexColumn,
    hiddenHeader,
    rowSelection,
    caption,
    boxProps,
    skeletonRow,
  } = propTable;
  const intl = useIntl();
  const classes = useStyles();
  const [selection, setSelection] = useState<some[]>([]);
  const keySelection = rowSelection?.key || "id";
  const container = useRef<HTMLDivElement>(null);
  const dataSource = useStickyResult(data);
  const [sortData, setSortData] = useState<any>(undefined);
  const countPagination = useStickyCountPagin(paginationProps?.count);

  const getRowIndex = useCallback(
    (i: number) => {
      let index = i;
      if (paginationProps) {
        index += paginationProps.page * paginationProps.rowsPerPage;
      }
      return index;
    },
    [paginationProps]
  );

  const flatDataSource = useMemo(() => {
    const temp = dataSource ? getFlatDataSource(dataSource as some[]) : [];
    return temp;
  }, [dataSource]);

  const setSelectionFnc = useCallback(
    (record: some, checkedValue: boolean) => {
      if (!rowSelection) {
        return;
      }
      const { onSelect, onChange } = rowSelection;
      const keyValue = record[keySelection];
      const tmp = checkedValue
        ? [...selection, record]
        : selection.filter((v) => v[keySelection] !== keyValue);
      setSelection(tmp);
      onChange &&
        onChange({
          selectedRowKeys: tmp.map((v) => v[keySelection]),
          selectedRows: tmp,
        });
      onSelect &&
        onSelect({
          record: record,
          selected: checkedValue,
          selectedRows: tmp,
        });
    },
    [keySelection, rowSelection, selection]
  );

  const { getFlatColumn, columnsRaw } = useMemo(() => {
    let tmp = [...columns];

    if (!hideColumnIndex) {
      tmp = [
        {
          title: "no",
          dataIndex: "index",
          fixed: fixIndexColumn ? "left" : undefined,
          width: 70,
          minWidth: 70,
          align: "center",
        } as Columns,
        ...tmp,
      ];
    }
    if (rowSelection) {
      const {
        columnWidth,
        columnTitle,
        onSelectAll,
        onChange,
        hideSelectAll,
        fixed,
        render,
        hidden,
      } = rowSelection;
      const dataTmp = hidden
        ? flatDataSource.filter((v) => !hidden(v))
        : flatDataSource;
      const checkedAll =
        dataTmp?.filter((value) => {
          return selection.find((v) => v[keySelection] === value[keySelection]);
        }).length === dataTmp.length && dataTmp.length > 0;
      tmp = [
        {
          fixed: fixed ? "left" : undefined,
          width: columnWidth || 48,
          align: "center",
          disableAction: true,
          props: { style: { padding: 8 } },
          headerProps: { style: { padding: 8 } },
          title:
            columnTitle ||
            (!hideSelectAll && (
              <Checkbox
                classes={{ indeterminate: classes.indeterminateColor }}
                style={{ padding: 0 }}
                disableTouchRipple
                disableRipple
                disableFocusRipple
                checked={checkedAll}
                disabled={!dataTmp.length}
                indeterminate={selection?.length > 0 && !checkedAll}
                color="secondary"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={(event) => {
                  const checkedValue = event.target.checked;
                  const tmp = checkedValue
                    ? flatDataSource.filter((val) =>
                        hidden ? !hidden(val) : true
                      )
                    : [];
                  setSelection(tmp);
                  onChange &&
                    onChange({
                      selectedRowKeys: tmp.map((v) => v[keySelection]),
                      selectedRows: tmp,
                    });
                  onSelectAll &&
                    onSelectAll({
                      selected: checkedValue,
                      selectedRows: tmp,
                      changeRows: checkedValue
                        ? flatDataSource.filter(
                            (val) =>
                              !selection.find(
                                (v) => v[keySelection] === val[keySelection]
                              )
                          )
                        : flatDataSource,
                    });
                }}
              />
            )),
          renderCore: (record) => {
            const keyValue = record[keySelection];
            const checked = !!selection.find(
              (v) => v[keySelection] === keyValue
            );
            const content =
              hidden && hidden(record) ? null : (
                <Checkbox
                  style={{ padding: 0 }}
                  disableTouchRipple
                  disableRipple
                  disableFocusRipple
                  disabled={record?.disabled}
                  color="secondary"
                  checked={checked}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  onChange={(event) => {
                    const checkedValue = event.target.checked;
                    setSelectionFnc(record, checkedValue);
                  }}
                />
              );
            return typeof render === "function"
              ? render(
                  {
                    record,
                    onChange: (selected: boolean) =>
                      setSelectionFnc(record, selected),
                    selected: checked,
                    selectedRows: selection,
                  },
                  content
                )
              : content;
          },
        } as Columns,
        ...tmp,
      ];
    }
    if (!!dataSource?.find((v) => v?.children && v?.children?.length > 0)) {
      tmp = [
        {
          title: "",
          fixed: "left",
          width: 48,
          align: "center",
          renderCore: (record, index, { open, setOpen }) => {
            return (
              record.children && (
                <IconButton
                  style={{
                    transition: "all 0.3s",
                    transform: `rotate(${open ? 90 : 0}deg)`,
                    padding: 0,
                  }}
                  onClick={() => {
                    setOpen((old) => !old);
                  }}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              )
            );
          },
        } as Columns,
        ...tmp,
      ];
    }
    return { getFlatColumn: getColumns(tmp), columnsRaw: tmp };
  }, [
    columns,
    hideColumnIndex,
    rowSelection,
    dataSource,
    fixIndexColumn,
    flatDataSource,
    classes.indeterminateColor,
    selection,
    keySelection,
    setSelectionFnc,
  ]);

  const getWidthHeader = useCallback(
    (col: Columns) => {
      const { fixed, title } = col;
      let width = 0;
      if (fixed) {
        const columnsTmp =
          fixed === "left" ? [...columnsRaw] : [...columnsRaw].reverse();
        for (let i = 0; i < columnsTmp.length; i += 1) {
          if (title === columnsTmp[i].title) {
            break;
          }
          const tmp = columnsTmp[i].width || columnsTmp[i].minWidth;
          const fixedTmp = columnsTmp[i].fixed;
          if (typeof tmp === "number" && fixedTmp) {
            width += tmp || 0;
          }
        }
      }
      return width;
    },
    [columnsRaw]
  );

  const getWidth = useCallback(
    (col: Columns) => {
      const { fixed, title } = col;
      let width = 0;
      if (fixed) {
        const columnsTmp =
          fixed === "left" ? [...getFlatColumn] : [...getFlatColumn].reverse();
        for (let i = 0; i < columnsTmp.length; i += 1) {
          if (title === columnsTmp[i].title) {
            break;
          }
          const tmp = columnsTmp[i].width || columnsTmp[i].minWidth;
          const fixedTmp = columnsTmp[i].fixed;
          if (typeof tmp === "number" && fixedTmp) {
            width += tmp || 0;
          }
        }
      }
      return width;
    },
    [getFlatColumn]
  );

  const getIndexFixedColumnRight = useMemo(() => {
    const columnsTmp = [...getFlatColumn];
    const index = columnsTmp.findIndex((v) => v.fixed === "right");
    return index;
  }, [getFlatColumn]);

  const getIndexFixedColumnLeft = useMemo(() => {
    const columnsTmp = [...getFlatColumn].reverse();
    const index = columnsTmp.findIndex((v) => v.fixed === "left");
    return columnsTmp.length - index - 1;
  }, [getFlatColumn]);

  const getIndexFixedColumnRightHeader = useMemo(() => {
    const columnsTmp = [...columnsRaw];
    const index = columnsTmp.findIndex((v) => v.fixed === "right");
    return index;
  }, [columnsRaw]);

  const getIndexFixedColumnLeftHeader = useMemo(() => {
    const columnsTmp = [...columnsRaw].reverse();
    const index = columnsTmp.findIndex((v) => v.fixed === "left");
    return columnsTmp.length - index - 1;
  }, [columnsRaw]);

  const getBodyContent = useCallback(
    (data: some[]) => {
      return data.map((item: any, index: number) => {
        return (
          <TableRowWrapper key={item.id || item?.key || index}>
            {(open, setOpen) => (
              <>
                <TableRow {...(rowProps && rowProps(item, index))}>
                  {getFlatColumn
                    .filter((v) => !v.hidden)
                    .map((col: Columns, i: number) => {
                      const {
                        props,
                        fixed,
                        rowSpan,
                        colSpan,
                        render,
                        dataIndex,
                        disableAction,
                        align,
                        renderCore,
                        variant,
                      } = col;
                      const propsCell =
                        typeof props === "function" ? props(item) : props;
                      if (propsCell?.colSpan === 0 || colSpan === 0) {
                        return null;
                      }
                      return (
                        <TableCell
                          key={i}
                          onClick={(e) => {
                            disableAction && e.stopPropagation();
                          }}
                          {...{ align, colSpan, rowSpan, ...propsCell }}
                          className={`${
                            fixed === "left" && getIndexFixedColumnLeft === i
                              ? "table-cell-fix-left-last"
                              : fixed === "right" &&
                                getIndexFixedColumnRight === i
                              ? "table-cell-fix-right-last"
                              : ""
                          } ${propsCell?.className || ""}`}
                          style={{
                            borderBottom:
                              index === data.length - 1 ? "none" : undefined,
                            ...propsCell?.style,
                            position: fixed
                              ? "sticky"
                              : propsCell?.style?.position,
                            left:
                              fixed === "left"
                                ? getWidth(col)
                                : propsCell?.style?.left,
                            right:
                              fixed === "right"
                                ? getWidth(col)
                                : propsCell?.style?.right,
                            zIndex: fixed ? 1 : propsCell?.style?.zIndex,
                          }}
                        >
                          {renderCore &&
                            renderCore(item, index, { open, setOpen })}
                          {loading ? (
                            <Skeleton />
                          ) : render ? (
                            <>{render(item, index)}</>
                          ) : (
                            <>
                              <Typography variant={variant || "caption"}>
                                {dataIndex && get(item, dataIndex, "")}
                              </Typography>
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                </TableRow>
                {open &&
                  item.children?.length > 0 &&
                  getBodyContent(
                    item.children.map((v, index) => {
                      return {
                        ...v,
                        index: getRowIndex(index + 1),
                      };
                    })
                  )}
              </>
            )}
          </TableRowWrapper>
        );
      });
    },
    [
      getFlatColumn,
      getIndexFixedColumnLeft,
      getIndexFixedColumnRight,
      getRowIndex,
      getWidth,
      rowProps,
      loading,
    ]
  );

  const getHeaderContent = useMemo(() => {
    if (hiddenHeader) {
      return null;
    }
    const listColumn = renderColumnHeader(columnsRaw);

    return (
      <TableHead>
        {listColumn.map((val: Columns[], index: number) => {
          return (
            <TableRow
              key={index}
              sx={{
                "&:hover": { boxShadow: 0 },
              }}
            >
              {val
                .filter((v) => !v.hidden)
                .map((col: Columns, index: number) => {
                  const {
                    fixed,
                    width,
                    minWidth,
                    align = "left",
                    rowSpan,
                    colSpan,
                    headerProps,
                    title,
                    sorter,
                    onSorter,
                    defaultSorter,
                    renderFilter,
                  } = col;
                  const idFilter = `filter-btn-${index}`;
                  return (
                    <TableCellHeaderWrapper
                      key={index}
                      defaultSorter={defaultSorter}
                    >
                      {({ sort, setSort }) => {
                        return (
                          <TableCell
                            align={align}
                            key={index}
                            rowSpan={rowSpan}
                            colSpan={colSpan}
                            {...headerProps}
                            className={`${
                              fixed === "left" &&
                              getIndexFixedColumnLeftHeader === index
                                ? "table-cell-fix-left-last"
                                : fixed === "right" &&
                                  getIndexFixedColumnRightHeader === index
                                ? "table-cell-fix-right-last"
                                : ""
                            } ${headerProps?.className || ""}`}
                            style={{
                              ...headerProps?.style,
                              borderBottomLeftRadius: index === 0 ? 8 : 0,
                              borderTopLeftRadius: index === 0 ? 8 : 0,
                              borderTopRightRadius:
                                index === val.length - 1 ? 8 : 0,
                              borderBottomRightRadius:
                                index === val.length - 1 ? 8 : 0,
                              cursor:
                                !!sorter || !!onSorter ? "pointer" : undefined,
                              width: width,
                              minWidth: fixed ? width : minWidth,
                              position: fixed ? "sticky" : undefined,
                              left:
                                fixed === "left"
                                  ? getWidthHeader(col)
                                  : "unset",
                              right:
                                fixed === "right"
                                  ? getWidthHeader(col)
                                  : undefined,
                              zIndex: fixed
                                ? 3
                                : headerProps?.style?.zIndex || 2,
                            }}
                            onClick={(e: any) => {
                              headerProps?.onClick && headerProps?.onClick(e);
                              if (e.target.id === idFilter) {
                                return;
                              }
                              if (onSorter) {
                                const sortTmp =
                                  sort === "increase"
                                    ? "decrease"
                                    : sort === "decrease"
                                    ? undefined
                                    : "increase";
                                onSorter({ sort: sortTmp, setSort });
                              } else if (sorter) {
                                const sortTmp =
                                  sort === "increase"
                                    ? "decrease"
                                    : sort === "decrease"
                                    ? undefined
                                    : "increase";
                                setSort(sortTmp);
                                setSortData(
                                  sortTmp === "increase"
                                    ? [...dataSource]?.sort(sorter)
                                    : sortTmp === "decrease"
                                    ? [...dataSource]?.sort(sorter).reverse()
                                    : undefined
                                );
                              }
                            }}
                          >
                            <Box
                              display="flex"
                              flex="auto"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                flex={1}
                                sx={{
                                  textAlign:
                                    align === "left"
                                      ? "start"
                                      : align === "right"
                                      ? "end"
                                      : align === "center"
                                      ? "center"
                                      : "start",
                                }}
                              >
                                {typeof title === "string"
                                  ? title && (
                                      <Typography
                                        variant="caption"
                                        fontWeight="bold"
                                      >
                                        <FormattedMessage id={title} />
                                      </Typography>
                                    )
                                  : title}
                              </Box>
                              {(!!sorter || !!onSorter) && (
                                <HeaderCaret sort={sort} />
                              )}
                              {renderFilter && (
                                <FilterHeader
                                  key={idFilter}
                                  idFilter={idFilter}
                                  {...renderFilter}
                                />
                              )}
                            </Box>
                          </TableCell>
                        );
                      }}
                    </TableCellHeaderWrapper>
                  );
                })}
            </TableRow>
          );
        })}
      </TableHead>
    );
  }, [
    columnsRaw,
    dataSource,
    getIndexFixedColumnLeftHeader,
    getIndexFixedColumnRightHeader,
    getWidthHeader,
    hiddenHeader,
  ]);

  useEffect(() => {
    setSelection((old) => rowSelection?.selectedRowKeys || old);
  }, [rowSelection?.selectedRowKeys]);

  useEffect(() => {
    if (
      container.current?.offsetWidth &&
      container.current?.scrollWidth &&
      !container.current?.scrollLeft &&
      container.current.offsetWidth < container.current.scrollWidth &&
      !container.current.classList.contains("table-custom-has-fix-right")
    ) {
      container.current.classList.add("table-custom-has-fix-right");
    }
  });

  return (
    <Box position="relative" height="100%" {...boxProps}>
      <TableContainer
        ref={container}
        {...containerProps}
        className={`${containerProps?.className} table-custom`}
        onScrollCapture={(e) => {
          if (!container.current) {
            return;
          }
          if (e.currentTarget.scrollLeft) {
            container.current.classList.add("table-custom-has-fix-left");
          } else {
            container.current.classList.remove("table-custom-has-fix-left");
          }
          if (
            Math.round(
              e.currentTarget.scrollWidth -
                e.currentTarget.clientWidth -
                e.currentTarget.scrollLeft
            ) > 0
          ) {
            container.current.classList.add("table-custom-has-fix-right");
          } else {
            container.current.classList.remove("table-custom-has-fix-right");
          }
        }}
      >
        <Table
          stickyHeader
          {...tableProps}
          // style={{ borderCollapse: "collapse", ...tableProps?.style }}
        >
          {getHeaderContent}
          <TableBody {...bodyProps}>
            {dataSource.length === 0 && !loading && (
              <TableRowRaw>
                <TableCell colSpan={getFlatColumn.length}>
                  {caption !== undefined ? (
                    caption
                  ) : (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 260,
                      }}
                    >
                      <NoData />
                      <Typography variant="inherit">
                        <FormattedMessage id="noData" />
                      </Typography>
                    </Box>
                  )}
                </TableCell>
              </TableRowRaw>
            )}
            {getBodyContent(
              loading
                ? Array(skeletonRow || paginationProps?.rowsPerPage || 10).fill(
                    {
                      loading: true,
                    }
                  )
                : (sortData ? sortData : dataSource).map((v, index) => {
                    return { ...v, index: getRowIndex(index + 1) };
                  })
            )}
            <TableRowRaw key="extendRow" className="extendRow">
              {dataSource &&
                dataSource?.length > 0 &&
                getFlatColumn
                  .filter((v) => !v.hidden && v.lastCell)
                  .map((col: Columns, index: number) => {
                    const { lastCell, disableAction, fixed } = col;
                    const {
                      render,
                      align = "start",
                      colSpan,
                      rowSpan,
                      props,
                    } = lastCell || {};
                    return (
                      <TableCell
                        key={index}
                        onClick={(e) => {
                          disableAction && e.stopPropagation();
                        }}
                        {...{ align, colSpan, rowSpan, ...props }}
                        style={{
                          background: "unset",
                          ...props?.style,
                          position: fixed ? "sticky" : props?.style?.position,
                          left:
                            fixed === "left"
                              ? getWidth(col)
                              : props?.style?.left,
                          right:
                            fixed === "right"
                              ? getWidth(col)
                              : props?.style?.right,
                        }}
                        className={`extendCell ${
                          fixed === "left" && getIndexFixedColumnLeft === index
                            ? "table-cell-fix-left-last"
                            : fixed === "right" &&
                              getIndexFixedColumnRight === index
                            ? "table-cell-fix-right-last"
                            : ""
                        } ${props?.className || ""}`}
                      >
                        {lastCell && <>{render && render(selection)}</>}
                      </TableCell>
                    );
                  })}
            </TableRowRaw>
          </TableBody>
        </Table>
      </TableContainer>
      {paginationProps && (
        <TablePagination
          data-tour="step-5"
          component={Row}
          {...paginationProps}
          count={countPagination}
          labelRowsPerPage={intl.formatMessage({ id: "labelRowPerPage" })}
          ActionsComponent={TablePaginationActionsCustom}
        />
      )}
    </Box>
  );
};

export default memo(TableCustomMain);
