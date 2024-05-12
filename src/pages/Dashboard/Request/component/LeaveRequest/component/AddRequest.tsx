import { Box, Card, Divider, Heading } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import LeaveRequestForm from "../form/LeaveRequestForm"

const AddRequest = observer(() => {
  const [showError, setShowError] = useState(false)
  const initialValues = {
    startDate : new Date(),
    endDate : new Date(),
    leaveType : undefined,
    managers : [],
    reason : undefined,
    status : 'Pending'
  }

  return (
    <Card height="92%">
        <Box p={3}>
        <Heading fontSize="2xl" borderColor="gray.800">Add Request</Heading>
        </Box>
        <Divider />
        <LeaveRequestForm initialValues={initialValues} showError={showError} setShowError={setShowError} close={() => {}} handleSubmit={() => alert("fdshj")}/>
    </Card>
  )
})

export default AddRequest;