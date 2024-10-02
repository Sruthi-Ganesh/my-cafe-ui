import Grid from "@mui/material/Grid2";
import { UploadFileFieldType } from "../types";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

interface FileFieldProps {
  label: string;
  gridLabelSize: number;
  gridFieldSize: number;
  required: boolean;
  value?: string;
  fileField?: UploadFileFieldType;
}

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

export const CFileField = (props: FileFieldProps) => {
  const { label, gridFieldSize, gridLabelSize, required, value, fileField } =
    props;

  if (!fileField) {
    console.error("File field not set but the type is set");
    return;
  }
  const { fileExists, fileName, buttonName, setFile } = fileField;
  return (
    <Grid key={label} container spacing={5}>
      <Grid size={3}>
        <div className="label">Upload Logo (optional) </div>
      </Grid>
      <Grid size={7}>
        {fileExists ? (
          <Button
            variant="outlined"
            onClick={() => setFile(null)}
            endIcon={<CloseIcon />}
          >
            {fileName}
          </Button>
        ) : (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {buttonName}
            <VisuallyHiddenInput
              type="file"
              onChange={(event: any) =>
                event.target.files && setFile(event.target.files[0])
              }
            />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
