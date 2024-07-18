import {
  formatDate,
  YYYYMMDD_FORMAT,
} from "../../../../../config/constant/dateUtils";
import { getIdFromObject } from "../../../../../config/constant/function";
import { ProjectPrioties, projectStatus } from "./constant";

export const generateProjectResponse = (values: any) => {
  return {
    priority: values?.priority
      ? values?.priority?.value
      : ProjectPrioties[1].value,
    status: values?.status ? values?.status?.value : projectStatus[0].value,
    followers: getIdFromObject(values?.followers),
    project_manager: getIdFromObject(values.project_manager),
    team_members: getIdFromObject(values.team_members),
    customers: getIdFromObject(values.customers),
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
