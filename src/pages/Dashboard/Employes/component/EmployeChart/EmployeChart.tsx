import { Card, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import BarChart from "../../../../../config/component/charts/BarChart";
import LineGraph from "../../../../../config/component/charts/LineChart";
import { makeChartResponse } from "../../../component/utils/common";
import store from "../../../../../store/store";
import { useEffect } from "react";

const EmployeChart = observer(() => {
  const {
    Employe: { getDesignationCount, designationCount },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getDesignationCount()
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to Designation Count",
          message: err?.message,
        });
      });
  }, [getDesignationCount, openNotification]);

  const coursesChartData = makeChartResponse(
    designationCount.data,
    "Designation",
    "designation",
    "count",
    ["#FFB6C1", "#98FB98", "#87CEEB", "#FFDAB9", "#FFFACD"]
  );

  return (
    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={5} mt={5}>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <BarChart
          data={coursesChartData.data}
          options={coursesChartData.options}
          loading={designationCount.loading}
        />
      </Card>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <LineGraph
          data={coursesChartData.data}
          options={coursesChartData.options}
          loading={designationCount.loading}
        />
      </Card>
    </Grid>
  );
});

export default EmployeChart;
