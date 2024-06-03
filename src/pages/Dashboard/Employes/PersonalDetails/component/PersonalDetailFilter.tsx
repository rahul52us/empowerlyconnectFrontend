import { Box, Flex, IconButton, Collapse, useDisclosure } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { Search2Icon } from "@chakra-ui/icons";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";
import { bloodGroups } from "../utils/constant";

const PersonalDetailFilter = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box boxShadow="md" borderRadius="md" p={4} border="1px solid #E2E8F0">
      <Flex justifyContent="space-between" alignItems="center"  columnGap={5}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ sm: "column", md: "row" }}
          columnGap={5}
          flex="1"
        >
          <CustomInput name="username" label="Username" />
          <CustomInput name="code" label="Code" />
        </Flex>
        <Flex columnGap={4} mt={8}>
          <IconButton
            aria-label="Expand Filter"
            title="Expand Filter"
            onClick={onToggle}
          >
            <FiFilter />
          </IconButton>
          <IconButton
            aria-label="Search Record"
            title="Search Record"
          >
            <Search2Icon />
          </IconButton>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box mt={4} p={4} border="1px solid #E2E8F0" borderRadius="md">
          {/* Add your filter content here */}
          <CustomInput name="filter1" label="Filter 1" options={bloodGroups} type="select" />
          <CustomInput name="filter2" label="Filter 2" />
        </Box>
      </Collapse>
    </Box>
  );
};

export default PersonalDetailFilter;
