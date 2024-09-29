import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ConfirmationDialog } from "../../../common/dialog";
import { useState } from "react";
import { CustomCellRendererProps } from "ag-grid-react";

library.add(faTrash);

export const DeleteEmployeeComponent = (params: CustomCellRendererProps) => {
  const [deleteModalOpen, setDeleteModelOpen] = useState<boolean>(false);
  return (
    <>
      <ConfirmationDialog
        title='Delete the employee?'
        content={"Are you sure you want to delete the employee: " + params.data.name}
        open={deleteModalOpen}
        setOpen={setDeleteModelOpen}
      ></ConfirmationDialog>
      <FontAwesomeIcon onClick={() => setDeleteModelOpen(true)} icon="fa-trash" style={{ color: "#cc0000" }} />
    </>
  );
};
