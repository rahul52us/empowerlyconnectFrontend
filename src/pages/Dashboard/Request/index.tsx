import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { requestBreadCrumb } from "../utils/breadcrumb.constant";
import LeaveDetails from "./component/LeaveRequest/component/LeaveDetails/LeaveDetails";

const Request = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Request" breadcrumb={requestBreadCrumb.index} />
      <LeaveDetails />
    </Box>
  );
});

export default Request;