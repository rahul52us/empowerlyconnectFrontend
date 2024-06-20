import { observer } from "mobx-react-lite"
import UserTable from "./component/UserTable"
import { Box } from "@chakra-ui/react"
import store from "../../../../store/store"

const index = observer(() => {
  const {auth : {checkPermission}} = store
  return (
    <Box display={checkPermission('request','manager') ? undefined : 'none'}>
        <UserTable />
    </Box>
  )
})

export default index