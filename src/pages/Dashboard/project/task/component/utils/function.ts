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
        team_members: values.team_members.map((item : any) => ({user : item?.value, isActive : item.isActive  || true})),
        assigner: values.assigner ? values.assigner?.value : undefined,
        dependencies: values.dependencies.map((item : any) => ({user : item?.value, isActive : item.isActive  || true})),
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

export const generateInitialValues = (data? : any) => {
  if(!data){
    data = {}
  }
  return {
    ...data,
    assigner : data.assigner ? Array.isArray(data.assigner) ? data.assigner?.length > 0 ? data.assigner.map((it : any) => ({label : it.username, value : it._id}))[0] : undefined : undefined : undefined,
    team_members: data.team_members ? data.team_members.map((it : any) => ({label : it.user?.username, value : it.user?._id})) : [],
    dependencies: data.dependencies ? data.dependencies.map((it : any) => ({label : it.user?.username, value : it.user?._id})) : [],
    title: data?.title || "",
    description: data?.description || "",
    isActive: data ? activeStatus.find((it : any) => it.value === data.isActive) || activeStatus[0] : activeStatus[0],
    startDate: new Date(),
    endDate: new Date(),
    dueDate: new Date(),
    priority: data ? taskPrioties.find((it : any) => it.value === data.priority) || taskPrioties[0] : taskPrioties[0],
    reminders : new Date(),
    // followers: [],
    // dependencies:[],
    // team_members: [],
    // customers: [],
    // assigner:undefined,
    // project_manager: [],
    status: data ? taskStatus.find((it : any) => it.value === data.status) || taskStatus[0] : taskStatus[0],
    attach_files : []
  }
}