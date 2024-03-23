import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { employesBreadCrumb } from "../../../utils/breadcrumb.constant";

const EmployeDetails = observer(() => {
  return (
    <div>
      <DashPageHeader title="Employes" breadcrumb={employesBreadCrumb.details} />
      EmployeDetails
    </div>
  );
});

export default EmployeDetails;
