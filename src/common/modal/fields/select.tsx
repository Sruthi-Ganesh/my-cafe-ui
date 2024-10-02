import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SelectFieldType } from "../types";

interface SelectFieldProps {
  label: string;
  gridLabelSize: number;
  gridFieldSize: number;
  required: boolean;
  value?: string;
  selectField?: SelectFieldType;
}

export const CSelectField = (props: SelectFieldProps) => {
  const {
    label,
    gridFieldSize,
    gridLabelSize,
    required,
    value,
    selectField,
  } = props;
  if (!selectField) {
    console.error("Select field not set but the type is set");
    return;
  }
  const { data, open, handleSelect, handleChange, inputLabelText } =
    selectField;
  return (
    <Grid key={label} container spacing={5}>
      <Grid size={gridLabelSize}>
        <div className="label">{label}</div>
      </Grid>
      <Grid size={gridFieldSize}>
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <InputLabel sx={{ minWidth: 200 }} id="controlled-open-select-label">
            {inputLabelText}
          </InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id={label}
            open={open}
            onClose={() => handleSelect(false)}
            onOpen={() => handleSelect(true)}
            value={value}
            onChange={handleChange}
            required={required}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.map((item: any) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
