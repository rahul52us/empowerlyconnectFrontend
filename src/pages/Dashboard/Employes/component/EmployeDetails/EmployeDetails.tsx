import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../../utils/breadcrumb.constant";
import EmployeDetailsTable from "./Element/EmployeDetailsTable";

// This is the main employe details file
const EmployeDetails = observer(() => {
  return (
    <div>
      <DashPageHeader
        title="Employes > Details"
        breadcrumb={employesBreadCrumb.details}
      />
      <EmployeDetailsTable />
    </div>
  );
});

export default EmployeDetails; 