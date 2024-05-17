import { Box, Card, Divider, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import LeaveRequestForm from "./LeaveRequestForm";
import { leaveRequestInitialValues } from "../../utils/constant";
import { generateResponse } from "../../utils/function";
import store from "../../../../../../../store/store";
import { getStatusType } from "../../../../../../../config/constant/statusCode";

const AddRequest = observer(() => {
  const {auth : {openNotification}, requestStore : {createRequest}} = store
  const [requestType, setRequestType] = useState('submit')
  const [showError, setShowError] = useState(false);

  const handleSubmit = ({ values, setSubmitting, resetForm }: any) => {
    generateResponse(values)
    createRequest(generateResponse(values))
      .then((data: any) => {
        openNotification({
          title: "Create Successfully",
          message: data?.message,
          type: "success",
        });
        resetForm();
      })
      .catch((err: any) => {
        openNotification({
          title: "Create Failed",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      })
      .finally(() => {
        setSubmitting(false);
        setShowError(false);
      });
  };

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
        handleSubmit={handleSubmit}
        setRequestType={setRequestType}
        requestType={requestType}
      />
    </Card>
  );
});

export default AddRequest;
