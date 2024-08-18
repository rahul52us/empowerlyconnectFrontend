import {
  convertToReadableIST,
  formatDate,
} from "../../../../config/constant/dateUtils";

function calculateWorkingHours(startTime: string, endTime: string) {
  // Parse the timestamps
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Ensure that both start and end are valid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return null;
  }

  // Calculate the difference in milliseconds
  const duration = end.getTime() - start.getTime();

  // Convert the duration into hours and minutes
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} hours ${minutes} minutes`;
}

export const generatePunchResponse = (data: any) => {
  return data.map((item: any) => {
    const date = formatDate(item.date);
    const punchInTimeReadable = convertToReadableIST(item.punchInTime);
    const punchOutTimeReadable = convertToReadableIST(item.punchOutTime);

    const workingHours = calculateWorkingHours(
      item.punchInTime,
      item.punchOutTime
    );

    return {
      ...item,
      date: date,
      punchInTime: punchInTimeReadable,
      punchOutTime: punchOutTimeReadable,
      workingHours: workingHours,
    };
  });
};
