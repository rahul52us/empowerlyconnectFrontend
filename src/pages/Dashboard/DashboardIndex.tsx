import DashboardBanner from "./component/DashboardBanner";
import DashWidgetCard from "./component/DashWidgetCard";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import DeleteModel from "../../config/component/common/DeleteModel/DeleteModel";
import { deleteCategoryFunction } from "./quiz/component/Forms/utils/function";
import DashChartContainer from "./component/DashChartContainer";
import DashPageHeader from "../../config/component/common/DashPageHeader/DashPageHeader";
import { headerHeight } from "../../config/constant/variable";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { dashBreadCrumb } from "./utils/breadcrumb.constant";
import NormalTable from "../../config/component/Table/NormalTable/NormalTable";
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

  const users : any = [
    { id: 1, name: "John", age: 30, country: "USA", email: "john@example.com" },
    { id: 2, name: "Jane", age: 25, country: "USA", email: "jane@example.com"},
    { id: 3, name: "Doe", age: 40, country: "USA", email: "doe@example.com"},
    { id: 4, name: "Doe", age: 40, country: "USA", email: "doe@example.com"},
    { id: 5, name: "Doe", age: 40, country: "USA", email: "doe@example.com"}
  ];

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
        <Grid templateColumns={{base : "1fr", md : "1fr 1fr"}} columnGap={4}>
        <NormalTable data={users}/>
        <NormalTable data={users}/>
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