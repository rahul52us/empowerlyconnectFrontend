import { Box } from "@chakra-ui/react";
import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../utils/breadcrumb.constant";
import PersonalDetailContainer from "./PersonalDetailContainer";
import { observer } from "mobx-react-lite";

const PersonalDetails = observer(() => {
  return (
    <Box>
      <DashPageHeader
        title="Employes > Details"
        breadcrumb={employesBreadCrumb.personalDetails}
      />
      <PersonalDetailContainer />
    </Box>
  );
})

export default PersonalDetails;
