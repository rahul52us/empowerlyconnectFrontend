import { leavesTypes } from "./constant";
import { parseISO } from 'date-fns';


export const generateRequestInitialValues = (data : any) => {
    return {
        startDate: data?.startDate ? parseISO(data.startDate) : new Date(),
        endDate: data?.endDate ? parseISO(data.endDate) : new Date(),
        leaveType: data ? leavesTypes.filter((item : any) => item.value === data.leaveType) : [],
        sendTo: data ? data.sendTo.map((item : any) => ({label : item.username , value : item._id})) : [],
        reason: undefined,
        workingLocation:undefined,
        status: "Pending",
    }
}

export const leaveRequestInitialValues = {
    startDate: new Date(),
    endDate: new Date(),
    leaveType: undefined,
    sendTo: [],
    reason: undefined,
    workingLocation:undefined,
    status: "Pending",
};

export const generateResponse = (values : any) => {
    let dt : any = {...values}
    dt.sendTo = values.sendTo.map((item:any) => item.value)
    dt.workingLocation = values.workingLocation.value
    dt.leaveType = values.leaveType.value
    return dt
}