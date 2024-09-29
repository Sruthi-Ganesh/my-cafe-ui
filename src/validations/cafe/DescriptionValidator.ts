export const validateDescription = (description: string | null): string | null => {
    if (description == null || description === "") {
      return "Description cannot be empty";
    }
    if (description.length > 256) {
      return "Description cannot exceed 10 characters of length";
    }
  
    return null;
  };
  