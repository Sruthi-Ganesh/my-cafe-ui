import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomCellRendererProps } from "ag-grid-react";
import { EmployeeModal } from "../../employee/modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../../../apis/countries";
import { CafeModal } from "../modal";

library.add(faPenToSquare);

export const EditCafeComponent = (params: CustomCellRendererProps) => {
  const [editModalOpen, setEditModelOpen] = useState<boolean>(false);

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      return getAllCountries();
    },
  });
  
  return (
    <>
      <CafeModal countries={countryQuery.data} data={params.data} displayTitle="Update Employee Form" open={editModalOpen} setOpen={setEditModelOpen}></CafeModal>
      <FontAwesomeIcon onClick={() => setEditModelOpen(true)} icon="fa-pen-to-square" />
    </>
  );
};
