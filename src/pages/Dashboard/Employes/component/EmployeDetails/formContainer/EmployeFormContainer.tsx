import { Box, Center } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../../../utils/breadcrumb.constant";
import EmployeContainer from "./EmployeContainer";
import {
  employeInitialValues,
  generateSubmitResponse,
} from "../utils/constant";
import {
  getValidation,
} from "../utils/validations";
import store from "../../../../../../store/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboard } from "../../../../../../config/constant/routes";
import Loader from "../../../../../../config/component/Loader/Loader";
import { readFileAsBase64 } from "../../../../../../config/constant/function";

const EmployeFormContainer = observer(() => {
  const [files,setFiles] = useState<any>({
    cancelledCheque : null
  })

  const location = useLocation();
  const tab: any = new URLSearchParams(location.search).get("tab");
  const navigate = useNavigate();
  const {
    Employe: { createEmploye, updateEmployeProfile, getEmployesDetailsById,updateEmployeBankDetails },
    auth: { openNotification },
  } = store;
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const type = useState<any>(
    location.pathname?.split("/")[4] === "edit" && id
  )[0];

  // this is for the submit the form to backend
  const handleSubmitProfile = async(
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
      }
      else if(tab === "bank-details"){
        let bankDetails : any = values
        if (files?.cancelledCheque) {
          const buffer = await readFileAsBase64(files.cancelledCheque[0]);
          const fileData = {
            buffer: buffer,
            filename: files.cancelledCheque[0].name,
            type: files.cancelledCheque[0].type,
          };
          bankDetails = {...bankDetails,cancelledCheque:fileData}
        }
        updateEmployeBankDetails(id,bankDetails)
          .then(() => {
            setShowError(false);
            setErrors({});
            openNotification({
              type: "success",
              message: "Update Bank Successfully",
              title: "Updated Successfully",
            });
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
      }
      else if(tab === "bank-details"){
        alert("rahlu")
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    // check this, is it edit page or not
    if (type) {
      getEmployesDetailsById(id)
        .then((data: any) => {
          setUserData(data);
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
  }, [type, location, id, openNotification, getEmployesDetailsById, navigate]);

  const commonProps = {
    handleSubmitProfile,
    initialValues: employeInitialValues(tab, userData),
    validations: getValidation(tab,type ? 'edit' : 'create'),
    type: type ? "edit" : "create",
    changePassword: () => alert("rahul"),
    files : files,
    setFiles : setFiles
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
