import * as Yup from 'yup';

export const LeaveRequestValidation  = Yup.object().shape({
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End Date must be after Start Date')
    .required('End Date is required'),
  reason: Yup.string().required('Reason is required').trim(),
  workingLocation: Yup.array().min(1, 'Work Location is required'),
  managers: Yup.array().min(1, 'At least one Manager is required'),
});
