import { validateName } from "../../../validations/employee/NameValidator";
import { validateEmail } from "../../../validations/employee/EmailValidator";
import { validatePhone } from "../../../validations/employee/PhoneValidator";
import { EmployeeHooks } from "./hooks";
import { FieldType, ModalType } from "../../../common/modal/types";
import { CModal } from "../../../common/modal";
import { GENDER } from "./gender";

interface EmployeeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayTitle: string;
  cafes: Array<any>;
  data?: any;
  onSubmit: (
    name: string,
    email_address: string,
    phone_number: string,
    gender: string,
    cafe_id: string | null
  ) => void;
}

export const EmployeeModal = (props: EmployeeModalProps) => {
  const { data } = props;
  const handleClose = () => props.setOpen(false);
  const {
    gender,
    cafe,
    cafeSelectOpen,
    handleCafeChange,
    handleCafeSelect,
    genderSelectOpen,
    handleGenderChange,
    handleGenderSelect,
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    error,
    setError,
  } = EmployeeHooks({ data });

  const handleSubmit = () => {
    let errorMessage = validateName(name);
    if (errorMessage != null) {
      setError({ error: true, message: errorMessage });
      return;
    }

    errorMessage = validateEmail(email);
    if (errorMessage != null) {
      setError({ error: true, message: errorMessage });
      return;
    }

    errorMessage = validatePhone(phoneNumber);
    if (errorMessage != null) {
      setError({ error: true, message: errorMessage });
      return;
    }

    if (gender == null || gender == "") {
      setError({ error: true, message: "Gender cannot be empty" });
      return;
    }

    setError(null);
    props.onSubmit(name, email, phoneNumber, gender, cafe);
    handleClose();
  };

  const employeeTypes: Array<ModalType> = [
    {
      type: FieldType.TextField,
      placeholder: "Employee Name",
      label: "Name *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
    {
      type: FieldType.TextField,
      placeholder: "Employee Email Address",
      label: "Email *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
    },
    {
      type: FieldType.TextField,
      placeholder: "Employee Phone Number",
      label: "Phone Number *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: phoneNumber,
      onChange: (e) => setPhoneNumber(e.target.value),
      required: true,
    },
    {
      type: FieldType.SelectField,
      placeholder: "Gender",
      label: "Gender *",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: gender,
      required: true,
      selectField: {
        data: GENDER,
        open: genderSelectOpen,
        handleChange: handleGenderChange,
        handleSelect: handleGenderSelect,
        inputLabelText: "Select Employee Gender",
      },
    },
    {
      type: FieldType.SelectField,
      placeholder: "Cafe",
      label: "Cafe (optional)",
      gridLabelSize: 3,
      gridFieldSize: 7,
      value: cafe,
      required: false,
      selectField: {
        data: props.cafes,
        open: cafeSelectOpen,
        handleChange: handleCafeChange,
        handleSelect: handleCafeSelect,
        inputLabelText: "Select Employee Cafe",
      },
    },
  ];

  return (
    <CModal
      {...props}
      existingData={props.data}
      countries={props.cafes}
      types={employeeTypes}
      handleSubmit={handleSubmit}
      error={error}
      handleClose={handleClose}
    ></CModal>
  );
};
