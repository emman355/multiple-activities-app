import * as yup from 'yup';
import {
  EMAIL_REGEX,
  lowercaseErrorMessage,
  maxLengthErrorMessage,
  minLengthErrorMessage,
  numberErrorMessage,
  specialCharacterErrorMessage,
  uppercaseErrorMessage,
} from './constants';

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .matches(EMAIL_REGEX, 'Invalid email format') // ✅ stricter check
    .required('Email is required'),

  password: yup
    .string()
    .min(8, minLengthErrorMessage)
    .max(20, maxLengthErrorMessage)
    .matches(/[A-Z]/, uppercaseErrorMessage)
    .matches(/[a-z]/, lowercaseErrorMessage)
    .matches(/[0-9]/, numberErrorMessage)
    .matches(/[!@#$%^&*]/, specialCharacterErrorMessage)
    .required('Password is required'),
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .matches(/^[A-Za-z]+$/, 'First name cannot contain numbers or special characters')
    .required('First name is required'),

  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .matches(/^[A-Za-z]+$/, 'Last name cannot contain numbers or special characters')
    .required('Last name is required'),
});

// ✅ Infer TypeScript type from Yup schema
export type SignUpSchema = yup.InferType<typeof signUpSchema>;
