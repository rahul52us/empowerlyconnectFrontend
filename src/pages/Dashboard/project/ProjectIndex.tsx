import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { renderUserTypeComponent } from "../../../config/constant/function";
import AdminIndex from "./admin/AdminIndex";
import UserIndex from "./user/UserIndex";
import PermissionDeniedPage from "../../../config/component/commonPages/PermissionDeniedPage";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../config/constant/routes";

const ProjectIndex = observer(() => {
  const navigate = useNavigate();
  const {
    auth: { user, checkPermission },
  } = store;

  if (renderUserTypeComponent(user.role)) {
    return (
      <PermissionDeniedPage
        show={!checkPermission("project", "view")}
        onClick={() => navigate(dashboard.home)}
      >
        <AdminIndex />
      </PermissionDeniedPage>
    );
  } else {
    return (
      <PermissionDeniedPage
        show={!checkPermission("project", "view")}
        onClick={() => navigate(dashboard.home)}
      >
        <UserIndex userId={user._id} />
      </PermissionDeniedPage>
    );
  }
});

export default ProjectIndex;
