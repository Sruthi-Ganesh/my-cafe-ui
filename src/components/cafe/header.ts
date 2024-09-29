import { DeleteCafeComponent } from "./actions/delete";
import { EditCafeComponent } from "./actions/edit";
import { LinkEmployees } from "./actions/link";
import { CafeLogoRenderer } from "./actions/logo";

export const Header = [
  {
    field: "edit",
    cellRenderer: EditCafeComponent,
    minWidth: 100
  },
  {
    headerName: "Logo",
    field: "logo",
    cellRenderer: CafeLogoRenderer,
    cellClass: "logoCell",
    minWidth: 100,
  },
  { field: "id", minWidth: 400},
  { field: "name", headerName: "Name", minWidth: 100 },
  { field: "description", headerName: "Description", minWidth: 200 },
  { field: "location", headerName: "Location", minWidth: 200 },
  { field: "employees_count", headerName: "Employees Count", minWidth: 200 },
  {
    field: "employees", headerName: "View Employees",
    cellRenderer: LinkEmployees,
    minWidth: 200
  },
  {
    field: "delete",
    cellRenderer: DeleteCafeComponent,
    minWidth: 100
  },
];
