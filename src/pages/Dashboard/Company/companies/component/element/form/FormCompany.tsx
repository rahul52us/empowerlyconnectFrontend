import { Box } from "@chakra-ui/react"
import CreateOrganisationStep2 from "../../../../../../Authentication/CreateOrganisation/createOrganisationStep2/CreateOrganisationStep2"
import { observer } from "mobx-react-lite"

const FormCompany = observer(() => {
  return (
    <Box>
        <CreateOrganisationStep2 />
    </Box>
  )
})

export default FormCompany;