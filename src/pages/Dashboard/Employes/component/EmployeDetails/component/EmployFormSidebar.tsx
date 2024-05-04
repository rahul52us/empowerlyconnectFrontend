import { observer } from "mobx-react-lite";
import {
  Box,
  Text,
  VStack,
  Link,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dashboard } from "../../../../../../config/constant/routes";
import { sideTabs } from "./utils/constant";
import React from "react";

const EmployFormSidebar = observer(({ type }: any) => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const tab: any = new URLSearchParams(location.search).get("tab");
  const { id } = useParams();
  const handleChange = (tab: string) => {
    if (type === "edit") {
      navigate(`${dashboard.employes.details}/edit/${id}?tab=${tab}`);
    } else {
      navigate(`${dashboard.employes.details}/new?tab=${tab}`);
    }
  };

  return (
    <Box
      p={4}
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="md"
      boxShadow="md"
      height="100%"
      border="1px solid #e9ecef"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" color="blue.600">
          Employee Details
        </Text>
        <VStack spacing={2} align="stretch">
          {sideTabs.map((item: any, index : number) => {
            return (
              <React.Fragment key={index}>
                <Link
                  onClick={() => handleChange(item.key)}
                  fontSize="lg"
                  color={tab === item.key ? "blue.800" : undefined}
                  fontWeight={tab === item.key ? "semibold" : "medium"}
                  _hover={{ textDecoration: "underline", color: "blue.700" }}
                  cursor="pointer"
                >
                  {item.title}
                </Link>
                <Divider borderWidth="2px" borderColor={tab === item.key ? "blue.700" : undefined}/>
              </React.Fragment>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
});

export default EmployFormSidebar;
