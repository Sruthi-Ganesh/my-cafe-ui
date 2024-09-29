export const validateFile = (file: File | null | undefined): string | null => {
  if (file == null || file == undefined) {
    return null;
  }

  if (!isValidFileUploaded(file)) {
    return "Only png, jpeg and jpg formats are allowed for file uploads";
  }
  let size = Number((file.size / (1024 * 1024)).toFixed(2));
  console.log(size);
  if (size > 2) {
    return "File size should not be greater than 2 MB";
  }

  return null;
};

const isValidFileUploaded = (file: File) => {
  const validExtensions = ["png", "jpeg", "jpg"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};
