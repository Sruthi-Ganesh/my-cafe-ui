import {
  Alert,
  AppBar,
  Box,
  Button,
  FormControl,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { BoxStyle } from "./box";
import Grid from "@mui/material/Grid2";
import { FieldType, ModalType } from "./types";
import "./styles.scss";
import { CTextField } from "./fields/text";
import { CSelectField } from "./fields/select";
import { CFileField } from "./fields/file";
import { useState } from "react";
import { ConfirmationDialog, DialogType } from "../dialog";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayTitle: string;
  existingData?: any;
  countries: Array<any>;
  types: Array<ModalType>;
  handleSubmit: () => void;
  error: any;
  handleClose: () => void;
}

export const CModal = (props: ModalProps) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);

  const handleCloseModals = () => {
    setOpenConfirmationDialog(false);
    props.handleClose();
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={() => setOpenConfirmationDialog(true)}
        className="create-modal"
      >
        <Box sx={BoxStyle}>
          <AppBar className="create-appbar" position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {props.displayTitle}
              </Typography>
            </Toolbar>
          </AppBar>
          {props.error && (
            <Alert variant="filled" severity="error">
              {props.error.message}
            </Alert>
          )}
          <FormControl className="create-form" defaultValue="" required>
            {props.types.map((modalType: ModalType) => {
              const { type } = modalType;
              switch (type) {
                case FieldType.TextField: {
                  return <CTextField {...modalType}></CTextField>;
                }
                case FieldType.SelectField: {
                  return <CSelectField {...modalType}></CSelectField>;
                }
                case FieldType.FileField: {
                  return <CFileField {...modalType}></CFileField>;
                }
              }
            })}
            <Grid container spacing={2}>
              <Button
                onClick={() => props.handleSubmit()}
                variant="contained"
                className="form-button"
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                className="form-button"
                onClick={() => setOpenConfirmationDialog(true)}
              >
                Cancel
              </Button>
            </Grid>
          </FormControl>
        </Box>
      </Modal>
      <ConfirmationDialog
        title={`Close the ${props.displayTitle}?`}
        content="Are you sure you want to close the modal?"
        open={openConfirmationDialog}
        setOpen={setOpenConfirmationDialog}
        onClick={() => handleCloseModals()}
        buttonText="Confirm"
        type={DialogType.confirmation}
      ></ConfirmationDialog>
    </>
  );
};
