import * as yup from "yup"
import { ACCEPTED_REGEX } from "@/lib/schema/constants"

export const driveLiteAddFormSchema = yup.object({
  title: yup.string()
    .required("Title name is required")
    .min(2, "Title must be at least 2 characters")
    .matches(ACCEPTED_REGEX, "Only letters, numbers, and basic punctuation are allowed"),
  description: yup.string()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters")
    .matches(ACCEPTED_REGEX, "Only letters, numbers, and basic punctuation are allowed"),
  photo: yup.mixed<File>()
    .nullable()
    .required("File is required")
    .when("$isEdit", {
      is: true,
      then: (s) => s.optional(),
      otherwise: (s) => s.required("File is required"),
    }),
}).required()

export type DriveLiteAddFormValues = yup.InferType<typeof driveLiteAddFormSchema>
