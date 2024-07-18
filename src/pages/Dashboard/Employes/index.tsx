import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { UsersBreadCrumb } from "../utils/breadcrumb.constant";
import { Box } from "@chakra-ui/react";
import UserWidget from "./component/EmployeWidget/UserWidget";
import UserChart from "./component/EmployeChart/EmployeChart";

const Users = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Users" breadcrumb={UsersBreadCrumb.index} />
      <UserWidget />
      <UserChart />
    </Box>
  );
});

export default Users;