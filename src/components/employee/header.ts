import { EditEmployeeComponent } from "./actions/edit";
import { DeleteEmployeeComponent } from "./actions/delete";
import { DaysCalculatorComponent } from "./actions/calc";

export const Header = [
  {
    field: "edit",
    cellRenderer: EditEmployeeComponent,
    minWidth: 100,
  },
  { field: "id", minWidth: 100 },
  { field: "name", minWidth: 150 },
  { field: "email_address", headerName: "Email Address", minWidth: 200 },
  { field: "phone_number", headerName: "Phone Number", minWidth: 200 },
  { field: "gender", headerName: "Gender", minWidth: 100 },
  { field: "cafe.name", headerName: "Current Cafe", minWidth: 100 },
  {
    field: "days_worked",
    headerName: "Days Worked in Cafe",
    minWidth: 200,
    cellRenderer: DaysCalculatorComponent,
  },
  {
    field: "delete",
    cellRenderer: DeleteEmployeeComponent,
    minWidth: 100,
    cellRendererParams: {},
  },
];
