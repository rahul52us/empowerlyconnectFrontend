import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useQueryParams } from "../../../config/component/customHooks/useQuery";
import store from "../../../store/store";
import { useEffect, useState } from "react";
import PageLoader from "../../../config/component/Loader/PageLoader";

// Import your icon components
import { FaBuilding, FaUsers } from "react-icons/fa";
import { CalendarIcon } from "@chakra-ui/icons";
import PersonalInfo from "./component/PersonalInfo";
import CompanyDetails from "./component/CompanyDetails";
import FamilyDetails from "./component/FamilyDetails";
import WorkExperience from "./component/WorkExperience";
import SkillAndAdditionalInfo from "./component/SkillAndAdditionalInfo";
import Qualification from "./component/Qualification";
import BankDetails from "./component/BankDetails";
import Documents from "./component/Documents";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { dashProfileBreadCrumb } from "../utils/breadcrumb.constant";
import ProfileEditIndex from "./ProfileEditIndex";

const ProfileIndex = observer(() => {
  const [selectedTab, setSelectedTab] = useState({
    open: false,
    type: "profile-details",
  });
  const [haveApiCall, setHaveApiCall] = useState(false);

  const { getQueryParam, setQueryParam } = useQueryParams();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("personal-details");
  const [userDetails, setUserDetails] = useState<any>(null);
  const { colorMode } = useColorMode();

  const {
    User: { getUsersDetailsById },
    auth: { user },
  } = store;

  useEffect(() => {
    const tab = getQueryParam("tab");
    if (typeof tab === "string" || typeof tab === "number") {
      setCurrentTab(tab.toString());
    }
  }, [getQueryParam]);

  useEffect(() => {
    if (user && !haveApiCall) {
      setLoading(true);
      getUsersDetailsById(user._id)
        .then((data) => {
          setHaveApiCall(true);
          setUserDetails(data);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [getUsersDetailsById, user, haveApiCall]);

  const tabMapping: string[] = [
    "personal-details",
    "company-details",
    "family-details",
    "work-experience",
    "skill-and-additional-info",
    "qualification",
    "documents",
    "bank-details",
  ];

  const currentTabIndex = tabMapping.indexOf(currentTab);

  const handleTabChange = (index: number) => {
    const selectedTab = tabMapping[index];
    setCurrentTab(selectedTab);
    setQueryParam("tab", selectedTab);
  };

  const tabStyles = {
    _selected: { color: "white", bg: "teal.500" },
    px: 4,
    py: 2,
    borderRadius: "md",
    fontWeight: "bold",
    fontSize: useBreakpointValue({ base: "sm", md: "md" }),
  };

  console.log(userDetails);

  return (
    <>
      <Box p={3} pt={2}>
        <DashPageHeader
          title="Project"
          breadcrumb={dashProfileBreadCrumb.index}
        />{" "}
        <PageLoader loading={loading}>
          <Tabs
            variant="enclosed"
            isLazy
            index={currentTabIndex >= 0 ? currentTabIndex : 0}
            onChange={handleTabChange}
          >
            <TabList
              borderBottomWidth={2}
              borderColor="teal.300"
              mb={4}
              bg={colorMode === "dark" ? "gray.700" : "white"}
              borderRadius="md"
              boxShadow="lg"
              overflowX="auto"
              // overflow='hidden'
              display="flex"
              justifyContent={"space-between"}
              flexWrap="wrap"
              p={3}
            >
              <Tab {...tabStyles}>
                <CalendarIcon style={{ marginRight: "10px" }} /> Personal Info
              </Tab>
              <Tab {...tabStyles}>
                <FaBuilding style={{ marginRight: "10px" }} /> Company
              </Tab>
              <Tab {...tabStyles}>
                <FaUsers style={{ marginRight: "10px" }} /> Family
              </Tab>
              <Tab {...tabStyles}>
                <FaUsers style={{ marginRight: "10px" }} /> Work Experience
              </Tab>
              <Tab {...tabStyles}>
                <FaUsers style={{ marginRight: "10px" }} /> Skill & Additional
                Info
              </Tab>
              <Tab {...tabStyles}>
                <FaUsers style={{ marginRight: "10px" }} /> Qualification
              </Tab>
              <Tab {...tabStyles}>
                <FaUsers style={{ marginRight: "10px" }} /> Documents
              </Tab>
              <Tab {...tabStyles}>
                <FaUsers style={{ marginRight: "10px" }} /> Bank Account Details
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {userDetails?.profileDetails && (
                  <PersonalInfo
                    personalDetails={
                      userDetails?.profileDetails
                        ? userDetails?.profileDetails
                        : []
                    }
                    setSelectedTab={setSelectedTab}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <CompanyDetails userDetails={userDetails} />
              </TabPanel>
              <TabPanel>
                <FamilyDetails
                  relations={
                    userDetails?.familyDetails
                      ? userDetails?.familyDetails[0]?.relations
                      : []
                  }
                  setSelectedTab={setSelectedTab}
                />
              </TabPanel>
              <TabPanel>
                <WorkExperience
                  experienceDetails={
                    userDetails?.workExperience
                      ? userDetails?.workExperience[0]?.experienceDetails
                      : []
                  }
                  setSelectedTab={setSelectedTab}
                />
              </TabPanel>
              <TabPanel>
                <SkillAndAdditionalInfo userDetails={userDetails} />
              </TabPanel>
              <TabPanel>
                <Qualification
                  userDetails={userDetails}
                  setSelectedTab={setSelectedTab}
                />
              </TabPanel>
              <TabPanel>
                <Documents
                  userDetails={userDetails}
                  setSelectedTab={setSelectedTab}
                />
              </TabPanel>
              <TabPanel>
                <BankDetails
                  bankDetails={
                    userDetails?.bankDetails ? userDetails?.bankDetails[0] : {}
                  }
                  setSelectedTab={setSelectedTab}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PageLoader>
      </Box>
      <ProfileEditIndex
        setHaveApiCall={setHaveApiCall}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        userDetails={userDetails}
      />
    </>
  );
});

export default ProfileIndex;
