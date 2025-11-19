// lib/schema/login.ts
import * as yup from "yup";

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

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, minLengthErrorMessage)
    .max(20, maxLengthErrorMessage)
    .matches(/[A-Z]/, uppercaseErrorMessage)
    .matches(/[a-z]/, lowercaseErrorMessage)
    .matches(/[0-9]/, numberErrorMessage)
    .matches(/[!@#$%^&*]/, specialCharacterErrorMessage)
    .required("Password is required"),
});

// ✅ Infer TypeScript type from Yup schema
export type LoginSchema = yup.InferType<typeof loginSchema>;
