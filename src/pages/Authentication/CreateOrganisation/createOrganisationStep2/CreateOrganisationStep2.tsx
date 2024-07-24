import {
  Box,
  Grid,
  Image,
  StepIcon,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import CustomStepper from "../../../../config/component/Stepper/Stepper";
import CreateOrganisationPersonalDetails from "./component/OrganisationCreateStepper";
import store from "../../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { authentication, main } from "../../../../config/constant/routes";
import { useEffect, useState } from "react";
import { readFileAsBase64 } from "../../../../config/constant/function";
import { observer } from "mobx-react-lite";

const CreateOrganisationStep2 = observer(({
  singleCompany,
  onClose,
  initialValues,
  isEdit,
}: any) => {
  const [initialValuesData, setInitialValuesData] =
    useState<any>(initialValues);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { token } = useParams();
  const {
    auth: { openNotification, createOrganisation, user },
    company: { createSingleCompany, getCompanies, updateSingleCompany },
  } = store;

  const steps = [
    {
      title: "Personal Details",
      description: "Contact Info",
      Icon: <StepIcon />,
    },
    { title: "Company Details", description: "Date & Time", Icon: <BiHome /> },
    { title: "Links", description: "Select Rooms", Icon: <StepIcon /> },
  ];

  useEffect(() => {
    if (singleCompany && user) {
      setInitialValuesData({
        ...initialValues,
        first_name: user.name,
        last_name: user.name,
        username: user.username,
        password: "Rahul@123",
      });
    }
  }, [user, singleCompany, initialValues]);

  const handleSubmit = async ({ values, setSubmitting }: any) => {
    if (isEdit) {
      setSubmitting(true)
      const { first_name, last_name, password, username, logo, ...rest } = values;
      updateSingleCompany({
        _id : initialValues._id,
        companyDetails: { ...rest },
      })
        .then((data: any) => {
          openNotification({
            title: "Create Success",
            message: data.message,
            type: "success",
          });
          if (onClose) {
            onClose();
            getCompanies({});
          }
        })
        .catch((error: any) => {
          openNotification({
            title: "Create Failed",
            message: error?.message,
            type: "error",
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      let logo: any = null;
      if (values.logo && values.logo?.length !== 0) {
        const buffer = await readFileAsBase64(values.logo);
        const fileData = {
          buffer: buffer,
          filename: values.logo?.name,
          type: values.logo?.type,
        };
        logo = fileData;
      }
      const { first_name, last_name, password, username, ...rest } = values;

      if (singleCompany) {
        createSingleCompany({
          companyDetails: { ...rest, logo },
        })
          .then((data: any) => {
            openNotification({
              title: "Create Success",
              message: data.message,
              type: "success",
            });
            if (onClose) {
              onClose();
              getCompanies({});
            }
          })
          .catch((error: any) => {
            openNotification({
              title: "Create Failed",
              message: error?.message,
              type: "error",
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      } else {
        createOrganisation({
          name: `${first_name} ${last_name}`,
          password,
          username,
          companyDetails: { ...rest, logo },
          token: token,
        })
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
      }
    }
  };

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    xl: "0.8fr 3fr",
  });

  const padding = useBreakpointValue({
    base: 2,
    md: 6,
  });

  const borderBottom = useColorModeValue(
    "1px solid lightgray",
    "1px solid gray"
  );

  return (
    <Box height={singleCompany ? "90vh" : "100vh"}>
      {singleCompany ? (
        <Box p={2} borderBottom={borderBottom} boxShadow={"xl"} width="100%">
          <Image
            src="https://themefisher.com/images/logo/logo.svg"
            alt=""
            cursor="pointer"
            mb={3}
            onClick={() => navigate(main.home)}
          />
        </Box>
      ) : null}
      <Grid
        gridTemplateColumns={gridTemplateColumns}
        p={padding}
        columnGap={4}
        height="100%"
      >
        <CustomStepper
          steps={steps}
          disabledIndexes={[]}
          setActiveStepIndex={setActiveStep}
          activeStepIndex={activeStep}
          orientation={useBreakpointValue({
            base: "horizontal",
            xl: "vertical",
          })}
          rest={{ p: 5, boxShadow: "lg", width: "100%", borderRadius: "lg" }}
        />
        <CreateOrganisationPersonalDetails
          steps={steps}
          initialValues={initialValuesData}
          handleSubmit={handleSubmit}
          activeIndex={activeStep}
          setActiveIndex={setActiveStep}
          singleCompany={singleCompany}
          isEdit={isEdit}
        />
      </Grid>
    </Box>
  );
});

export default CreateOrganisationStep2;
