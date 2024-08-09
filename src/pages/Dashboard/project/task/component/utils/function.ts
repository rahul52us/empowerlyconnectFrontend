import { formatDate, YYYYMMDD_FORMAT } from "../../../../../../config/constant/dateUtils";
import { activeStatus, taskPrioties, taskStatus } from "./constant";

export const generateSendTaskResponse = (values : any) => {
    return {
        ...values,
        priority: values?.priority
          ? values?.priority?.value
          : taskPrioties[1].value,
        isActive : values.isActive ? values?.isActive?.value : activeStatus[1],
        status: values?.status ? values?.status?.value : taskStatus[0].value,
        team_members: values.team_members.map((item : any) => ({user : item?.user?._id, isActive : item.isActive  || true})),
        assigner: values.assigner ? values.assigner?.user?._id : undefined,
        dependencies: values.dependencies.map((item : any) => ({user : item?.user?._id, isActive : item.isActive  || true})),
        reminders : [values.reminders],
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
}