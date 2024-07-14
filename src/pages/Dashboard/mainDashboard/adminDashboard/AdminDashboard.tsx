import { Grid, GridItem } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashWidgetCard from "../../component/DashWidgetCard";
import PunchAttendance from "../../PunchAttendence/PunchAttendence";

const AdminDashboard = observer(() => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr" }} columnGap={3}>
      <GridItem>
        <DashWidgetCard />
        <PunchAttendance />
      </GridItem>
    </Grid>
  );
});

export default AdminDashboard;
