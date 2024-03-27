import { Box, Grid } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PersonalDetails from "../../forms/PersonalDetailsForm";
import PersonalDetailsChangePassword from "../../forms/PersonalDetailsChangePassword";

const EmployeContainer = observer(
  ({
    profileData,
    type,
    changePassword,
    handleSubmitProfile,
    initialValues,
    validations,
  }: any) => {
    // const LargerThanMd = useBreakpointValue({ xl: true });
    const location = useLocation();
    const tab: any = new URLSearchParams(location.search).get("tab");

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
        case "change-password":
          return (
            <PersonalDetailsChangePassword changePassword={changePassword} />
          );
        default:
          return <h1>Default Page</h1>;
      }
    };

    const getCreateActiveComponent = () => {
      switch (type) {
        case "create":
          return (
            <PersonalDetails
              type={type}
              profileData={profileData}
              handleSubmitProfile={handleSubmitProfile}
              initialValues={initialValues?.profileDetails}
              validations={validations}
            />
          );
        default:
          return <h1>Not found</h1>;
      }
    };

    return (
      <Box p={{ base: 1.5, lg: 0 }}>
        <Grid
          gridTemplateColumns={{ lg: "0.35fr 1fr" }}
          // style={{
          //   marginLeft: LargerThanMd ? "100px" : "0",
          //   marginRight: LargerThanMd ? "100px" : "2px",
          // }}
          gap={5}
          mt={3}
          mb={10}
        >
          <Box>
            <p>rahul kushwah</p>
            {/* <ProfileMainTabContainer
              profileData={profileData}
              type={type}
              sideTab={sideTab}
              editTabLink={editTabLink}
            /> */}
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