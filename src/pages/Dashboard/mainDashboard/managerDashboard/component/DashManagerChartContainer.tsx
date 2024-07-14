import { Card, Grid } from "@chakra-ui/react";
import BarChart from "../../../../../config/component/charts/BarChart";
import { observer } from "mobx-react-lite";
import store from "../../../../../store/store";
import { useEffect } from "react";
import { makeChartResponse } from "../../../component/utils/common";
import PieChart from "../../../../../config/component/charts/PieChart";

const DashChartContainer = observer(() => {
  const {
    Employe: { getManagersEmployesCount, managersEmployesCount },
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([
      fetchData(getManagersEmployesCount)
    ])
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [getManagersEmployesCount]);

  // const videosChartData = makeChartResponse(
  //   managersEmployesCount.data,
  //   "Videos Data",
  //   "title",
  //   "count",
  //   ["#FF5733", "#33FF57", "#3366FF", "#FF33A1", "#FFD700"]
  // );

  const coursesChartData = makeChartResponse(
    managersEmployesCount.data,
    "Member Counts",
    "title",
    "count",
    ["#FFB399", "#99FFCC", "#99CCFF", "#FF99CC", "#FFE680"]
  );

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={5}
      mb={5}
      mt={5}
    >
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <BarChart
          data={coursesChartData?.data}
          options={coursesChartData?.options}
          loading={managersEmployesCount.loading}
        />
      </Card>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <PieChart
          data={coursesChartData?.data}
          options={coursesChartData?.options}
          loading={managersEmployesCount.loading}
        />
      </Card>
    </Grid>
  );
});

export default DashChartContainer;
