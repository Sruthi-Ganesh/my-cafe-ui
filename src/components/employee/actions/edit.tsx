import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomCellRendererProps } from "ag-grid-react";
import { EmployeeModal } from "../modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCafeFilter } from "../../../apis/cafe";

library.add(faPenToSquare);

export const EditEmployeeComponent = (params: CustomCellRendererProps) => {
  const [editModalOpen, setEditModelOpen] = useState<boolean>(false);

  const cafeQuery = useQuery({
    queryKey: ["cafes"],
    queryFn: () => {
      return getAllCafeFilter();
    },
  });
  
  return (
    <>
      <EmployeeModal cafes={cafeQuery.data} data={params.data} displayTitle="Update Employee Form" open={editModalOpen} setOpen={setEditModelOpen}></EmployeeModal>
      <FontAwesomeIcon onClick={() => setEditModelOpen(true)} icon="fa-pen-to-square" />
    </>
  );
};
