import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ConfirmationDialog } from "../../../common/dialog";
import { useState } from "react";
import { CustomCellRendererProps } from "ag-grid-react";
import { deleteEmployee } from "../../../apis/employee";
import { useMutation } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";

library.add(faTrash);

export const DeleteEmployeeComponent = (params: CustomCellRendererProps) => {
  const [deleteModalOpen, setDeleteModelOpen] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      setDeleteModelOpen(false);
      return deleteEmployee(data);
    },
  });

  if (mutation.error) {
    console.log(mutation.error.message);
    return (
      <Alert variant="filled" severity="error">
        {mutation.error.message}
      </Alert>
    );
  }

  if (mutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <ConfirmationDialog
        title='Delete the employee?'
        content={"Are you sure you want to delete the employee: " + params.data.name}
        open={deleteModalOpen}
        setOpen={setDeleteModelOpen}
        onDelete={() => mutation.mutate({empId: String(params.data.id)})}
      ></ConfirmationDialog>
      <FontAwesomeIcon onClick={() => setDeleteModelOpen(true)} icon="fa-trash" style={{ color: "#cc0000" }} />
    </>
  );
};
