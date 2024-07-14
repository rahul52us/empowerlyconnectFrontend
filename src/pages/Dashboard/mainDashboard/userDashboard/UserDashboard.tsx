import { Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import PunchAttendance from "../../PunchAttendence/PunchAttendence";
import DashWidgetCard from "../../component/DashWidgetCard";

const UserDashboard = observer(() => {
  return (
    <Grid gridTemplateColumns={{ base: "1fr", lg: "1fr" }} columnGap={4}>
      <DashWidgetCard />
      <Grid gridTemplateColumns={{ base: "1fr", lg: "1fr" }} columnGap={4}>
        <PunchAttendance />
      </Grid>
    </Grid>
  );
});

export default UserDashboard;