import { observer } from "mobx-react-lite"
import DrawerLoader from "../../../../../../../config/component/Loader/DrawerLoader"
import FormCompany from "./FormCompany"

const AddCompany = observer(({onClose} : any) => {
  return (
    <DrawerLoader loading={false}>
        <FormCompany onClose={onClose}/>
        {/* <Button onClick={onClose}>Close</Button> */}
    </DrawerLoader>
  )
})

export default AddCompany