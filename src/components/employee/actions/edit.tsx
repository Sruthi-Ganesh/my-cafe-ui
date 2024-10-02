import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomCellRendererProps } from "ag-grid-react";
import { EmployeeModal } from "../modal";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCafeFilter } from "../../../apis/cafe";
import { Alert, CircularProgress } from "@mui/material";
import { updateEmployee } from "../../../apis/employee";

library.add(faPenToSquare);

export const EditEmployeeComponent = (params: CustomCellRendererProps) => {
  const [editModalOpen, setEditModelOpen] = useState<boolean>(false);

  const cafeQuery = useQuery({
    queryKey: ["cafes"],
    queryFn: () => {
      return getAllCafeFilter();
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return updateEmployee(data).then((res) => {
        params.api.applyTransaction({ update: [res] });
        return res;
      });
    },
  });

  if (cafeQuery.error) {
    return (
      <Alert variant="filled" severity="error">
        {cafeQuery.error.message}
      </Alert>
    );
  }

  if (mutation.error) {
    console.log(mutation.error);
    return (
      <Alert variant="filled" severity="error">
        {mutation.error.message}
      </Alert>
    );
  }

  if (cafeQuery.isPending || mutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <EmployeeModal
        onSubmit={(name, email_address, phone_number, gender, cafe_id) =>
          mutation.mutate({
            name,
            email_address,
            phone_number,
            gender,
            cafe_id: cafe_id ? cafe_id : null,
            empId: params.data.id,
          })
        }
        cafes={cafeQuery.data}
        data={params.data}
        displayTitle="Update Employee Form"
        open={editModalOpen}
        setOpen={setEditModelOpen}
      ></EmployeeModal>
      <FontAwesomeIcon
        onClick={() => setEditModelOpen(true)}
        icon="fa-pen-to-square"
      />
    </>
  );
};
