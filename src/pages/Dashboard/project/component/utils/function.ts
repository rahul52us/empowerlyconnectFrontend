import {
  formatDate,
  YYYYMMDD_FORMAT,
} from "../../../../../config/constant/dateUtils";
import { ProjectPrioties, projectStatus } from "./constant";

export const generateProjectInitialValues = (values : any) => {
  return {
    ...values,
   priority : ProjectPrioties.find((item : any) => item.value === values.priority)  || ProjectPrioties[0],
   status : projectStatus.find((item : any) => item.value === values.status)  || projectStatus[0],
   startDate : values.startDate ? new Date(values.startDate) : new Date(),
   endDate : values.endDate ? new Date(values.endDate) : new Date(),
   dueDate : values.dueDate ? new Date(values.dueDate) : new Date(),
   logo: values.logo?.url ? {file : values?.logo } : {file : []}
}}

export const generateProjectResponse = (values: any) => {
  return {
    priority: values?.priority
      ? values?.priority?.value
      : ProjectPrioties[1].value,
    status: values?.status ? values?.status?.value : projectStatus[0].value,
    followers: values?.followers.map((item : any) => ({user : item?.user?._id, isActive : item.isActive || true})),
    project_manager: values.project_manager.map((item : any) => ({user : item?.user?._id, isActive : item.isActive  || true})),
    team_members: values.team_members.map((item : any) => ({user : item?.user?._id, isActive : item.isActive  || true})),
    customers: values.customers.map((item : any) => ({user : item?.user?._id, isActive : item.isActive  || true})),
    startDate: values?.startDate
      ? formatDate(values?.startDate, YYYYMMDD_FORMAT)
      : new Date(),
    endDate: values?.endDate
      ? formatDate(values.endDate, YYYYMMDD_FORMAT)
      : new Date(),
    dueDate: values?.dueDate
      ? formatDate(values?.dueDate, YYYYMMDD_FORMAT)
      : new Date(),
  };
};
