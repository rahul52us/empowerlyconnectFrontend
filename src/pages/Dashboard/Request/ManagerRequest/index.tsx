import { observer } from "mobx-react-lite";
import UserTable from "./component/UserTable";
import { Box } from "@chakra-ui/react";
import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import { requestBreadCrumb } from "../../utils/breadcrumb.constant";

const index = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Request" breadcrumb={requestBreadCrumb.userList} />
      <UserTable />
    </Box>
  );
});

export default index;
