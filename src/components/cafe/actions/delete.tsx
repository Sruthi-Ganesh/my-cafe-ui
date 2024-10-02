import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { CustomCellRendererProps } from "ag-grid-react";
import { ConfirmationDialog, DialogType } from "../../../common/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteCafe } from "../../../apis/cafe";
import { Alert, CircularProgress } from "@mui/material";

library.add(faTrash);

export const DeleteCafeComponent = (params: CustomCellRendererProps) => {
  const [deleteModalOpen, setDeleteModelOpen] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      setDeleteModelOpen(false);
      return deleteCafe(data).then((res) => {
        params.api.applyTransaction({ remove: [{ id: data.cafeId }] });
        return res;
      });
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
        type={DialogType.error}
        title="Delete the cafe?"
        content={
          "Are you sure you want to delete the cafe: " + params.data.name
        }
        open={deleteModalOpen}
        setOpen={setDeleteModelOpen}
        onClick={() => mutation.mutate({ cafeId: String(params.data.id) })}
        buttonText="Delete"
      ></ConfirmationDialog>
      <FontAwesomeIcon
        onClick={() => setDeleteModelOpen(true)}
        icon="fa-trash"
        style={{ color: "#cc0000" }}
      />
    </>
  );
};
