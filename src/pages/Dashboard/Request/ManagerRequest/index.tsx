import { observer } from "mobx-react-lite"
import UserTable from "./component/UserTable"

const index = observer(() => {
  return (
        <UserTable />
  )
})

export default index