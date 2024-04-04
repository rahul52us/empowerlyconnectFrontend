export const employDropdownData: any = [
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
];

export const titles: any = [
  {
    label: "MR",
    value: "mr",
  },
  {
    label: "MRS",
    value: "mrs",
  },
];

export const employeInitialValues = (type : string , data: any) => {
  if(type === "profile-details")
  {
  data = { ...data, ...data?.profileDetails[0] };
  let dt: any = {
    title: titles.find((item: any) => item.value === data?.title) || titles[0],
    firstName: data?.name?.split(" ")[0] || "",
    lastName: data?.name?.split(" ")[1] || "",
    code: data?.code || "",
    designation: Array.isArray(data?.designation)
      ? data?.designation.map((item: any) => ({ label: item, value: item }))
      : [{ label: "software developer", value: "software developer" }],
    language: Array.isArray(data?.language)
      ? data?.language.map((item: any) => ({ label: item, value: item }))
      : [{ label: "english", value: "english" }],
    username: data?.username || "",
    pic: data?.pic || "",
    dob: data.dob ? new Date(data?.dob) : new Date(),
    personalEmail: data?.personalEmail || "",
    nickName: data?.nickName || "",
    healthCardNo: data?.healthCardNo || "",
    bloodGroup: data?.bloodGroup || "",
    panNo: data?.panNo || "",
    maritalStatus: data?.maritalStatus || "",
    aadharNo: data?.aadharNo || "",
    pfUanNo: data?.pfUanNo || "",
    insuranceCardNo: data?.insuranceCardNo || "",
    medicalCertificationDetails: data?.medicalCertificationDetails || "",
    refferedBy: data?.refferedBy || "",
    weddingDate: data?.weddingDate ? new Date(data?.weddingDate) : new Date(),
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
 }
 else if(type === "bank-details"){
  let bankDetail = { ...data?.bankDetails[0] };
  return {bankDetails : {
    cancelledCheque: bankDetail?.cancelledCheque || {},
    nameAsPerBank: bankDetail?.nameAsPerBank || "",
    name: bankDetail?.name || "",
    accountNo: bankDetail?.accountNo || "",
    ifsc: bankDetail?.ifsc || "",
    branch: bankDetail?.branch || "",
  }}
 }
 else
 {
  return {profileDetails : {}}
 }
};

export const generateSubmitResponse = (data: any) => {
  let dt: any = { ...data };
  dt.name = `${dt.firstName} ${dt.lastName}`;
  dt.title = dt.title?.value;
  dt.designation = dt.designation?.map((item: any) => item.value);
  dt.language = dt.language?.map((item: any) => item.value);
  delete dt.firstName;
  delete dt.lastName;
  delete dt.confirmPassword;
  dt = {
    ...dt,
    dob: dt.dob,
    weddingDate: dt.weddingDate,
  };
  return dt;
};

export const generateTableData = (data: any[]) => {
  return data.map((item: any) => ({
    ...item,
    ...item.profileDetails[0],
    _id: item._id,
  }));
};
