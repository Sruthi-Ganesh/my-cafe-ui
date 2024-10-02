import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomCellRendererProps } from "ag-grid-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../../../apis/countries";
import { CafeModal } from "../modal";
import { Alert, CircularProgress } from "@mui/material";
import { updateCafe } from "../../../apis/cafe";

library.add(faPenToSquare);

export const EditCafeComponent = (params: CustomCellRendererProps) => {
  const [editModalOpen, setEditModelOpen] = useState<boolean>(false);

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      return getAllCountries();
    },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return updateCafe(data).then((res) => {
        params.api.applyTransaction({ update: [res] });
        return res;
      });
    },
  });

  if (countryQuery.error) {
    return (
      <Alert variant="filled" severity="error">
        {countryQuery.error.message}
      </Alert>
    );
  }

  if (mutation.error) {
    return (
      <Alert variant="filled" severity="error">
        {mutation.error.message}
      </Alert>
    );
  }

  if (countryQuery.isPending || mutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <CafeModal
        onSubmit={(name, description, location, file) =>
          mutation.mutate({
            name,
            description,
            location,
            file,
            cafeId: params.data.id,
          })
        }
        countries={countryQuery.data}
        data={params.data}
        displayTitle="Update Cafe Form"
        open={editModalOpen}
        setOpen={setEditModelOpen}
      ></CafeModal>
      <FontAwesomeIcon
        onClick={() => setEditModelOpen(true)}
        icon="fa-pen-to-square"
      />
    </>
  );
};
