import { Table } from "../../common/table";
import { Header } from "./header";
import { createCafe, getAllCafes } from "../../apis/cafe";
import { getAllEmployees } from "../../apis/employee";
import { FilterPane } from "../../common/filter";
import { SEARCH_PARAM } from "./search";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import { getAllCountries } from "../../apis/countries";
import { Footer } from "../../common/footer";
import { CafeModal } from "./modal";
import { PAGE_SIZE } from "../../common/table/page";

export const Cafe = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(PAGE_SIZE.page);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE.page_size);
  const [selected, setSelected] = useState<any>({ value: "" });
  const [createModalOpen, setCreateModelOpen] = useState<boolean>(false);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["cafeData", page, pageSize, selected.value],
    });
  }, [page, pageSize, selected]);

  const countryQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      return getAllCountries();
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["cafeData", page, pageSize, selected.value],
    queryFn: ({ queryKey }) => {
      return getData(
        Number(queryKey[1]),
        Number(queryKey[2]),
        String(queryKey[3])
      );
    },
  });

  const getData = async (
    page: number,
    pageSize: number,
    location: string | null
  ) => {
    const results = await getAllCafes(page, pageSize, location).then(
      (data) => data.results
    );
    return results;
  };

  const refreshTable = (page: number, page_size: number) => {
    setPage(page);
    setPageSize(page_size);
  };

  const resetFilters = () => {
    setSelected({ value: "" });
  };

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return createCafe(data).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["cafeData", page, pageSize, selected.value],
        });
        return data;
      });
    },
  });

  if (error) {
    return (
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    );
  }

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

  if (isPending || countryQuery.isPending || mutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <FilterPane
        selected={selected}
        setSelected={setSelected}
        resetFilters={resetFilters}
        items={countryQuery.data}
        field={SEARCH_PARAM.field.name}
      ></FilterPane>
      <Table data={data} refreshData={refreshTable} headerData={Header} />
      <Footer
        onClick={() => setCreateModelOpen(true)}
        name="Create new Cafe"
      ></Footer>
      <CafeModal
        onSubmit={(name, description, location, file) =>
          mutation.mutate({ name, description, location, file })
        }
        open={createModalOpen}
        setOpen={setCreateModelOpen}
        displayTitle="Create new Cafe"
        countries={countryQuery.data}
      ></CafeModal>
    </>
  );
};
