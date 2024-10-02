import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, ChangeEventHandler } from "react";

export enum FieldType {
    TextField,
    SelectField,
    FileField
}

export type SelectFieldRow = {
    label: string;
    value: string;
}

export type SelectFieldType = {
    data: Array<SelectFieldRow>;
    open: boolean;
    handleSelect: (value: boolean) => void;
    handleChange: (event: SelectChangeEvent<string>) => void;
    inputLabelText: string;
}

export type UploadFileFieldType = {
    fileExists: boolean;
    fileName: string;
    buttonName: string;
    setFile: (file: File | null | undefined) => void;
}

export type ModalType = {
    type: FieldType,
    placeholder?: string,
    label: string,
    gridLabelSize: number,
    gridFieldSize: number,
    value?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    required: boolean,
    className?: string,
    selectField?: SelectFieldType,
    fileField?: UploadFileFieldType
}