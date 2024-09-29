export const validateName = (name: string | null): string | null => {
  if (name == null || name === "") {
    return "Name cannot be empty";
  }
  if (name.length < 6) {
    return "Name has to be alteast 6 characters of length";
  }
  if (name.length > 10) {
    return "Name cannot exceed 10 characters of length";
  }

  if (!/[A-Za-z ]+/.test(name)) {
    return "Name has to be only characters";
  }

  return null;
};
