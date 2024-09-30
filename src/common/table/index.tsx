import { useCallback, useMemo } from "react";
import { GridTable } from "./grid";

interface TableProps {
  data: Array<any>;
  headerData: any;
  refreshData: (page: number, page_size: number) => void;
  page: number;
  pageSize: number;
}

export const Table = (props: TableProps) => {
  const defaultColDef = useMemo(() => {
    return {flex: 10};
  }, []);

  const onReady = useCallback(() => {}, []);

  return (
    <GridTable
      page={props.page}
      pageSize={props.pageSize}
      rowData={props.data}
      columnDefs={props.headerData}
      defaultColDef={defaultColDef}
      onReady={onReady}
      onPaginationChange={props.refreshData}
    />
  );
};
