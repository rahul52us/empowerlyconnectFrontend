import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { requestBreadCrumb } from "../utils/breadcrumb.constant";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../config/constant/routes";
import CustomSubmitBtn from "../../../config/component/CustomSubmitBtn/CustomSubmitBtn";

const Request = observer(() => {
  const navigate = useNavigate()
  return (
    <Box>
      <DashPageHeader title="Request" breadcrumb={requestBreadCrumb.index} />
      <CustomSubmitBtn buttonText="New Request" loading={false} onClick={() => navigate(dashboard.request.leave)} />
    </Box>
  );
});

export default Request;