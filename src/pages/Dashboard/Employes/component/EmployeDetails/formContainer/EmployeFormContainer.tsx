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

const EmployeFormContainer = observer(() => {
  const [haveApiCall, setHaveApiCall] = useState(false)
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
      updateWorkExperience
    },
    auth: { openNotification },
  } = store;
  const [userData, setUserData] = useState<any>(null);
  const { id } = useParams();
  const type = useState<any>(
    location.pathname?.split("/")[4] === "edit" && id
  )[0];

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

  const handleSubmitProfile = async (
    values: any,
    setLoading: any,
    resetForm: any,
    setErrors: any,
    setShowError: any
  ) => {
    if (type) {
      if (tab === "profile-details") {
        updateEmployeProfile(id, { ...generateSubmitResponse(values) })
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Profile Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false)
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Create",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (tab === "bank-details") {
        let bankDetails: any = values;
        if (files?.cancelledCheque?.file && (files?.cancelledCheque?.isAdd || files.cancelledCheque?.isDeleted)) {
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
        updateEmployeBankDetails(id, bankDetails)
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Bank Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false)
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
      else if(tab === "family-details"){
        updateFamilyDetails(id, values)
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Family Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false)
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update Family Details",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
      else if(tab === "work-experience"){
        let dt = await Promise.all(values.experienceDetails.map(async (item : any) => {
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
              certificate: fileData
            };
          }
          else if(item.certificate?.isDeleted){
            const fileData = {
              isFileDeleted: item.certificate.isDeleted
            };
            return {
              ...item,
              certificate: fileData
            };
          }
          else {
            if (item?.certificate && Array.isArray(item?.certificate?.file) && item?.certificate?.file?.length > 0) {
              return {...item,certificate : item?.certificate?.file[0]}
            }
            else {
              return item
            }
          }
        }));
        updateWorkExperience(id, {experienceDetails : dt})
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Work Experience Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false)
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Update Work Experience",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      if (tab === "profile-details") {
        createEmploye({ ...generateSubmitResponse(values) })
          .then(() => {
            resetForm();
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Create New Employe Successfully",
              title: "Create Successfully",
            });
            setHaveApiCall(false)
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Create",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (tab === "bank-details") {
        setLoading(false);
      }
      else if(tab === "work-experience"){
        console.log(values)
        setLoading(false)
        return
        updateWorkExperience(id, values)
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Create Work Experience Successfully",
              title: "Updated Successfully",
            });
            setHaveApiCall(false)
          })
          .catch((err) => {
            openNotification({
              type: "error",
              message: err?.message,
              title: "Failed to Create Work Experience",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    // check this, is it edit page or not
    if (type && !haveApiCall) {
      getEmployesDetailsById(id)
        .then((data: any) => {
          setUserData(data);
          setHaveApiCall(true)
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
  }, [type, location, id, openNotification, getEmployesDetailsById, navigate, haveApiCall]);

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
