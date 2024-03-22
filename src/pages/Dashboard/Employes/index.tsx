import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../utils/breadcrumb.constant";
import { Box } from "@chakra-ui/react";

const Employes = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Videos" breadcrumb={employesBreadCrumb} />
    </Box>
  );
});
export default Employes;
