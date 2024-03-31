import moment from "moment";

export const employDropdownData : any = [
  {
    label: "BSE",
    options: [
      { label: "Rahul", value: "rahul" },
      { label: "kuldeep", value: "kuldeep" },
    ],
  },
  {
    label: "Gamers",
    options: [
      { label: "POKY", value: "poky" },
      { label: "hockey", value: "hockey" },
    ],
  },
]

export const employeInitialValues = (data: any) => {
  data = { ...data, ...data?.profileDetails[0] };
  let dt : any = {
    firstName: data?.name?.split(" ")[0] || "",
    lastName: data?.name?.split(" ")[1] || "",
    code: data?.code || "",
    position:Array.isArray(data?.position) ? data?.position.map((item : any) => ({label : item, value : item})) : [{label : 'software developer', value : 'software developer'}],
    language:Array.isArray(data?.language) ? data?.language.map((item : any) => ({label : item, value : item})) : [{label : 'english', value : 'english'}],
    username: data?.username || "",
    pic: data?.pic || "",
    // dob:new Date(data?.dob) || new Date(),
    personalEmail: data?.personalEmail || "",
    nickName:data?.nickName || "",
    healthCardNo: data?.healthCardNo || "",
    bloodGroup: data?.bloodGroup || "",
    panNo: data?.panNo || "",
    maritalStatus: data?.maritalStatus || "",
    aadharNo: data?.aadharNo || "",
    pfUanNo: data?.pfUanNo || "",
    insuranceCardNo: data?.insuranceCardNo || "",
    medicalCertificationDetails: data?.medicalCertificationDetails || "",
    refferedBy: data?.refferedBy || "",
    // weddingDate:data?.weddingDate || new Date(),
    mobileNo: data?.mobileNo || "",
    bio: data?.bio || "",
    password: "",
    confirmPassword: "",
    emergencyNo: data?.emergencyNo || "",
    addressInfo: data?.addressInfo?.length
      ? data?.addressInfo
      : [
          {
            address: "",
            country: "",
            state: "",
            city: "",
            pinCode: "",
          },
        ],
  };
  if (data) {
    delete dt.password;
    delete dt.confirmPassword;
  }
  return { profileDetails: dt };
};

export const generateSubmitResponse = (data: any) => {
  let dt: any = { ...data };
  dt.name = `${dt.firstName} ${dt.lastName}`;
  dt.position = dt.position?.map((item : any) => item.value)
  dt.language = dt.language?.map((item : any) => item.value)
  delete dt.firstName;
  delete dt.lastName;
  delete dt.confirmPassword;
  dt = {
    ...dt,
    dob: moment(dt.dob).format("YYYY-MM-DD"),
    weddingDate: moment(dt.weddingDate).format("YYYY-MM-DD"),
  };
  return dt;
};

export const generateTableData = (data : any[]) => {
  return data.map((item : any) => ({...item,...item.profileDetails[0],_id : item._id}))
}