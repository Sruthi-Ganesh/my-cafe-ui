import { CustomCellRendererProps } from "ag-grid-react";

export const LinkEmployees = (params: CustomCellRendererProps) => {
    return (
        <a href={'/?cafeId=' + params.data.id + '&cafeName=' + params.data.name}>
         See employees
        </a>
    );
}