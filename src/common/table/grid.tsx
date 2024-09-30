import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { PAGE_SIZE } from "./page";
import { useMemo } from "react";
import { PaginationChangedEvent } from "ag-grid-community";
import "./styles.scss";

interface GridProps {
  rowData: any;
  columnDefs: any;
  defaultColDef: any;
  onPaginationChange: (page: number, page_size: number) => void;
  onReady: () => void;
  page: number;
  pageSize: number;
}

export const GridTable = (props: GridProps) => {
  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return PAGE_SIZE.page_options;
  }, []);

  const onPaginationChange = (event: PaginationChangedEvent<any>) => {
    props.onPaginationChange(
      event.api.paginationGetCurrentPage() + 1,
      event.api.paginationGetPageSize()
    );
  };

  return (
    <div className="table">
      <div className="ag-theme-quartz-dark">
        <AgGridReact
          getRowId={(params: any) => params.data.id}
          pagination={true}
          rowData={props.rowData}
          columnDefs={props.columnDefs}
          defaultColDef={props.defaultColDef}
          onGridReady={props.onReady}
          paginationPageSize={props.pageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onPaginationChanged={onPaginationChange}
        />
      </div>
    </div>
  );
};
