import { Box } from "@chakra-ui/react";
import PersonalDetailFilter from "./component/PersonalDetailFilter";
import { observer } from "mobx-react-lite";
import PersonalDetailTable from "./component/PersonalDetailTable";
import store from "../../../../store/store";
import { useEffect } from "react";
import { getStatusType } from "../../../../config/constant/statusCode";

const PersonalDetailContainer = observer(() => {
  const {
    Employe: { getEmployesPersonalDetails },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getEmployesPersonalDetails({username : 'rahul52us@gmail.com'})
      .then(() => {})
      .catch((err) => {
        openNotification({
          title: "Failed to Get",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      });
  }, [getEmployesPersonalDetails, openNotification]);

  return (
    <Box>
      <PersonalDetailFilter />
      <PersonalDetailTable />
    </Box>
  );
});

export default PersonalDetailContainer;
