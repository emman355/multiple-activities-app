// lib/schema/login.ts
import * as yup from "yup";
import { EMAIL_REGEX, lowercaseErrorMessage, maxLengthErrorMessage, minLengthErrorMessage, numberErrorMessage, specialCharacterErrorMessage, uppercaseErrorMessage } from "./constants";



export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(EMAIL_REGEX, "Invalid email format") // ✅ stricter check
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
