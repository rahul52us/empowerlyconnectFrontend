import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
} from "react-icons/fa";
import {
  FiDownload,
  FiMoreHorizontal,
  FiPaperclip,
  FiUpload,
} from "react-icons/fi";
import { PiFilePptBold } from "react-icons/pi";

const fileData = [
  { name: "Document1.pdf", size: "2 MB", format: "pdf" },
  { name: "Report.docx", size: "1.5 MB", format: "word" },
  { name: "Data.xlsx", size: "3 MB", format: "excel" },
  { name: "Image.png", size: "500 KB", format: "image" },
  { name: "Presentation.pptx", size: "4 MB", format: "ppt" },
  { name: "Archive.zip", size: "10 MB", format: "zip" },
];

const FileIcon = ({ format }: { format: string }) => {
  const color = useColorModeValue("gray.600", "gray.300");
  switch (format) {
    case "pdf":
      return <Icon as={FaFilePdf} color="red.500" />;
    case "ppt":
      return <Icon as={PiFilePptBold} color="orange.500" />;
    case "word":
      return <Icon as={FaFileWord} color="blue.500" />;
    case "excel":
      return <Icon as={FaFileExcel} color="green.500" />;
    case "image":
      return <Icon as={FaFileImage} color={color} />;
    default:
      return <Icon as={FaFilePdf} color={color} />;
  }
};

const AttachmentItem = ({
  name,
  size,
  format,
}: {
  name: string;
  size: string;
  format: string;
}) => {
  return (
    <WrapItem>
      <Flex
        alignItems="center"
        borderWidth="1px"
        shadow="md"
        borderRadius="md"
        p={3}
        w="full"
        justifyContent="space-between"
        bg={useColorModeValue("white", "gray.700")}
      >
        <HStack spacing={3}>
          <FileIcon format={format} />
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="sm" fontWeight="bold" isTruncated>
              {name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {size}
            </Text>
          </VStack>
        </HStack>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Download file"
          icon={<FiDownload />}
        />
      </Flex>
    </WrapItem>
  );
};

const ProjectAttachments = () => {
  const [showAll, setShowAll] = useState(false);

  const filesToShow = showAll ? fileData : fileData.slice(0, 5);

  return (
    <Box p={5} w="100%" bg={useColorModeValue("gray.50", "gray.800")} borderRadius="md" shadow="md">
      <VStack spacing={4} align="stretch">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          color={useColorModeValue("gray.600", "gray.300")}
        >
          <HStack>
            <Icon as={FiPaperclip} />
            <Text fontWeight="bold" fontSize="lg">
              Attachments ({filesToShow.length})
            </Text>
          </HStack>

          <Flex align="end" gap={2}>
            <Button
              leftIcon={<FiUpload />}
              colorScheme="blue"
              size="sm"
              variant="outline"
            >
              Upload
            </Button>
          </Flex>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          gap={4}
        >
          {filesToShow.map((file, index) => (
            <AttachmentItem key={index} {...file} />
          ))}
        </Grid>

        {!showAll && fileData.length > 5 && (
          <Button
            leftIcon={<FiMoreHorizontal />}
            colorScheme="telegram"
            onClick={() => setShowAll(true)}
            variant="outline"
            size="sm"
          >
            Show More
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default ProjectAttachments;
