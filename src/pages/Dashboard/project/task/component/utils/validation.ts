import * as Yup from "yup";

// Yup validation schema for Project
const TaskCreateValidation = Yup.object().shape({
  title: Yup.string().trim().required("Title is required."),
  subtitle: Yup.string().trim(),
  status: Yup.mixed().required('please select the status'),
  description: Yup.string()
    .trim()
    .min(2, "Description must have a minimum length of 2."),
  dueDate: Yup.date(),
  startDate: Yup.date().typeError('start date is required'),
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "End date must be greater than or equal to the start date."
  ),
  priority: Yup.mixed().required(),
  team_members: Yup.array()
    .of(Yup.mixed())
    .nullable()
    .transform((val, originalVal) => {
      return originalVal === "" ? null : val;
    }).typeError('please select the team members'),
});

export { TaskCreateValidation };
