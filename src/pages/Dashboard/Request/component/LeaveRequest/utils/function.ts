export const generateResponse = (values : any) => {
    let dt : any = {...values}
    dt.sendTo = values.sendTo.map((item:any) => item.value)
    dt.workingLocation = values.workingLocation.value
    dt.leaveType = values.leaveType.value
    return dt
}