import { Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import ManagerEmployes from "./component/ManagerEmployes";
import PunchAttendance from "../../PunchAttendence/PunchAttendence";
import ManagerDashWidget from "./component/ManagerDashWidget";

const ManagerDashboard = observer(() => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr" }} columnGap={3}>
      <ManagerDashWidget />
      <Grid gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} columnGap={4}>
        <ManagerEmployes />
        <PunchAttendance />
      </Grid>
    </Grid>
  );
});

export default ManagerDashboard;