import { observer } from "mobx-react-lite"
import DrawerLoader from "../../../../../../../config/component/Loader/DrawerLoader"
import FormCompany from "./FormCompany"

const AddCompany = observer(() => {
  return (
    <DrawerLoader loading={false}>
        <FormCompany />
        {/* <Button onClick={onClose}>Close</Button> */}
    </DrawerLoader>
  )
})

export default AddCompany