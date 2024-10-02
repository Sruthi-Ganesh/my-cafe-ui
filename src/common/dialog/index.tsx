import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import "./styles.scss";

export enum DialogType {
  error,
  confirmation,
}

interface DialogProps {
  title: string;
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClick: () => void;
  type: DialogType;
  buttonText: string;
}

export const ConfirmationDialog = (props: DialogProps) => {
  return (
    <Dialog
      className={
        props.type === DialogType.error ? "delete-dialog" : "confirm-dialog"
      }
      open={props.open}
      maxWidth="sm"
      fullWidth
    >
      <AppBar
        className={
          props.type === DialogType.error ? "delete-appbar" : "confirm-appbar"
        }
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Typography>{props.content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onClick()}
          color={props.type === DialogType.error ? "error" : "primary"}
          variant="contained"
        >
          {props.buttonText}
        </Button>
        <Button onClick={() => props.setOpen(false)} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
