import { DeleteCafeComponent } from "./actions/delete";
import { EditCafeComponent } from "./actions/edit";
import { LinkEmployees } from "./actions/link";

export const Header = [
  {
    field: "edit",
    cellRenderer: EditCafeComponent
  },
  { field: "id" },
  { field: "name", headerName: "Name" },
  { field: "description", headerName: "Description" },
  { field: "location", headerName: "Location" },
  { field: "employees_count", headerName: "Employees Count" },
  {
    field: "employees", headerName: "View Employees",
    cellRenderer: LinkEmployees
  },
  {
    field: "delete",
    cellRenderer: DeleteCafeComponent
  },
];
