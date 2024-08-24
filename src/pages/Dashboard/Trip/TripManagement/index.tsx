import { observer } from "mobx-react-lite";
import store from "../../../../store/store";
import TripUserDetail from "./user/TripUserDetail";
import TripAdminDetails from "./admin";
import { renderUserTypeComponent } from "../../../../config/constant/function";
import PermissionDeniedPage from "../../../../config/component/commonPages/PermissionDeniedPage";

const index = observer(() => {
  const {
    auth: { user, checkPermission },
  } = store;

  if (renderUserTypeComponent(user.role)) {
    return (
      <PermissionDeniedPage show={!checkPermission("trip", "view")}>
        <TripAdminDetails />
      </PermissionDeniedPage>
    );
  } else {
    return (
      <PermissionDeniedPage show={!checkPermission("trip", "view")}>
        <TripUserDetail
          userId={user._id}
        />
      </PermissionDeniedPage>
    );
  }
});

export default index;
