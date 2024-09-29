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

interface DialogProps {
  title: string;
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ConfirmationDialog = (props: DialogProps) => {
  return (
    <Dialog className="delete-dialog" open={props.open} maxWidth="sm" fullWidth>
      <AppBar className="delete-appbar" position="static">
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
        <Button onClick={() => props.setOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
