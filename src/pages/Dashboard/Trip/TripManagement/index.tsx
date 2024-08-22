import { observer } from "mobx-react-lite";
import store from "../../../../store/store";
import TripUserDetail from "./user/TripUserDetail";
import TripAdminDetails from "./admin";

const index = observer(() => {
  const {
    auth: { user },
  } = store;

  if (["admin", "superadmin"].includes(user.role)) {
    return <TripAdminDetails />;
  } else {
    return <TripUserDetail userId={user._id} />;
  }
});

export default index;
