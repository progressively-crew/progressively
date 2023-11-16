export const validateUserFullname = (fullname: string) => {
  const errors: Partial<{ fullname: string }> = {};

  if (!fullname) {
    errors.fullname = "The fullname field is required, make sure to have one.";
  }

  return errors;
};
