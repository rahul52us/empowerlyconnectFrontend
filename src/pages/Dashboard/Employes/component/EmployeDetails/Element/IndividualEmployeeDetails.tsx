import { Box, Button } from "@chakra-ui/react";
// import { observer } from "mobx-react-lite";
import store from "../../../../../../store/store";
import { useEffect } from "react";

interface IndividualEmployeeDetailsProps {
  employeeId: string;
  onClose: () => void;
}

const IndividualEmployeeDetails: React.FC<IndividualEmployeeDetailsProps> = ({
  employeeId,
  onClose,
}) => {
  const {
    Employee: { getEmployeeDetailsById },
    auth: { openNotification },
  }: any = store;

  useEffect(() => {
    if (employeeId) {
      getEmployeeDetailsById(employeeId)
        .then((details: any) => {
          console.log(details);
          // openNotification("Employee details fetched successfully");
        })
        .catch((error: any) => {
          console.error("Failed to fetch employee details", error);
          // openNotification("Failed to fetch employee details", "error");
        });
    }
  }, [employeeId, getEmployeeDetailsById, openNotification]);

  return (
    <Box>
      {/* Render employee details here */}
      <p>Details for employee ID: {employeeId}</p>
      <Button onClick={onClose}>Close</Button>
    </Box>
  );
};

export default IndividualEmployeeDetails;
