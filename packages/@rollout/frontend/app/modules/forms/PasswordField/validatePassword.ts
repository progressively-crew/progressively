export const validatePassword = (password?: string): string | undefined => {
  if (!password) {
    return "The password field is required.";
  }

  if (password.length < 8) {
    return "The provided password is too short. It should be at least 8 characters.";
  }

  return undefined;
};

export const validateConfirmationPassword = (
  password?: string
): string | undefined => {
  if (!password) {
    return "The confirmation password field is required.";
  }

  if (password.length < 8) {
    return "The provided confirmation password is too short. It should be at least 8 characters.";
  }

  return undefined;
};
