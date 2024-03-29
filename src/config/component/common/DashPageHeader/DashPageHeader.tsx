import {
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  useTheme,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Divider,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import CustomBreadcrumb from "../../CustomBreadcrumb/CustomBreadcrumb";
import { Helmet } from "react-helmet";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineTable, AiOutlineAppstore } from "react-icons/ai";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface PageHeaderProps {
  title?: string;
  subTitle?: string;
  breadcrumb?: BreadcrumbItem[];
  btnAction?: any;
  selectedMode?: string;
}

const DashPageHeader = observer(
  ({
    title,
    subTitle,
    breadcrumb,
    btnAction,
    selectedMode = "", // Default to empty string
  }: PageHeaderProps) => {
    const theme = useTheme();
    const headingColor = useColorModeValue(
      theme.colors.gray[800],
      theme.colors.gray[200]
    );
    const textColor = useColorModeValue(
      theme.colors.gray[600],
      theme.colors.gray[400]
    );

    const isSelected = (mode: string) => mode === selectedMode;

    return (
      <>
        {title && (
          <Helmet>
            <title>
              {title
                ? `${process.env.REACT_APP_WEBSITE_NAME} | ${title}`
                : process.env.REACT_APP_WEBSITE_NAME}
            </title>
          </Helmet>
        )}
        <Flex
          justify="space-between"
          alignItems="center"
          mb={4}
          mr={{ base: 4, sm: 6 }}
        >
          <Box>
            {breadcrumb ? (
              <Box>
                <CustomBreadcrumb items={breadcrumb} />
              </Box>
            ) : (
              <>
                <Heading fontSize="lg" color={headingColor} mb={2}>
                  {title}
                </Heading>
                <Text color={textColor} fontSize="sm">
                  {subTitle}
                </Text>
              </>
            )}
          </Box>
          {btnAction && (
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Flex alignItems="center" cursor="pointer">
                  <Icon
                    as={RiMenuLine}
                    fontSize="lg"
                    color="gray.600"
                    _hover={{ color: "gray.800" }}
                  />
                </Flex>
              </PopoverTrigger>
              <PopoverContent
                bg={useColorModeValue("white", "gray.800")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                boxShadow="lg"
                maxW="xs" // Set maximum width here
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="bold" fontSize="sm">
                  Select View
                </PopoverHeader>
                <PopoverBody>
                  <Flex
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => btnAction("table")}
                    p={3}
                    borderRadius="md"
                    bg={isSelected("table") ? "blue.100" : "transparent"}
                    _hover={{ bg: "blue.50" }} // Hover effect
                  >
                    <Icon as={AiOutlineTable} color="blue.400" mr={2} />
                    <Text fontSize="sm">Table Mode</Text>
                  </Flex>
                  <Divider my={2} />
                  <Flex
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => btnAction("grid")}
                    p={3}
                    borderRadius="md"
                    bg={isSelected("grid") ? "blue.100" : "transparent"}
                    _hover={{ bg: "blue.50" }} // Hover effect
                  >
                    <Icon as={AiOutlineAppstore} color="blue.400" mr={2} />
                    <Text fontSize="sm">Grid Mode</Text>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </>
    );
  }
);

export default DashPageHeader;
