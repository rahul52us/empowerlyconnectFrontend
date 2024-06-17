import { Box, Center } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../../../utils/breadcrumb.constant";
import EmployeContainer from "./EmployeContainer";
import {
  employeInitialValues,
  generateSubmitResponse,
} from "../utils/constant";
import { getValidation } from "../utils/validations";
import store from "../../../../../../store/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboard } from "../../../../../../config/constant/routes";
import Loader from "../../../../../../config/component/Loader/Loader";
import { readFileAsBase64 } from "../../../../../../config/constant/function";
import { getStatusType } from "../../../../../../config/constant/statusCode";

const EmployeFormContainer = observer(() => {
  const {auth : {user}} = store
  const [haveApiCall, setHaveApiCall] = useState(false);
  const [files, setFiles] = useState<any>({
    cancelledCheque: {
      file: null,
      isDeleted: 0,
      isAdd: 0,
    },
  });

  const location = useLocation();
  const tab: any = new URLSearchParams(location.search).get("tab");
  const navigate = useNavigate();
  const {
    Employe: {
      createEmploye,
      updateEmployeProfile,
      getEmployesDetailsById,
      updateEmployeBankDetails,
      updateFamilyDetails,
      updateWorkExperience,
      updateDocuments,
      updateCompanyDetails,
      updatePermissions
    },
    auth: { openNotification },
  } = store;
  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null)
  const { id } = useParams();
  const [type,setType] = useState<any>(
    location.pathname?.split("/")[4] === "edit" && id
  );

  useEffect(() => {
    setType(location.pathname?.split("/")[4] === "edit" && id);
  }, [location.pathname, id,setType]);

  useEffect(() => {
    if (id) {
      setUserId(id);
    }
  }, [id]);

  useEffect(() => {
    if (
      userData &&
      userData?.bankDetails &&
      userData?.bankDetails[0] &&
      userData?.bankDetails[0]?.cancelledCheque?.name
    ) {
      setFiles((files: any) => ({
        ...files,
        cancelledCheque: {
          isDeleted: 0,
          file: [
            {
              ...userData?.bankDetails[0].cancelledCheque,
              file: userData?.bankDetails[0].cancelledCheque?.url,
            },
          ],
        },
      }));
    }
  }, [userData]);

  const navigateUser = (id : any) => {
    navigate(
      `${dashboard.employes.details}/edit/${id}?tab=company-details`
    )
  }
  const handleSubmitProfile = async ({
    values,
    setSubmitting,
    setErrors,
    setShowError
  } : any) => {
    if (type) {
      if (tab === "profile-details") {
        updateEmployeProfile(userId, { ...generateSubmitResponse(values), company : user?.companyDetail?.company })
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Profile Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false);
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Create",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
      else if(tab === "company-details"){
        let data : any = {}

        console.log('the values are', values)

        data['workTiming'] = values.workTiming.map((item : any) => item.value)
        data['workingLocation'] = values.workingLocation.map((item : any) => item.value)
        data['managers'] = values.managers.map((item : any) => item.value)
        data['eType'] = values.eType?.value
        data['department'] = values.department?.value
        data['designation'] = values.designation?.value
        updateCompanyDetails(userId, {details : {...values, ...data}})
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Company Details Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false);
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
      else if (tab === "bank-details") {
        let bankDetails: any = values;
        if (
          files?.cancelledCheque?.file &&
          (files?.cancelledCheque?.isAdd || files.cancelledCheque?.isDeleted)
        ) {
          const buffer = await readFileAsBase64(files.cancelledCheque.file[0]);
          const fileData = {
            buffer: buffer,
            filename: files.cancelledCheque.file[0].name,
            type: files.cancelledCheque.file[0].type,
            isFileDeleted: files.cancelledCheque.isDeleted,
            isAdd: files.cancelledCheque.isAdd,
          };
          bankDetails = {
            ...bankDetails,
            cancelledCheque: fileData,
          };
        } else {
          bankDetails = {
            ...bankDetails,
            cancelledCheque: {
              isFileDeleted: files.cancelledCheque.isDeleted,
              isAdd: 0,
            },
          };
        }
        updateEmployeBankDetails(userId, bankDetails)
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Bank Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false);
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      } else if (tab === "family-details") {
        updateFamilyDetails(userId, values)
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Family Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false);
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update Family Details",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      } else if (tab === "work-experience") {
        let dt = await Promise.all(
          values.experienceDetails.map(async (item: any) => {
            if (item?.certificate?.isAdd && item?.certificate?.file) {
              const buffer = await readFileAsBase64(item?.certificate?.file[0]);
              const fileData = {
                buffer: buffer,
                filename: item.certificate.file[0].name,
                type: item.certificate.file[0].type,
                isFileDeleted: item.certificate.isDeleted,
                isAdd: item.certificate.isAdd,
              };
              return {
                ...item,
                certificate: fileData,
              };
            } else if (item.certificate?.isDeleted) {
              const fileData = {
                isFileDeleted: item.certificate.isDeleted,
              };
              return {
                ...item,
                certificate: fileData,
              };
            } else {
              if (
                item?.certificate &&
                Array.isArray(item?.certificate?.file) &&
                item?.certificate?.file?.length > 0
              ) {
                return { ...item, certificate: item?.certificate?.file[0] };
              } else {
                return item;
              }
            }
          })
        );
        updateWorkExperience(userId, { experienceDetails: dt })
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Work Experience Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false);
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update Work Experience",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      } else if (tab === "documents") {
        let dt = await Promise.all(
          Object.entries(values).map(async ([key, item]: any) => {
            if (item?.isAdd && item?.file) {
              const buffer = await readFileAsBase64(item?.file[0]);
              const fileData = {
                buffer: buffer,
                filename: item.file[0].name,
                type: item.file[0].type,
                isFileDeleted: item.isDeleted,
                isAdd: item.isAdd,
              };
              return [key, fileData];
            } else {
              if(Array.isArray(item.file) && item?.file?.length){
                return [key, item.file[0]];
              }
              return [key, item];
            }
          })
        );
        dt = Object.fromEntries(dt);
        updateDocuments(userId, { documents: dt })
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Documents Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false);
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update Documents",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
      else if(tab === "permissions"){
        updatePermissions(userId, values)
        .then(() => {
          setShowError(false);
          setErrors({});
          openNotification({
            type: "success",
            message: "Update Permissions Successfully",
            title: "Updated Successfully",
          });
          setHaveApiCall(false);
        })
        .catch((err) => {
          openNotification({
            type: "error",
            message: err?.message,
            title: "Failed to Update Permissions Details",
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
      }
    } else {
      if (tab === "profile-details") {
        createEmploye({ ...generateSubmitResponse(values),company : user?.companyDetail?.company })
          .then((data : any) => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Create New Employe Successfully",
              title: "Create Successfully",
            });
            setHaveApiCall(false);
            navigateUser(data?.data?._id)
          })
          .catch((err) => {
            openNotification({
              title: "Create Failed",
              message: err?.data?.message,
              type: getStatusType(err.status),
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    else{
      openNotification({
        title: `${tab} Tab Inaccessible`,
        message: 'This tab is accessible only after completing the profile details.',
        type: 'info',
      });
      setSubmitting(false);
    }
    }
  };

  useEffect(() => {
    // check this, is it edit page or not
    if (type && !haveApiCall) {
      getEmployesDetailsById(id)
        .then((data: any) => {
          setUserData(data);
          setHaveApiCall(true);
        })
        .catch((err: any) => {
          openNotification({
            type: "error",
            message: err?.message,
            title: "Failed to Get Details",
          });
          setTimeout(() => {
            navigate(dashboard.employes.details);
          }, 2000);
        });
    }
  }, [
    type,
    location,
    id,
    openNotification,
    getEmployesDetailsById,
    navigate,
    haveApiCall,
  ]);

  const commonProps = {
    handleSubmitProfile,
    initialValues: employeInitialValues(tab, userData),
    validations: getValidation(tab, type ? "edit" : "create"),
    type: type ? "edit" : "create",
    changePassword: () => alert("rahul"),
    files: files,
    setFiles: setFiles,
  };

  const isDataLoaded = type && userData;

  return (
    <Box>
      <DashPageHeader
        title="Employes > New"
        breadcrumb={employesBreadCrumb.new}
      />
      {isDataLoaded ? (
        <EmployeContainer {...commonProps} />
      ) : type === false ? (
        <EmployeContainer {...commonProps} />
      ) : (
        <Center>
          <Loader height={"70vh"} />
        </Center>
      )}
    </Box>
  );
});

export default EmployeFormContainer;
