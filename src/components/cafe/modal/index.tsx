import { Label } from "@mui/icons-material";
import {
  Alert,
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
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BoxStyle } from "./box";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
import { validateName } from "../../../validations/cafe/NameValidator";
import { validateDescription } from "../../../validations/cafe/DescriptionValidator";
import { validateFile } from "../../../validations/cafe/FileValidator";

interface CafeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayTitle: string;
  countries: Array<any>;
  data?: any;
  onSubmit: (name: string, description: string, location: string, file: File | null | undefined) => void;
}

export const CafeModal = (props: CafeModalProps) => {
  const { data } = props;

  const [value, setValue] = useState<string | null>(
    data ? data.location : null
  );
  const [location, setLocation] = useState<any | null>(
    data ? data.location : null
  );

  useEffect(() => {
    setLocation(props.countries.find((c) => (c.label === value ? c : null)));
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

  const [file, setFile] = useState<File | null>();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [name, setName] = useState<string>(data ? data.name : "");
  const [description, setDescription] = useState<string>(data ? data.description : "");
  const [error, setError] = useState<any>();

  const handleSubmit = () => {
    let errorMessage = validateName(name);
    if (errorMessage != null) {
      setError({ error: true, message: errorMessage });
      return;
    }

    errorMessage = validateDescription(description);
    if (errorMessage != null) {
      setError({ error: true, message: errorMessage });
      return;
    }

    if (location == null || location == "") {
      setError({ error: true, message: "Location cannot be empty" });
      return;
    }

    errorMessage = validateFile(file);
    if (errorMessage != null) {
      setError({ error: true, message: errorMessage });
      return;
    }

    setError(null);
    props.onSubmit(name, description, location.value, file);
    handleClose();
  };

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
        {error && (
          <Alert variant="filled" severity="error">
            {error.message}
          </Alert>
        )}
        <FormControl className="create-form" defaultValue="" required>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Name *</div>
            </Grid>
            <Grid size={7}>
              <TextField
                required
                placeholder="Cafe Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Description *</div>
            </Grid>
            <Grid size={7}>
              <TextField
                required
                placeholder="Employee Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Location *</div>
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
                  required
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

          <Grid container spacing={5}>
            <Grid size={3}>
              <div className="label">Upload Logo (optional) </div>
            </Grid>
            <Grid size={7}>
              {file ? (
                <Button
                  variant="outlined"
                  onClick={() => setFile(null)}
                  endIcon={<CloseIcon />}
                >
                  {file.name}
                </Button>
              ) : (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload logo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) =>
                      event.target.files && setFile(event.target.files[0])
                    }
                  />
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Button onClick={() => handleSubmit()} variant="contained" className="form-button">
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
