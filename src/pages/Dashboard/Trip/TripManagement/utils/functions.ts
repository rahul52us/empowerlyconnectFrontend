import { YYYYMMDD_FORMAT, formatDate } from "../../../../../config/constant/dateUtils";
import { readFileAsBase64 } from "../../../../../config/constant/function";
import { categoryTypes,  travelModes, tripTypes } from "./constant";
import {
  AdditionalExpense,
  TravelDetails,
  TripFormValues,
} from "./interface";

export const generateTableData = (data : any[]) => {
  return data.map((item : any) => ({...item,...item}))
}

export const generateFormError = (errors: any, parent : any, type: string, index: number) => {
  if(errors?.[parent]?.[index]?.[type]){
    return errors?.[parent]?.[index]?.[type];
  }else{
    return undefined
  }
}

export const generateTripResponse = async (data: TripFormValues) => {
  if (Array.isArray(data?.thumbnail) && data.thumbnail?.length) {
    const buffer = await readFileAsBase64(data.thumbnail[0]);
    const fileData = {
      buffer: buffer,
      filename: data.thumbnail[0].name,
      type: data.thumbnail[0].type,
    };
    data.thumbnail = fileData;
  }
  const updatedTravelDetails = data.travelDetails.map(
    (item: TravelDetails) => ({
      ...item,
      travelMode: item?.travelMode?.value || "",
      startDate: item?.startDate ? formatDate(item?.startDate,YYYYMMDD_FORMAT) : "",
      endDate: item?.endDate ? formatDate(item?.endDate,YYYYMMDD_FORMAT) : "",
      isAccommodation:Boolean(item.isAccommodation),
      isCab:Boolean(item.isCab)
    })
  );
  const type = data.type ? data?.type?.value : tripTypes[0].value;
  const updatedParticipants = data.participants?.map(
    (item: any) => item.value || item._id
  ) || [];
  const updatedAdditionalExpense = data.additionalExpenses?.map(
    (item: AdditionalExpense) => ({
      ...item,
      type: item?.type?.value || "",
    })
  ) || [];
  const updatedData = {
    ...data,
    type: type,
    participants: type === tripTypes[0].value ? [] : updatedParticipants,
    travelDetails: updatedTravelDetails,
    additionalExpenses: updatedAdditionalExpense,
  };
  return updatedData;
};


export const generateEditInitialValues = (data : any) => {
  const updatedTravelDetails = data?.travelDetails?.map(
    (item: TravelDetails) => {
      let td : any = travelModes.filter((it : any) => it.value === item.travelMode)
      return({
      ...item,
      travelMode: item?.travelMode ? td.length ? td[0] : undefined :  undefined,
      startDate: item?.startDate ? new Date(item?.startDate) : new Date(),
      endDate: item?.endDate ? new Date(item?.endDate) : new Date(),
      isAccommodation:item.isAccommodation ? String(item.isAccommodation) : undefined,
      isCab:String(item.isCab)
    })
}) || [];


  const updatedAdditionalExpense = data?.additionalExpenses?.map(
    (item: AdditionalExpense) => {
      let dt = categoryTypes.filter((it : any) => it.value === item.type)
      return ({
      ...item,
      type: dt.length ? dt[0] : undefined,
    })
}) || [];

  const updatedData = {
    ...data,
    type: tripTypes.find((it : any) => it.value === data.type) || tripTypes[0],
    travelDetails: updatedTravelDetails,
    additionalExpenses: updatedAdditionalExpense,
    participants : data.participants || []
  };
  return updatedData;
}

