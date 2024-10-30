import { observer } from "mobx-react-lite"
import WebsiteBuilder from "./component/WebsiteBuilder"

const SchoolDashboard = observer(() => {

  return (
    <div>
      <WebsiteBuilder />
    </div>
  )
})
export default SchoolDashboard