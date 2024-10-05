import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import CustomButton from "../../../../config/component/Button/CustomButton";

const CompanyDetails = observer(({ setSelectedTab, isEditable }: any) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      w={"100%"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={cardBorder}
      boxShadow="lg"
      p={2}
    >
      <Flex justifyContent="space-between" alignItems="center" p={5}>
        <Heading
          textAlign={"center"}
          fontSize={{ base: "sm", md: "2xl" }}
          fontWeight="bold"
        >
          Company Details
        </Heading>
        {isEditable && (
          <CustomButton
            onClick={() =>
              setSelectedTab({ open: true, type: "work-experience" })
            }
            btnText="Edit"
          />
        )}
      </Flex>
      <Divider />
      {true && (
        <Box mb={5} mt={9}>
          <Text
            textAlign="center"
            fontSize={"md"}
            fontWeight={500}
            cursor="pointer"
          >
            No Company Details are exists.
          </Text>
        </Box>
      )}
    </Box>
  );
});

export default CompanyDetails;
