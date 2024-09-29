import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./styles.scss";
import { Button } from "@mui/material";
import { useEffect } from "react";

interface FilterProps {
  field: string;
  selected: any;
  setSelected: (value: string) => void;
  items: Array<any>;
  resetFilters: () => void;
}

export const FilterPane = (props: FilterProps) => {
  const [value, setValue] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="filter-table">
      <InputLabel className="filter-input-label" sx={{ mt: 2 }}>
        Filter By:
      </InputLabel>
      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel
          sx={{ minWidth: 200 }}
          id="controlled-open-select-label"
        >
          Search for {props.field}
        </InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.selected.label}
          label={props.field}
          onChange={handleChange}
        >
          {props.items.map((item: any) => (
            <MenuItem key={item.value} value={item.label} onClick={() => props.setSelected(item)}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={{ mt: 4 }} variant="outlined" className="clear-filter-button" onClick={() => props.resetFilters()}>
        Reset Filters
      </Button>
    </div>
  );
};
