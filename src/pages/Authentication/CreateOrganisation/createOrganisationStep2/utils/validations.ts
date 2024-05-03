import * as Yup from "yup";

export const OrganisationCreateValidation = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First Name atleast of 2 characters")
    .max(60, "First Name cannot greater than 60 characters")
    .required("First Name is required"),
  last_name: Yup.string()
    .min(2, "Last Name atleast of 2 characters")
    .max(60, "Last Name cannot greater than 60 characters")
    .required("Last Name is required"),
  facebookLink: Yup.string().url("Please enter a valid facebook URL"),
  instagramLink: Yup.string().url("Please enter a valid instagram URL"),
  githubLink: Yup.string().url("Please enter a valid github URL"),
  linkedInLink: Yup.string().url("Please enter a valid linkedIn URL"),
  twitterLink: Yup.string().url("Please enter a valid twitter URL"),
  telegramLink: Yup.string().url("Please enter a valid telegram URL"),
  otherLinks: Yup.array().of(
    Yup.string().url("Invalid URL format").required("Other link is required")
  ),
  company_name: Yup.string()
    .min(2, "Organisation Name atleast of 2 characters")
    .max(60, "Organisation Name cannot greater than 250 characters")
    .required("Organisation is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number"
    ),
});
