import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, useBreakpointValue } from "@chakra-ui/react";
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

const ProfileIndex = observer(() => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('personal-details');
  const [userDetails, setUserDetails] = useState<any>(null);

  const {
    User: { getUsersDetailsById },
    auth: { user },
  } = store;

  useEffect(() => {
    const tab = getQueryParam("tab");
    if (typeof tab === 'string' || typeof tab === 'number') {
      setCurrentTab(tab.toString());
    }
  }, [getQueryParam]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getUsersDetailsById(user._id)
        .then((data) => {
          setUserDetails(data);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [getUsersDetailsById, user]);

  const tabMapping: string[] = [
    'personal-details',
    'company-details',
    'family-details',
    'work-experience',
    'skill-and-additional-info',
    'qualification',
    'documents',
    'bank-details',
  ];

  const currentTabIndex = tabMapping.indexOf(currentTab);

  const handleTabChange = (index: number) => {
    const selectedTab = tabMapping[index];
    setCurrentTab(selectedTab);
    setQueryParam("tab", selectedTab);
  };

  return (
    <Box p={4}>
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
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            overflowX="auto"
            overflow='hidden'
            display="flex"
            justifyContent={'space-around'}
            flexWrap="nowrap"
            p={3}
          >
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <CalendarIcon style={{marginRight:'10px'}}/> Personal Info
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaBuilding style={{marginRight:'10px'}}/> Company
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaUsers style={{marginRight:'10px'}}/> Family
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaUsers style={{marginRight:'10px'}}/> Work Experience
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaUsers style={{marginRight:'10px'}}/> Skill & Additional Info
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaUsers style={{marginRight:'10px'}}/> Qualification
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaUsers style={{marginRight:'10px'}}/> Documents
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'teal.500' }}
              px={4}
              py={2}
              borderRadius="md"
              fontWeight="bold"
              fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
            >
              <FaUsers style={{marginRight:'10px'}}/> Bank Account Details
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <PersonalInfo userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <CompanyDetails userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <FamilyDetails userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <WorkExperience userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <SkillAndAdditionalInfo userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <Qualification userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <Documents userDetails={userDetails} />
            </TabPanel>
            <TabPanel>
              <BankDetails userDetails={userDetails} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageLoader>
    </Box>
  );
});

export default ProfileIndex;
