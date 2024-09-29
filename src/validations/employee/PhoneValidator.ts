export const validatePhone = (phone: string | null): string | null => {
  if (phone == null || phone == "") {
    return "Phone number cannot be empty";
  }

  if (!phone.startsWith("+65")) {
    return "Phone number should start with Singapore country code +65";
  }

  if (!/^\+65(\s?)[89]\d{3}\1?\d{4}$/.test(phone)) {
    return "Please enter a valid singapore phone number";
  }

  return null;
};
