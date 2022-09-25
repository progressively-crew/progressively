export const validateEmail = (email?: string): string | undefined => {
  if (!email) {
    return "The email field is required.";
  }

  if (!/^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i.test(email)) {
    return `The provided email address is not valid. It should look like "jane.doe@domain.com".`;
  }

  return undefined;
};
