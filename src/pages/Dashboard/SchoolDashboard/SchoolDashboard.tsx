import { observer } from "mobx-react-lite"
import ColorSettingsForm from "./component/ColorSettingsForm"

const SchoolDashboard = observer(() => {
  return (
    <div>
      <ColorSettingsForm />
    </div>
  )
})
export default SchoolDashboard