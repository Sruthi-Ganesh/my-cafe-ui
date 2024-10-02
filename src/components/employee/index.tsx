import { Header } from "./header";
import { createEmployee, getAllEmployees } from "../../apis/employee";
import { Table } from "../../common/table";
import { FilterPane } from "../../common/filter";
import { SEARCH_PARAM } from "./search";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import { getAllCafeFilter } from "../../apis/cafe";
import { Footer } from "../../common/footer";
import { EmployeeModal } from "./modal";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/__root";
import { PAGE_SIZE } from "../../common/table/page";

export const Employee = () => {
  const routeApi = getRouteApi(Route.fullPath);
  const filters = routeApi.useSearch();
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(PAGE_SIZE.page);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE.page_size);
  const [selected, setSelected] = useState<any>({
    value: filters && filters.cafeId ? filters.cafeId : "",
    label: filters && filters.cafeName ? filters.cafeName : "",
  });
  const [createModalOpen, setCreateModelOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const navigateToDefault = () => {
    navigate({ to: "/" });
  };

  const resetFilters = () => {
    setSelected({ value: "" });
    navigateToDefault();
  };

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return createEmployee(data).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["employeeData", page, pageSize, selected.value],
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

  if (cafeQuery.error) {
    return (
      <Alert variant="filled" severity="error">
        {cafeQuery.error.message}
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

  if (isPending || cafeQuery.isPending || mutation.isPending) {
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
      <Table
        page={page}
        pageSize={pageSize}
        data={data}
        refreshData={refreshTable}
        headerData={Header}
      />
      <Footer
        onClick={() => setCreateModelOpen(true)}
        name="Create new Employee"
      ></Footer>
      <EmployeeModal
        onSubmit={(name, email_address, phone_number, gender, cafe_id) =>
          mutation.mutate({
            name,
            email_address,
            phone_number,
            gender,
            cafe_id: cafe_id ? cafe_id : null,
          })
        }
        cafes={cafeQuery.data}
        displayTitle="Create Employee Form"
        open={createModalOpen}
        setOpen={setCreateModelOpen}
      ></EmployeeModal>
    </>
  );
};
