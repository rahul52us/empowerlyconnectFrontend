import { Box, Grid, Image, StepIcon } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import CustomStepper from "../../../../config/component/Stepper/Stepper";
import CreateOrganisationPersonalDetails from "./component/OrganisationCreateStepper";
import { initialValues } from "./utils/constant";
import store from "../../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { authentication, main } from "../../../../config/constant/routes";
import { useState } from "react";
import { readFileAsBase64 } from "../../../../config/constant/function";

const CreateOrganisationStep2 = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { token } = useParams();
  const {
    auth: { openNotification, createOrganisation },
  } = store;

  const steps = [
    {
      title: "Personal Details",
      description: "Contact Info",
      Icon: <StepIcon />,
    },
    { title: "Company Details", description: "Date & Time", Icon: <BiHome /> },
    { title: "Links", description: "Select Rooms", Icon: <StepIcon /> }
  ];

  const handleSubmit = async ({ values, setSubmitting }: any) => {
    let logo : any = null
    if (values.logo && values.logo?.length !== 0) {
      const buffer = await readFileAsBase64(values.logo);
      const fileData = {
        buffer: buffer,
        filename: values.logo?.name,
        type: values.logo?.type,
      };
      logo = fileData;
    }
    const {first_name,last_name, password, username, ...rest} = values
    createOrganisation({ name : `${first_name} ${last_name}`, password, username , companyDetails : {...rest, logo }, token: token })
      .then((data) => {
        openNotification({
          title: "Create Success",
          message: data.message,
          type: "success",
        });
        navigate(authentication.login);
      })
      .catch((error) => {
        openNotification({
          title: "Create Failed",
          message: error?.message,
          type: "error",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box height="90vh">
      <Box
        p={2}
        borderBottom="1px solid lightgray"
        boxShadow={"xl"}
        width="100vw"
      >
        <Image
          src="https://themefisher.com/images/logo/logo.svg"
          alt=""
          cursor="pointer"
          mb={3}
          onClick={() => navigate(main.home)}
        />
      </Box>
      <Grid gridTemplateColumns={"0.8fr 3fr"} p={6} columnGap={4} height="100%">
        <CustomStepper
          steps={steps}
          disabledIndexes={[]}
          setActiveStepIndex={setActiveStep}
          activeStepIndex={activeStep}
          orientation="vertical"
          rest={{ p: 5, boxShadow: "lg", width: "100%", borderRadius: "lg" }}
        />
        <CreateOrganisationPersonalDetails
          steps={steps}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          activeIndex={activeStep}
          setActiveIndex={setActiveStep}
        />
      </Grid>
    </Box>
  );
};

export default CreateOrganisationStep2;
