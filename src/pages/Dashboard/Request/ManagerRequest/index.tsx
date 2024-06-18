import { observer } from "mobx-react-lite"
import UserTable from "./component/UserTable"

const index = observer(() => {
  return (
    <div>
        <UserTable />
    </div>
  )
})

export default index