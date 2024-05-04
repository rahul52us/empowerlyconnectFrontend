import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const addressValidation = Yup.object().shape({
    address: Yup.string()
      .min(3, "Address must be at least 3 characters")
      .max(120, "Address must not exceed 120 characters")
      .required("Address is required"),
    country: Yup.string().required("please select the country"),
    state: Yup.string().required("please select the state"),
    city: Yup.string().required("please select the city"),
    pinCode: Yup.string().required("please enter the pinCode"),
  });

export const OrganisationCreateValidation = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First Name atleast of 2 characters")
    .max(60, "First Name cannot greater than 60 characters")
    .required("First Name is required").trim(),
  last_name: Yup.string()
    .min(2, "Last Name atleast of 2 characters")
    .max(60, "Last Name cannot greater than 60 characters")
    .required("Last Name is required").trim(),
    username: Yup.string()
    .min(2, "user name atleast of 2 characters")
    .max(60, "user name cannot greater than 60 characters")
    .required("user name is required").trim(),
  mobileNo: Yup.string()
    .required("Mobile Number is Required")
    .matches(phoneRegExp, "Mobile Number is not valid"),
  workNo: Yup.string()
    .matches(phoneRegExp, "Work Number is not valid"),
    logo: Yup.mixed().required("Logo is required"),
    addressInfo: Yup.array()
    .min(1, "At least 1 address is required")
    .of(addressValidation),
  facebookLink: Yup.string().url("Please enter a valid facebook URL"),
  instagramLink: Yup.string().url("Please enter a valid instagram URL"),
  githubLink: Yup.string().url("Please enter a valid github URL"),
  linkedInLink: Yup.string().url("Please enter a valid linkedIn URL"),
  twitterLink: Yup.string().url("Please enter a valid twitter URL"),
  telegramLink: Yup.string().url("Please enter a valid telegram URL"),
  otherLinks: Yup.array().of(
    Yup.string().url("Invalid URL format").required("Other link is required")
  ),
  bio : Yup.string().min(5,'Bio atleast of 5 characters').trim().required(),
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
