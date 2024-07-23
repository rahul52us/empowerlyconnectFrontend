import { Box } from "@chakra-ui/react"
import CreateOrganisationStep2 from "../../../../../../Authentication/CreateOrganisation/createOrganisationStep2/CreateOrganisationStep2"
import { observer } from "mobx-react-lite"

const FormCompany = observer(({onClose} : any) => {
  return (
    <Box>
        <CreateOrganisationStep2 singleCompany={true} onClose={onClose}/>
    </Box>
  )
})

export default FormCompany;