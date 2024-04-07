import { observer } from "mobx-react-lite";
import { Box, Text, VStack, Link, Divider } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { dashboard } from "../../../../../../config/constant/routes";

const EmployFormSidebar = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (tab : string) => {
    navigate(`${dashboard.employes.details}/edit/${id}?tab=${tab}`);
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" color="blue.600">
          Employee Details
        </Text>
        <VStack spacing={2} align="stretch">
          <Link
            onClick={() => handleChange("profile-details")}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ textDecoration: "underline", color: "blue.700" }}
            cursor="pointer"
          >
            Personal Details
          </Link>
          <Divider />
          <Link
            onClick={() => handleChange("bank-details")}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ textDecoration: "underline", color: "blue.700" }}
            cursor="pointer"
          >
            Bank Details
          </Link>
          <Divider />
          <Link
            onClick={() => handleChange("family-details")}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ textDecoration: "underline", color: "blue.700" }}
            cursor="pointer"
          >
            Family Details
          </Link>
          <Divider />
          <Link
            onClick={() => handleChange("family-details")}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ textDecoration: "underline", color: "blue.700" }}
            cursor="pointer"
          >
            Documents
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
});

export default EmployFormSidebar;
