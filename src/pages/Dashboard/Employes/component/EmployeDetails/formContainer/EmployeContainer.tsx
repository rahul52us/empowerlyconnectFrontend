import { Box, Button, Grid } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PersonalDetails from "../../forms/PersonalDetailsForm";
import PersonalDetailsChangePassword from "../../forms/PersonalDetailsChangePassword";
import PersonalBankDetails from "../../forms/PersonalBankDetails";
import FamilyDetails from "../../forms/PersonalFamilyDetails";
import { dashboard } from "../../../../../../config/constant/routes";
import EmployFormSidebar from "../component/EmployFormSidebar";
import PersonalWorkExperience from "../../forms/PersonalWorkExperience";
import PersonalDocuments from "../../forms/PersonalDocuments";

const EmployeContainer = observer(
  ({
    profileData,
    type,
    changePassword,
    handleSubmitProfile,
    initialValues,
    validations,
    files,
    setFiles,
  }: any) => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const tab: any = new URLSearchParams(location.search).get("tab");

    console.log(files)
    const getEditActiveComponent = ({
      profileData,
      type,
      handleSubmitProfile,
    }: any) => {
      switch (tab) {
        case "profile-details":
          return (
            <PersonalDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.profileDetails}
              validations={validations}
            />
          );
        case "bank-details":
          return (
            <PersonalBankDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.bankDetails}
              validations={validations}
              files={files}
              setFiles={setFiles}
            />
          );
        case "family-details":
          return (
            <FamilyDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.familyDetails}
              validations={validations}
              files={files}
              setFiles={setFiles}
            />
          );
        case "change-password":
          return (
            <PersonalDetailsChangePassword changePassword={changePassword} />
          );
        case "work-experience":
          return (
            <PersonalWorkExperience
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.workExperience}
              validations={validations}
              files={files}
              setFiles={setFiles}
            />
          );
        case "documents":
            return (
              <PersonalDocuments
                type={type}
                profileData={profileData}
                handleSubmitProfile={handleSubmitProfile}
                initialValues={initialValues?.documents}
                validations={validations}
                files={files}
                setFiles={setFiles}
              />
        );
        default:
          return (
            <Button
              onClick={() =>
                navigate(
                  `${dashboard.employes.details}/edit/${id}?tab=profile-details`
                )
              }
            >
              Something went here
            </Button>
          );
      }
    };

    const getCreateActiveComponent = () => {
      switch (tab) {
        case "profile-details":
          return (
            <PersonalDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.profileDetails}
              validations={validations}
            />
          );
        case "bank-details":
          return (
            <PersonalBankDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.bankDetails}
              validations={validations}
              files={files}
              setFiles={setFiles}
            />
          );
        case "family-details":
          return (
            <FamilyDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.familyDetails}
              validations={validations}
              files={files}
              setFiles={setFiles}
            />
          );
        case "work-experience":
          return (
            <PersonalWorkExperience
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.workExperience}
              validations={validations}
              files={files}
              setFiles={setFiles}
            />
          );
        case "documents":
            return (
              <PersonalDocuments
                type={type}
                profileData={profileData}
                handleSubmitProfile={handleSubmitProfile}
                initialValues={initialValues?.documents}
                validations={validations}
                files={files}
                setFiles={setFiles}
              />
            );
        default:
          return (
            <Button
              onClick={() =>
                navigate(
                  `${dashboard.employes.details}/new?tab=profile-details`
                )
              }
            >
              Something went here
            </Button>
          );
      }
    };

    return (
      <Box p={{ base: 1.5, lg: 0 }}>
        <Grid
          gridTemplateColumns={{ lg: "0.25fr 1fr" }}
          gap={5}
          mt={3}
          mb={10}
        >
          <Box>
            <EmployFormSidebar />
          </Box>
          <Box border="1px solid #e9ecef" borderRadius={5}>
            {type === "edit"
              ? getEditActiveComponent({
                  profileData,
                  type,
                  changePassword,
                  handleSubmitProfile,
                })
              : getCreateActiveComponent()}
          </Box>
        </Grid>
      </Box>
    );
  }
);

export default EmployeContainer;
