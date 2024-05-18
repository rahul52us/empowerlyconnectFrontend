import { Card, Divider, Flex, Heading, IconButton } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import LeaveRequestForm from "./LeaveRequestForm";
import { leaveRequestInitialValues } from "../../utils/constant";
import { generateResponse } from "../../utils/function";
import store from "../../../../../../../store/store";
import { getStatusType } from "../../../../../../../config/constant/statusCode";
import { useNavigate, useParams } from "react-router-dom";
import { dashboard } from "../../../../../../../config/constant/routes";
import { ArrowBackIcon } from "@chakra-ui/icons";

const LeaveEditRequest = observer(() => {
  const {
    auth: { openNotification },
    requestStore: { createRequest, getRequestById },
  } = store;
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState("submit");
  const [showError, setShowError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    getRequestById({ _id: id })
      .then(() => {
        // Handle the data if needed
      })
      .catch((err) => {
        openNotification({
          title: "Create Failed",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
        setTimeout(() => {
          navigate(dashboard.request.index);
        }, 2000);
      });
  }, [id, getRequestById, openNotification, navigate]);

  const handleSubmit = ({ values, setSubmitting, resetForm }: any) => {
    generateResponse(values);
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
      <Flex p={3} alignItems="center">
        <IconButton
          aria-label=""
          onClick={() => navigate(dashboard.request.index)}
        >
          <ArrowBackIcon fontSize="xl" />
        </IconButton>
        <Heading fontSize="2xl" borderColor="gray.800" ml={3}>
          Edit Request
        </Heading>
      </Flex>
      <Divider color="lightgray" borderWidth={1} />
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

export default LeaveEditRequest;
