import { Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashWidgetCard from "../../component/DashWidgetCard";
import PunchAttendance from "../../PunchAttendence/PunchAttendence";
import DashChartContainer from "../managerDashboard/component/DashManagerChartContainer";
import ManagerUsers from "../managerDashboard/component/ManagerUsers";

const AdminDashboard = observer(() => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr" }} columnGap={3}>
      <DashWidgetCard />
      <DashChartContainer />
      <Grid gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} columnGap={4}>
        <ManagerUsers />
        <PunchAttendance />
      </Grid>
    </Grid>
  );
});

export default AdminDashboard;
