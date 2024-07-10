import { convertToReadableIST, formatDate } from "../../../../config/constant/dateUtils";

export const generatePunchResponse = (data: any) => {
  return data.map((item: any) => {
    const date = formatDate(item.data)
    const punchInTimeReadable = convertToReadableIST(item.punchInTime);
    const punchOutTimeReadable = convertToReadableIST(item.punchOutTime);
    return {
      ...item,
      date:date,
      punchInTime:punchInTimeReadable,
      punchOutTime:punchOutTimeReadable,
    };
  });
};
