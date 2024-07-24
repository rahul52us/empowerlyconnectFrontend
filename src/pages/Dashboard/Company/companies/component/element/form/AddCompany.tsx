import { observer } from "mobx-react-lite"
import DrawerLoader from "../../../../../../../config/component/Loader/DrawerLoader"
import FormCompany from "./FormCompany"
import { CompantInitialValues } from "../../../../../../Authentication/CreateOrganisation/createOrganisationStep2/utils/constant"

const AddCompany = observer(({onClose} : any) => {
  return (
    <DrawerLoader loading={false}>
        <FormCompany onClose={onClose} initialValues={CompantInitialValues}/>
        {/* <Button onClick={onClose}>Close</Button> */}
    </DrawerLoader>
  )
})

export default AddCompany