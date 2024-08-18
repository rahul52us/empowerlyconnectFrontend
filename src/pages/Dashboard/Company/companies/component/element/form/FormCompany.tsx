import { Box } from "@chakra-ui/react"
import CreateOrganisationStep2 from "../../../../../../Authentication/CreateOrganisation/createOrganisationStep2/CreateOrganisationStep2"
import { observer } from "mobx-react-lite"

const FormCompany = observer(({onClose, initialValues, isEdit} : any) => {
  return (
    <Box>
        <CreateOrganisationStep2 initialValues={initialValues} isEdit={isEdit} singleCompany={true} onClose={onClose}/>
    </Box>
  )
})

export default FormCompany;