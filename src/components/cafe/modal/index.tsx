import { validateName } from "../../../validations/cafe/NameValidator";
import { validateDescription } from "../../../validations/cafe/DescriptionValidator";
import { validateFile } from "../../../validations/cafe/FileValidator";
import { CafeHooks } from "./hooks";
import { FieldType, ModalType } from "../../../common/modal/types";
import { CModal } from "../../../common/modal";

interface CafeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayTitle: string;
  countries: Array<any>;
  data?: any;
  onSubmit: (
    name: string,
    description: string,
    location: string,
    file: File | null | undefined
  ) => void;
}

export const CafeModal = (props: CafeModalProps) => {
  const { data } = props;
  const {
    location,
    setLocation,
    handleLocationChange,
    locationSelectOpen,
    handleLocationSelect,
    file,
    setFile,
    name,
    setName,
    description,
    setDescription,
    error,
    setError,
  } = CafeHooks({
    locationValue: data ? data.location : "",
    countries: props.countries,
    nameValue: data ? data.name : "",
    descriptionValue: data ? data.description : "",
  });

  const handleClose = () => props.setOpen(false);

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
    props.onSubmit(name, description, location, file);
    handleClose();
  };

  let cafeTypes: Array<ModalType> = [
    {
      type: FieldType.TextField,
      placeholder: "Cafe Name",
      label: "Name *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
    {
      type: FieldType.TextField,
      placeholder: "Cafe Description",
      label: "Description *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: description,
      onChange: (e) => setDescription(e.target.value),
      required: true,
    },
    {
      type: FieldType.SelectField,
      placeholder: "Cafe Location",
      label: "Location *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: location,
      required: true,
      selectField: {
        data: props.countries,
        open: locationSelectOpen,
        handleChange: handleLocationChange,
        handleSelect: handleLocationSelect,
        inputLabelText: "Select Cafe Location",
      },
    },
    {
      type: FieldType.FileField,
      label: "Upload Logo (optional)",
      gridLabelSize: 3,
      gridFieldSize: 7,
      required: true,
      fileField: {
        fileExists: !!file,
        fileName: file ? file.name : "unknown",
        buttonName: "Upload Logo",
        setFile,
      },
    },
  ];

  return (
    <CModal
      {...props}
      existingData={props.data}
      countries={props.countries}
      types={cafeTypes}
      handleSubmit={handleSubmit}
      error={error}
      handleClose={handleClose}
    ></CModal>
  );
};
