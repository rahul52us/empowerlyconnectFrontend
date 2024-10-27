import { useState } from "react";
import { InfoIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  useColorModeValue,
  Flex,
  UnorderedList,
  ListItem,
  Input,
  IconButton,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useSectionColorContext } from "../../School";

// Initial FAQ Data
const initialFaqData = [
  {
    question: "How do I apply for admission?",
    answer: [
      "Visit our online application portal and create an account.",
      "Fill out the required personal and academic information.",
      "Upload necessary documents such as transcripts and identification.",
      "Submit your application before the deadline.",
      "For details on the admission timeline and requirements, visit our admissions page.",
    ],
  },
  {
    question: "What facilities does the school provide?",
    answer: [
      "Modern classrooms with interactive technology for enhanced learning.",
      "A library with a vast selection of books, periodicals, and digital resources.",
      "State-of-the-art science labs for hands-on experiments.",
      "Computer labs equipped with high-speed internet and educational software.",
      "Sports facilities including a gymnasium and swimming pool.",
    ],
  },
  {
    question: "Are there extracurricular activities available?",
    answer: [
      "Yes, we offer a variety of sports teams and clubs.",
      "Students can participate in music, drama, and art classes.",
      "We have various interest-based clubs promoting student engagement.",
      "Regular events and competitions are organized throughout the year.",
    ],
  },
  {
    question: "What are the school hours?",
    answer: [
      "The school operates from 9:00 AM to 3:30 PM, Monday to Friday.",
      "There is early dismissal at 1:00 PM on Fridays.",
      "After-school activities may extend the hours for participants.",
    ],
  },
  {
    question: "How can parents get involved in school activities?",
    answer: [
      "Parents can volunteer for school events and activities.",
      "Joining the Parent-Teacher Association (PTA) is encouraged.",
      "They can participate in committees and attend school board meetings.",
      "Parents are invited to contribute ideas and feedback during events.",
    ],
  },
];

const FaqSection = () => {
  const { colorMode } = useColorMode();
  const { colors, websiteMode } = useSectionColorContext();
  const buttonHoverColor = useColorModeValue("teal.50", "teal.700");
  const buttonExpandedColor = useColorModeValue("teal.100", "teal.600");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const panelBgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [faqData, setFaqData] = useState(initialFaqData);
  const [editIndex, setEditIndex] = useState(null);
  const [editedContent, setEditedContent] = useState<any>({ question: "", answer: [] });

  // State for Title and Subtitle
  const [title, setTitle] = useState("Frequently Asked Questions");
  const [subtitle, setSubtitle] = useState("Find answers to common questions about admissions, facilities, and programs.");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleEdit = (index : any) => {
    setEditIndex(index);
    setEditedContent({ question: faqData[index].question, answer: [...faqData[index].answer] });
  };

  const handleSave = (index : any) => {
    const updatedFaqData = [...faqData];
    updatedFaqData[index] = { ...editedContent };
    setFaqData(updatedFaqData);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleQuestionChange = (e : any) => {
    setEditedContent({ ...editedContent, question: e.target.value });
  };

  const handleAnswerChange = (value : any, idx : number) => {
    const updatedAnswers : any = [...editedContent.answer];
    updatedAnswers[idx] = value;
    setEditedContent({ ...editedContent, answer: updatedAnswers });
  };

  // Functions to handle title and subtitle changes
  const handleTitleChange = (e : any) => {
    setTitle(e.target.value);
  };

  const handleSubtitleChange = (e : any) => {
    setSubtitle(e.target.value);
  };

  const saveTitleAndSubtitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <Box id="FAQ" p={4} mx="auto" borderRadius="md" m={0} mr={{ base: 2, md: 10 }} ml={{ base: 2, md: 10 }}>
      {isEditingTitle ? (
        <Box mb={4}>
          <Input value={title} onChange={handleTitleChange} mb={2} />
          <Input value={subtitle} onChange={handleSubtitleChange} mb={2} />
          <Flex justifyContent="flex-end">
            <IconButton icon={<CheckIcon />} aria-label="Save Title" onClick={saveTitleAndSubtitle} colorScheme="green" mr={2} />
            <IconButton icon={<CloseIcon />} aria-label="Cancel" onClick={() => setIsEditingTitle(false)} colorScheme="red" />
          </Flex>
        </Box>
      ) : (
        <Flex direction="column" alignItems="center" mb={4}>
          <Heading as="h2" size="xl" textAlign="center" fontWeight="bold" color={colorMode === "light" ? colors?.headingColor?.light : colors?.headingColor?.dark}>
            {title}
          </Heading>
          <Text mt={4} textAlign="center" fontSize="lg" color={colorMode === "light" ? colors?.subHeadingColor?.light : colors?.subHeadingColor?.dark}>
            {subtitle}
          </Text>
        </Flex>
      )}
      {websiteMode && (  // Conditionally render the edit button based on websiteMode
        <Flex justifyContent="end" mb={2}>
          <IconButton icon={<EditIcon />} aria-label="Edit Title" onClick={() => setIsEditingTitle(true)} colorScheme="teal" mt={2} />
        </Flex>
      )}
      <Accordion allowToggle>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} border="1px" borderColor={borderColor} borderRadius="md" mb={3}>
            <AccordionButton _hover={{ bg: buttonHoverColor, boxShadow: "md" }} p={6} _expanded={{ bg: buttonExpandedColor }} transition="background-color 0.2s, box-shadow 0.2s">
              <Flex alignItems="center" flex="1" textAlign="left">
                <InfoIcon boxSize={5} color={textColor} mr={2} display={{ base: "none", md: "inline" }} />
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }} color={textColor}>
                  {editIndex === index ? editedContent.question : faq.question}
                </Text>
              </Flex>
              <AccordionIcon color={textColor} />
            </AccordionButton>
            <AccordionPanel fontSize="md" pb={4} p={4} bg={panelBgColor} borderRadius="md" boxShadow="sm">
              {editIndex === index ? (
                <Box>
                  <Input value={editedContent.question} onChange={handleQuestionChange} mb={3} />
                  <UnorderedList spacing={2} color={textColor}>
                    {editedContent.answer.map((point : any, idx : number) => (
                      <ListItem key={idx} cursor="pointer">
                        <Textarea value={point} onChange={(e) => handleAnswerChange(e.target.value, idx)} mb={2} />
                      </ListItem>
                    ))}
                  </UnorderedList>
                  <Flex mt={3} justifyContent="flex-end">
                    <IconButton icon={<CheckIcon />} aria-label="Save" onClick={() => handleSave(index)} colorScheme="green" mr={2} />
                    <IconButton icon={<CloseIcon />} aria-label="Cancel" onClick={handleCancel} colorScheme="red" />
                  </Flex>
                </Box>
              ) : (
                <UnorderedList spacing={2} color={textColor}>
                  {faq.answer.map((point, idx) => (
                    <ListItem key={idx}>{point}</ListItem>
                  ))}
                </UnorderedList>
              )}
              {!editIndex && websiteMode && (
                <Flex mt={3} justifyContent="flex-end">
                  <IconButton icon={<EditIcon />} aria-label="Edit FAQ" onClick={() => handleEdit(index)} colorScheme="teal" />
                </Flex>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FaqSection;
