import { EditEmployeeComponent } from "./actions/edit";
import { DeleteEmployeeComponent } from "./actions/delete";

export const Header = [
  {
    field: "edit",
    cellRenderer: EditEmployeeComponent
  },
  { field: "id" },
  { field: "name" },
  { field: "email_address", headerName: "Email Address" },
  { field: "phone_number", headerName: "Phone Number" },
  { field: "gender", headerName: "Gender" },
  { field: "cafe.name", headerName: "Current Cafe" },
  { field: "days_worked", headerName: "Days Worked in Cafe" },
  {
    field: "delete",
    cellRenderer: DeleteEmployeeComponent
  },
];
