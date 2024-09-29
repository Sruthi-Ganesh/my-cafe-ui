
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.scss";
import { PAGE_SIZE } from "./page";
import { useMemo } from "react";
import { PaginationChangedEvent } from "ag-grid-community";

interface GridProps {
  rowData: any;
  columnDefs: any;
  defaultColDef: any;
  onPaginationChange: (page: number, page_size: number) => void;
  onReady: () => void;
}

export const GridTable = (props: GridProps) => {
  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return PAGE_SIZE.page_options;
  }, []);

  const onPaginationChange = (event: PaginationChangedEvent<any>) => {
    props.onPaginationChange(event.api.paginationGetCurrentPage() + 1, event.api.paginationGetPageSize());
  }
  
  return (
    <div className="table">
      <div
        className="ag-theme-quartz-dark" >
        <AgGridReact
          pagination={true}
          rowData={props.rowData}
          columnDefs={props.columnDefs}
          defaultColDef={props.defaultColDef}
          onGridReady={props.onReady}
          paginationPageSize={PAGE_SIZE.page_size}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onPaginationChanged={onPaginationChange}
        />
      </div>
    </div>
  );
};
