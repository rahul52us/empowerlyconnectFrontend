import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../../utils/breadcrumb.constant";

const CreateEmploye = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Employes > New" breadcrumb={employesBreadCrumb.new} />
    </Box>
  );
});
export default CreateEmploye;
