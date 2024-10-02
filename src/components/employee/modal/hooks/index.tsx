import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { GENDER } from "../gender";

interface EmployeeHooksProps {
  data?: any;
}

export const EmployeeHooks = (props: EmployeeHooksProps) => {
  const { data } = props;
  const genderToSet: any = GENDER.find((g: any) =>
    data && g.label === data.gender ? g : null
  );

  const [gender, setGender] = useState<string>(
    genderToSet ? genderToSet.value : "M"
  );

  const [cafe, setCafe] = useState<string>(
    data && data.cafe ? data.cafe.id : ''
  );

  const [cafeSelectOpen, setCafeSelectOpen] = useState(false);

  const [genderSelectOpen, setGenderSelectOpen] = useState(false);

  const [name, setName] = useState<string>(data ? data.name : "");

  const [email, setEmail] = useState<string>(data ? data.email_address : "");

  const [phoneNumber, setPhoneNumber] = useState<string>(
    data ? data.phone_number : ""
  );

  const [error, setError] = useState<any>();

  const handleGenderChange = (event: SelectChangeEvent<typeof gender>) => {
    setGender(event.target.value);
  };

  const handleCafeChange = (event: SelectChangeEvent<typeof cafe>) => {
    setCafe(event.target.value);
  };

  const handleCafeSelect = (value: boolean) => {
    setCafeSelectOpen(value);
  };

  const handleGenderSelect = (value: boolean) => {
    setGenderSelectOpen(value);
  };

  return {
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
    setError
  };
};
