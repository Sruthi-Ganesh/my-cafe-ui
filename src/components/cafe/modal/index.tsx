import { Label } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BoxStyle } from "./box";
import Grid from "@mui/material/Grid2";
import "./styles.scss";

interface CafeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayTitle: string;
  countries: Array<any>;
  data?: any;
}

export const CafeModal = (props: CafeModalProps) => {
  const {data} = props;

  const [value, setValue] = useState<string | null>(data ? data.location : null);
  const [location, setLocation] = useState<string | null>(data ? data.location : null);

  useEffect(() => {
    setLocation(props.countries.find(c => c.label === value ? c : null))
  }, [value]);

  const handleCafeChange = (event: SelectChangeEvent<typeof location>) => {
    setValue(event.target.value);
  };

  const [locationSelectOpen, setLocationSelectOpen] = useState(false);

  const handleCafeSelectClose = () => {
    setLocationSelectOpen(false);
  };

  const handleCafeSelectOpen = () => {
    setLocationSelectOpen(true);
  };

  const handleClose = () => props.setOpen(false);

  return (
    <Modal open={props.open} onClose={handleClose} className="create-modal">
      <Box sx={BoxStyle}>
        <AppBar className="create-appbar" position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.displayTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <FormControl className="create-form" defaultValue="" required>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Name</div>
            </Grid>
            <Grid size={7}>
              <TextField required placeholder="Cafe Name" value={data ? data.name : ""}/>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Description</div>
            </Grid>
            <Grid size={7}>
              <TextField required placeholder="Employee Description" value={data ? data.description : ""}/>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Location</div>
            </Grid>
            <Grid size={7}>
              <FormControl sx={{ m: 2, minWidth: 200 }}>
                <InputLabel
                  sx={{ minWidth: 200 }}
                  id="controlled-open-select-label"
                >
                  Select Cafe Location
                </InputLabel>
                <Select
                  labelId="controlled-open-select-label"
                  id="cafe-select"
                  open={locationSelectOpen}
                  onClose={handleCafeSelectClose}
                  onOpen={handleCafeSelectOpen}
                  value={value}
                  onChange={handleCafeChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {props.countries.map((country: any) => (
                    <MenuItem key={country.value} value={country.label}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Button variant="contained" className="form-button">
              Submit
            </Button>
            <Button
              variant="outlined"
              className="form-button"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </FormControl>
      </Box>
    </Modal>
  );
};
