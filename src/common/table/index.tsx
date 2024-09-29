import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { GridTable } from "./grid";

interface TableProps {
  data: Array<any>;
  headerData: any;
  refreshData: (page: number, page_size: number) => void;
}

export const Table = (props: TableProps) => {
  const defaultColDef = useMemo(() => {
    return {};
  }, []);

  const onReady = useCallback(() => {}, []);

  return (
    <GridTable
      rowData={props.data}
      columnDefs={props.headerData}
      defaultColDef={defaultColDef}
      onReady={onReady}
      onPaginationChange={props.refreshData}
    />
  );
};
