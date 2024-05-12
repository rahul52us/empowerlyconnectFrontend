import { Box, Card, Divider, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import LeaveRequestForm from "../form/LeaveRequestForm";
import { leaveRequestInitialValues } from "../utils/constant";

const AddRequest = observer(() => {
  const [showError, setShowError] = useState(false);

  return (
    <Card>
      <Box p={3}>
        <Heading fontSize="2xl" borderColor="gray.800">
          Add Request
        </Heading>
      </Box>
      <Divider color="lightgray" borderWidth={1}/>
      <LeaveRequestForm
        initialValues={leaveRequestInitialValues}
        showError={showError}
        setShowError={setShowError}
        close={() => {}}
        handleSubmit={() => alert("fdshj")}
      />
    </Card>
  );
});

export default AddRequest;
