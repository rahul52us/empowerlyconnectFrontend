import { convertToReadableIST } from "../../../../config/constant/dateUtils";

export const generateResponse = (data: any) => {
  return data.map((item: any) => {
    const punchInTimeReadable = convertToReadableIST(item.punchInTime);
    const punchOutTimeReadable = convertToReadableIST(item.punchOutTime);
    return {
      ...item,
      punchInTime:punchInTimeReadable,
      punchOutTime:punchOutTimeReadable,
    };
  });
};
