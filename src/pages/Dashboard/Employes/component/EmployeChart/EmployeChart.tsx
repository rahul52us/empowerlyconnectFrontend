import { Card, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import BarChart from "../../../../../config/component/charts/BarChart";
import LineGraph from "../../../../../config/component/charts/LineChart";
import { makeChartResponse } from "../../../component/utils/common";

const EmployeChart = observer(() => {
  const coursesChartData = makeChartResponse(
    [],
    "Courses Data",
    "title",
    "total Category",
    ["#D13C1E", "#1FAB3D", "#1D4C9F", "#D62983", "#D0B200"]
);

  return (
    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={5} mt={5}>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <BarChart
          data={null}
          options={coursesChartData.options}
          loading={false}
        />
      </Card>
      <Card width={"100%"} minH={350} p={{ base: 0, sm: 2 }}>
        <LineGraph data={null} options={{}} loading={false} />
      </Card>
    </Grid>
  );
});

export default EmployeChart;