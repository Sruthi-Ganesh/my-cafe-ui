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
import { useState } from "react";
import { BoxStyle } from "./box";
import { GENDER } from "./gender";
import Grid from "@mui/material/Grid2";
import "./styles.scss";

interface EmployeeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayTitle: string;
  cafes: Array<any>;
  data?: any;
}

export const EmployeeModal = (props: EmployeeModalProps) => {
  const {data} = props;

  const [gender, setGender] = useState<string>(data ? data.gender : "MALE");

  const handleGenderChange = (event: SelectChangeEvent<typeof gender>) => {
    setGender(event.target.value);
  };

  const [cafe, setCafe] = useState<string | null>(data && data.cafe ? data.cafe.id : null);

  const handleCafeChange = (event: SelectChangeEvent<typeof cafe>) => {
    setCafe(event.target.value);
  };

  const [cafeSelectOpen, setCafeSelectOpen] = useState(false);

  const handleCafeSelectClose = () => {
    setCafeSelectOpen(false);
  };

  const handleCafeSelectOpen = () => {
    setCafeSelectOpen(true);
  };

  const [genderSelectOpen, setGenderSelectOpen] = useState(false);

  const handleGenderSelectClose = () => {
    setGenderSelectOpen(false);
  };

  const handleGenderSelectOpen = () => {
    setGenderSelectOpen(true);
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
              <TextField required placeholder="Employee Name" value={data ? data.name : ''} />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Email Address</div>
            </Grid>
            <Grid size={7}>
              <TextField required placeholder="Employee Email Address" value={data ? data.email_address : ''}/>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Phone Number</div>
            </Grid>
            <Grid size={7}>
              <TextField required placeholder="Employee Phone Number" value={data ? data.phone_number : ''}/>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Gender</div>
            </Grid>
            <Grid size={7}>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                open={genderSelectOpen}
                onClose={handleGenderSelectClose}
                onOpen={handleGenderSelectOpen}
                value={gender}
                onChange={handleGenderChange}
              >
                {GENDER.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Cafe</div>
            </Grid>
            <Grid size={7}>
              <FormControl sx={{ m: 2, minWidth: 200 }}>
                <InputLabel
                  sx={{ minWidth: 200 }}
                  id="controlled-open-select-label"
                >
                  Select Employee Cafe
                </InputLabel>
                <Select
                  labelId="controlled-open-select-label"
                  id="cafe-select"
                  open={cafeSelectOpen}
                  onClose={handleCafeSelectClose}
                  onOpen={handleCafeSelectOpen}
                  value={cafe}
                  onChange={handleCafeChange}
                >
                  <MenuItem key={"null"} value={""}>
                    None
                  </MenuItem>
                  {props.cafes.map((cafe: any) => (
                    <MenuItem key={cafe.value} value={cafe.value}>
                      {cafe.label}
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
