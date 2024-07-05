import { observer } from "mobx-react-lite";
import DailyAttendence from "./component/Daily/DailyAttendence";

const Attendence = observer(() => {
  return <DailyAttendence />;
});

export default Attendence;