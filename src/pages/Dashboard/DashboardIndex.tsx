import DashboardBanner from "./component/DashboardBanner";
import DashWidgetCard from "./component/DashWidgetCard";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import DeleteModel from "../../config/component/common/DeleteModel/DeleteModel";
import { deleteCategoryFunction } from "./quiz/component/Forms/utils/function";
import DashChartContainer from "./component/DashChartContainer";
import DashPageHeader from "../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight } from "../../config/constant/variable";
import { Box, Grid, GridItem, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { dashBreadCrumb } from "./utils/breadcrumb.constant";
import ManagerEmployes from "./component/manager/ManagerEmployes";
import PunchAttendence from "./PunchAttendence/PunchAttendence";

const DashboardIndex = observer(() => {
  const {
    quiz: { setDeleteCategoryModal },
    auth: { checkPermission },
  } = store;

  return (
    <>
      <Box minHeight={`calc(100vh - ${headerHeight})`} m={-2} p={3}>
        <DashPageHeader title="Dashboard" breadcrumb={dashBreadCrumb} />
        <Grid templateColumns={{ base: "1fr", md: "1fr" }} columnGap={3}>
          <GridItem>
            <DashboardBanner />
          </GridItem>
          <GridItem>
            <DashWidgetCard />
          </GridItem>
          <GridItem>
            <DashChartContainer />
          </GridItem>
        </Grid>
        <Grid
          display={checkPermission("dashboard", "view") ? undefined : "none"}
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          columnGap={4}
        >
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Manager Employees
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ManagerEmployes />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Punch Attendance
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <PunchAttendence />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridItem>
        </Grid>
        <DeleteModel
          id={store.quiz.openDeleteCategoryModal?.data?._id}
          open={store.quiz.openDeleteCategoryModal?.open}
          close={setDeleteCategoryModal}
          title={"Delete Category"}
          submit={deleteCategoryFunction}
        >
          <Box>
            <Text>{`Are you sure , you want to delete ${store.quiz.openDeleteCategoryModal?.data?.title} category`}</Text>
          </Box>
        </DeleteModel>
      </Box>
      {/* <ProfileCard title="title" /> */}
    </>
  );
});

export default DashboardIndex;
