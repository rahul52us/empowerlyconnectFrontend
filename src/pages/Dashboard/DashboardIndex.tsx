import DashboardBanner from "./component/DashboardBanner";
import DashWidgetCard from "./component/DashWidgetCard";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import DeleteModel from "../../config/component/common/DeleteModel/DeleteModel";
import { deleteCategoryFunction } from "./quiz/component/Forms/utils/function";
import DashChartContainer from "./component/DashChartContainer";
import DashPageHeader from "../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight, tablePageLimit } from "../../config/constant/variable";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { dashBreadCrumb } from "./utils/breadcrumb.constant";
import NormalTable from "../../config/component/Table/NormalTable/NormalTable";
import { users } from "./utils/constant";
import { useEffect } from "react";
import { generateManagerData } from "./utils/commonFunction";

const DashboardIndex = observer(() => {
  const {
    quiz: { setDeleteCategoryModal },
    Employe: { getAllManagerEmployes, managerEmployes },
    auth: { openNotification, user },
  } = store;

  useEffect(() => {
    if (user.role === "manager") {
      getAllManagerEmployes({ page: 1, limit: tablePageLimit, managerId : user._id })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            type: "error",
            title: "Failed to get users",
            message: err?.message,
          });
        });
    }
  }, [getAllManagerEmployes, openNotification, user]);


  return (
    <>
      <Box minHeight={`calc(100vh - ${headerHeight})`} m={-2} p={3}>
        <DashPageHeader title="Dashboard" breadcrumb={dashBreadCrumb} />
        <Grid templateColumns={{ base: "1fr", md: "1fr" }} columnGap={3}>
          <GridItem>
            <Box>
              <DashboardBanner />
            </Box>
            <DashWidgetCard />
            {/* <SkeletanCategoryCard/> */}
            <DashChartContainer />
          </GridItem>
          {/* <GridItem>
          <DashboardRight />
        </GridItem> */}
          {/* <MyCoursesTable /> */}
        </Grid>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap={4}>
          <NormalTable title="Team Members" data={generateManagerData(managerEmployes.data)} loading={managerEmployes.loading} />
          <NormalTable data={users} />
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
