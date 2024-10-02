import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface CafeHooksProps {
  locationValue?: string;
  countries: Array<any>;
  nameValue?: string;
  descriptionValue?: string;
}

export const CafeHooks = (props: CafeHooksProps) => {
  const { locationValue, countries, nameValue, descriptionValue } = props;

  const countryToSet: any = countries.find((g: any) =>
    locationValue === g.label ? g : null
  );

  const [location, setLocation] = useState<string>(countryToSet ? countryToSet.value : 'SG');

  const [file, setFile] = useState<File | null>();

  const [locationSelectOpen, setLocationSelectOpen] = useState(false);

  const [name, setName] = useState<string>(nameValue ? nameValue : "");

  const [description, setDescription] = useState<string>(
    descriptionValue ? descriptionValue : ""
  );

  const [error, setError] = useState<any>();

  const handleLocationChange = (event: SelectChangeEvent<typeof location>) => {
    setLocation(event.target.value);
  };

  const handleLocationSelect = (value: boolean) => {
    setLocationSelectOpen(value);
  };

  return {
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
  };
};
