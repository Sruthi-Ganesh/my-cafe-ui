import { Header } from "./header";
import { getAllEmployees } from "../../apis/employee";
import { Table } from "../../common/table";
import { FilterPane } from "../../common/filter";
import { SEARCH_PARAM } from "./search";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import { getAllCafeFilter } from "../../apis/cafe";
import { Footer } from "../../common/footer";
import { EmployeeModal } from "../../common/modal";
import { getRouteApi, useMatch, useRouterState } from "@tanstack/react-router";
import { Route } from "../../routes/__root";

export const Employee = () => {
  const routeApi = getRouteApi(Route.fullPath);
  const filters = routeApi.useSearch();
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [selected, setSelected] = useState<any>({
    value: filters && filters.cafeId ? filters.cafeId : "",
    label: filters && filters.cafeName ? filters.cafeName : "",
  });
  const [createModalOpen, setCreateModelOpen] = useState<boolean>(false);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["employeeData", page, pageSize, selected.value],
    });
  }, [page, pageSize, selected]);

  const { isPending, error, data } = useQuery({
    queryKey: ["employeeData", page, pageSize, selected.value],
    queryFn: ({ queryKey }) => {
      return getData(
        Number(queryKey[1]),
        Number(queryKey[2]),
        String(queryKey[3])
      );
    },
  });

  const cafeQuery = useQuery({
    queryKey: ["cafes"],
    queryFn: () => {
      return getAllCafeFilter();
    },
  });

  const getData = async (page: number, pageSize: number, itemId: string) => {
    const results = await getAllEmployees(page, pageSize, itemId).then(
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

  if (error) {
    return (
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    );
  }

  if (cafeQuery.error) {
    return (
      <Alert variant="filled" severity="error">
        {cafeQuery.error.message}
      </Alert>
    );
  }

  if (isPending || cafeQuery.isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <FilterPane
        selected={selected}
        setSelected={setSelected}
        resetFilters={resetFilters}
        items={cafeQuery.data}
        field={SEARCH_PARAM.field.name}
      ></FilterPane>
      <Table data={data} refreshData={refreshTable} headerData={Header} />
      <Footer
        onClick={() => setCreateModelOpen(true)}
        name="Create new Employee"
      ></Footer>
      <EmployeeModal
        cafes={cafeQuery.data}
        displayTitle="Create Employee Form"
        open={createModalOpen}
        setOpen={setCreateModelOpen}
      ></EmployeeModal>
    </>
  );
};
