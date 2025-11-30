export const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const minLengthErrorMessage =
    "Password must be at least 8 characters long.";
export const maxLengthErrorMessage =
    "Password must be at most 20 characters long.";
export const uppercaseErrorMessage =
    "Password must contain at least one uppercase letter.";
export const lowercaseErrorMessage =
    "Password must contain at least one lowercase letter.";
export const numberErrorMessage =
    "Password must contain at least one number.";
export const specialCharacterErrorMessage =
    "Password must contain at least one special character (!@#$%^&*).";

export const ACCEPTED_REGEX = /^[a-zA-Z0-9\s.,!?'"-]+$/
