import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  gridLabelSize: number;
  gridFieldSize: number;
  required: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const CTextField = (props: TextFieldProps) => {
  const {
    label,
    gridFieldSize,
    gridLabelSize,
    required,
    placeholder,
    value,
    onChange,
  } = props;
  return (
    <Grid key={label} container spacing={5}>
      <Grid size={gridLabelSize}>
        <div className="label">{label}</div>
      </Grid>
      <Grid size={gridFieldSize}>
        <TextField
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e)}
        />
      </Grid>
    </Grid>
  );
};
