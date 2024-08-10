// import { manipulateDateWithMonth } from "../../../../../../config/constant/dateUtils";

// import { readFileAsBase64 } from "../../../../../../config/constant/function";
import { readFileAsBase64 } from "../../../../../../config/constant/function";
import { transformPermissionsForForm } from "./function";

export const defaultPermissions: any = {
  user: { add: false, edit: false, delete: false, view: false },
  trip: { add: false, edit: false, view: false, delete: false },
  course: { add: false, edit: false, view: false, delete: false },
  videos: { add: false, edit: false, view: false, delete: false },
  managers: { view: false },
  dashboard: { view: false },
};

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

export const eTypeOption = [
  { label: "User", value: "user" },
  {
    label: "Manager",
    value: "manager",
  },
  { label: "admin", value: "admin" },
  { label: "SuperAdmin", value: "superadmin" },

];

export const UserInitialValues = (type: string, data: any) => {
  if (type === "profile-details") {
    data = { ...data, ...data?.profileDetails[0] };
    let dt: any = {
      title:
        titles.find((item: any) => item.value === data?.title) || titles[0],
      firstName: data?.name?.split(" ")[0] || "",
      lastName: data?.name?.split(" ")[1] || "",
      code: data?.code || "",
      language: Array.isArray(data?.language)
        ? data?.language.map((item: any) => ({ label: item, value: item }))
        : [],
      username: data?.username || "",
      pic: data?.pic?.url ? {file : {...data?.pic}} : {file : []},
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
      weddingDate: data?.weddingDate ? new Date(data?.weddingDate) : undefined,
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
  } else if (type === "bank-details") {
    let bankDetail: any = {};
    if (data) {
      bankDetail = { ...data?.bankDetails[0] };
    }
    return {
      bankDetails: {
        cancelledCheque: bankDetail?.cancelledCheque || {},
        nameAsPerBank: bankDetail?.nameAsPerBank || "",
        name: bankDetail?.name || "",
        accountNo: bankDetail?.accountNo || "",
        ifsc: bankDetail?.ifsc || "",
        branch: bankDetail?.branch || "",
      },
    };
  } else if (type === "family-details") {
    let familyDetails = { ...data?.familyDetails[0] };
    return {
      familyDetails: {
        relations: familyDetails?.relations || [],
      },
    };
  } else if (type === "work-experience") {
    let workExperience: any = {
      experienceDetails: [
        {
          pastUserr: "",
          startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          endDate: new Date(),
          relevantExperience: "",
          designation: "",
          jobProfile: "",
          Lastctc: "",
          leavingReason: "",
          certificate: {
            file: null,
            isDeleted: 0,
            isAdd: 0,
          },
        },
      ],
    };
    if (data && data?.workExperience[0]?.experienceDetails) {
      workExperience = {
        experienceDetails: data.workExperience[0]?.experienceDetails?.map(
          (item: any) => ({
            ...item,
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
            certificate: item.certificate
              ? { file: [{ ...item.certificate, file: item.certificate?.url }] }
              : null,
          })
        ),
      };
    }
    return {
      workExperience: workExperience,
    };
  } else if (type === "documents") {
    let docs: any = {};
    let documents = { ...data?.documents[0] };
    if (documents.documents) {
      const documentFields = Object.keys(documents.documents);
      for (const fieldName of documentFields) {
        docs[fieldName] = {
          file: [
            {
              ...documents.documents[fieldName],
              file: documents.documents[fieldName].url,
            },
          ],
        };
      }
    }

    return {
      documents: Object.keys(docs).length
        ? docs
        : {
            class10: {
              file: null,
              isDeleted: 0,
              isAdd: 0,
              validTill: "",
              effectiveForm: "",
            },
            class12: {
              file: null,
              isDeleted: 0,
              isAdd: 0,
              validTill: "",
              effectiveForm: "",
            },
            games: {
              file: null,
              isDeleted: 0,
              isAdd: 0,
              validTill: "",
              effectiveForm: "",
            },
          },
    };
  } else if (type === "company-details") {
    let details: any = {};
    if (data) {
      details = data?.companyDetail?.length
        ? data.companyDetail[0].details?.length
          ? data.companyDetail[0].details[
              data.companyDetail[0].details?.length - 1
            ]
          : {}
        : {};
    }
    return {
      companyDetails: {
        department: undefined,
        designation: undefined,
        managers: undefined,
        workTiming: undefined,
        workingLocation: undefined,
        eType: eTypeOption[0],
        description: "",
        ...details,
        doj: details.doj ? new Date(details.doj) : new Date(),
        confirmationDate: details.confirmationDate
          ? new Date(details.confirmationDate)
          : new Date(),
      },
    };
  } else if (type === "permissions") {
    return {
      permissions: {
        permissions: data ? transformPermissionsForForm(data?.permissions || defaultPermissions) : defaultPermissions,
      },
    };
  } else {
    return { profileDetails: {} };
  }
};

export const generateSubmitResponse = async (datas: any) => {

  const data = { ...datas };

  let dt: any = { ...data };
  dt.name = `${dt.firstName} ${dt.lastName}`;
  dt.title = dt.title?.value;
  dt.language = dt.language?.map((item: any) => item.value);
  delete dt.firstName;
  delete dt.lastName;
  delete dt.confirmPassword;
  dt = {
    ...dt,
    dob: dt.dob,
    weddingDate: dt.weddingDate,
  };

  if (dt?.pic?.isEdited === false) {
    if (dt.pic?.file) {
      try {
        const fileBuffer = await readFileAsBase64(dt.pic.file);
        const fileData = {
          buffer: fileBuffer,
          filename: dt.pic.file.name,
          type: dt.pic.file.type,
          isDeleted: dt.pic.isDeleted || 0,
          isAdd: dt.pic.isAdd || 1,
        };

        dt.pic = fileData;
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  }
  else {
    if (dt.pic?.file) {
      try {
        const fileBuffer = await readFileAsBase64(dt.pic.file);
        const fileData = {
          buffer: fileBuffer,
          filename: dt.pic.file.name,
          type: dt.pic.file.type,
          isAdd: dt.pic.isAdd || 1,
          isDeleted : dt.pic.isDeleted
        };
        dt.pic = fileData;
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  }

  console.log(data.pic)
  return dt;

};




export const generateTableData = (data: any[]) => {
  return data.map((item: any) => ({
    ...item,
    ...item.profileDetails[0],
    ...item.userData,
  }));
};
