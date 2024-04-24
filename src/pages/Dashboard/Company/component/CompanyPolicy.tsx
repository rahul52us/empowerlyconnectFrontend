import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import { companyBreadCrumb } from "../../utils/breadcrumb.constant";

const CompanyPolicy = observer(() => {
  return (
    <div>
      <DashPageHeader title="Departments" breadcrumb={companyBreadCrumb} />
    </div>
  );
});

export default CompanyPolicy;
