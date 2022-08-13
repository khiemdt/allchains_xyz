import { Pagination } from "@mui/material";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import React, { useCallback, useEffect } from "react";

function TablePaginationActionsCustom(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const controlKeyDown = useCallback(
    (event) => {
      event.stopPropagation();

      const key = event.keyCode;
      if (key === 37) {
        if (!page) {
          return;
        }
        onPageChange(event as any, page - 1);
        // left arrow
      } else if (key === 39) {
        if (page === Math.ceil(count / rowsPerPage) - 1) {
          return;
        }
        onPageChange(event as any, page + 1);
        // right arrow
      }
    },
    [count, onPageChange, page, rowsPerPage]
  );

  useEffect(() => {
    window.addEventListener("keydown", controlKeyDown);
    return () => window.removeEventListener("keydown", controlKeyDown);
  }, [controlKeyDown]);

  return (
    <>
      <Pagination
        page={page + 1}
        count={Math.ceil(count / rowsPerPage)}
        onChange={(e, page) => {
          onPageChange(e as any, page - 1);
        }}
        variant="text"
        color="primary"
        shape="rounded"
      />
    </>
  );
}
export default TablePaginationActionsCustom;
