import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../utils/breadcrumb.constant";
import { Box } from "@chakra-ui/react";
import EmployeWidget from "./component/EmployeWidget/EmployeWidget";
import EmployeChart from "./component/EmployeChart/EmployeChart";

const Employes = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Employes" breadcrumb={employesBreadCrumb.index} />
      <EmployeWidget />
      <EmployeChart />
    </Box>
  );
});

export default Employes;