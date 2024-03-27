import { Box, Center } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../../../utils/breadcrumb.constant";
import EmployeContainer from "./EmployeContainer";
import {
  employeInitialValues,
  generateSubmitResponse,
} from "../utils/constant";
import { employeCreateValidation, employeUpdateProfileValidation } from "../utils/validations";
import store from "../../../../../../store/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboard } from "../../../../../../config/constant/routes";
import Loader from "../../../../../../config/component/Loader/Loader";

const EmployeFormContainer = observer(() => {
  const navigate = useNavigate();
  const {
    Employe: { createEmploye,updateEmployeProfile, getEmployesDetailsById },
    auth: { openNotification },
  } = store;
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const type = useState<any>(
    location.pathname?.split("/")[4] === "edit" && id
  )[0];

  // this is for the submit the form to backend
  const handleSubmitProfile = (
    values: any,
    setLoading: any,
    resetForm: any,
    setErrors: any,
    setShowError: any
  ) => {
    if(type){
      updateEmployeProfile(id,{ ...generateSubmitResponse(values)})
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
      })
    }
    else
    {
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
  }, [type, location, id, openNotification, getEmployesDetailsById,navigate]);

  const commonProps = {
    handleSubmitProfile,
    initialValues: employeInitialValues(userData),
    validations: type ? employeUpdateProfileValidation : employeCreateValidation,
    type: type ? "edit" : "create",
    changePassword: () => alert("rahul"),
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
        <Center><Loader height={'70vh'}/></Center>
      )}
    </Box>
  );
});

export default EmployeFormContainer;
