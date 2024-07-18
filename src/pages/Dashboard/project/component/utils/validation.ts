import * as Yup from "yup";

// Yup validation schema for Project
const ProjectCreateValidation = Yup.object().shape({
  project_name: Yup.string().trim().required("Project name is required."),
  subtitle: Yup.string().trim(),
  description: Yup.string()
    .trim()
    .min(2, "Description must have a minimum length of 2."),
  logo: Yup.string(),
  dueDate: Yup.date(),
  priority: Yup.mixed().required(),
  project_manager: Yup.array()
    .of(Yup.mixed())
    .nullable()
    .transform((val, originalVal) => {
      return originalVal === "" ? null : val;
    }),
  startDate: Yup.date().typeError('start date is required'),
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "End date must be greater than or equal to the start date."
  ),
  status: Yup.mixed().required('please select the status'),
  customers: Yup.array()
    .of(Yup.mixed())
    .nullable()
    .transform((val, originalVal) => {
      return originalVal === "" ? null : val;
    }).typeError('please select the customers'),
  followers: Yup.array()
    .of(Yup.mixed())
    .nullable()
    .transform((val, originalVal) => {
      return originalVal === "" ? null : val;
    }).typeError('please select the followers'),
  team_members: Yup.array()
    .of(Yup.mixed())
    .nullable()
    .transform((val, originalVal) => {
      return originalVal === "" ? null : val;
    }).typeError('please select the team members'),
  attach_files: Yup.array()
    .nullable().required('please select the files')
});

export { ProjectCreateValidation };
