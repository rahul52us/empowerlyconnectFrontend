import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import CustomButton from "../../../../config/component/Button/CustomButton";

const CompanyDetails = observer(({ setSelectedTab }: any) => {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
          <Heading mb={8} textAlign={"center"} fontSize={{base: "sm", md: "2xl" }} fontWeight="bold">
            Company Details
          </Heading>
          <CustomButton
            onClick={() =>
              setSelectedTab({ open: true, type: "work-experience" })
            }
            btnText="Edit"
          />
        </Flex>
        <Divider />
    </Box>
  );
});

export default CompanyDetails;
