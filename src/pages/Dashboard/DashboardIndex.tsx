import DashboardBanner from "./component/DashboardBanner";
import DashWidgetCard from "./component/DashWidgetCard";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import DeleteModel from "../../config/component/common/DeleteModel";
import { deleteCategoryFunction } from "./quiz/component/Forms/utils/function";
import DashChartContainer from "./component/DashChartContainer";
import DashPageHeader from "../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight } from "../../config/constant/variable";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { dashBreadCrumb } from "./utils/breadcrumb.constant";
// import DashboardRight from "./component/DashboardRight";
// import MyCoursesTable from "./component/MyCoursesTable";
// import SkeletanCategoryCard from "../../config/component/Card/CategoryCard/SkeletanCategoryCard";
// import { addDays } from "date-fns";

const DashboardIndex = observer(() => {
  // const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(addDays(new Date(), 1))
  const {
    quiz: { setDeleteCategoryModal },
  } = store;

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
        <DeleteModel
          id={store.quiz.openDeleteCategoryModal?.data?._id}
          open={store.quiz.openDeleteCategoryModal?.open}
          close={setDeleteCategoryModal}
          title={"Delete Category"}
          content={`Are you sure , you want to delete ${store.quiz.openDeleteCategoryModal?.data?.title} category`}
          submit={deleteCategoryFunction}
        />
      </Box>
      {/* <ProfileCard title="title" /> */}
    </>
  );
});

export default DashboardIndex;
