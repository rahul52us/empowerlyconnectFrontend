import { InfoIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';

// FAQ Data
const faqData = [
  {
    question: "How do I apply for admission?",
    answer: [
      "Visit our online application portal.",
      "Fill out the required information.",
      "Submit your application before the deadline.",
      "Check the admissions page for more details."
    ],
  },
  {
    question: "What facilities does the school provide?",
    answer: [
      "Modern classrooms.",
      "Library with a wide selection of books.",
      "Science and computer labs.",
      "Sports facilities including a gymnasium.",
      "Art and music rooms."
    ],
  },
  {
    question: "What programs do you offer?",
    answer: [
      "High school diplomas.",
      "Vocational courses.",
      "Extracurricular activities like sports and arts.",
      "Specialized training programs."
    ],
  },
  {
    question: "How can I contact the school?",
    answer: [
      "Use the contact form on our website.",
      "Call the school office directly.",
      "Email us at the provided email address."
    ],
  },
];

const FaqSection = () => {
  const buttonHoverColor = useColorModeValue('teal.50', 'teal.700');
  const buttonExpandedColor = useColorModeValue('teal.100', 'teal.600');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const panelBgColor = useColorModeValue('gray.50', 'gray.700');
  const headingColor = useColorModeValue("teal.500", "teal.300");
  const subheadingColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      id="FAQ"
      p={4}
      mx="auto"
      borderRadius="md"
      m={0}
      mr={{ base: 2, md: 10 }}
      ml={{ base: 2, md: 10 }}
    >
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={3}
        fontWeight="bold"
        color={headingColor}
      >
        Frequently Asked Questions
      </Heading>
      <Text textAlign="center" fontSize="lg" color={subheadingColor} mb={5}>
        Find answers to common questions about admissions, facilities, and programs.
      </Text>
      <Accordion allowToggle>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} border="1px" borderColor={borderColor} borderRadius="md" mb={3}>
            <AccordionButton
              _hover={{ bg: buttonHoverColor, boxShadow: 'md' }}
              p={6}
              _expanded={{ bg: buttonExpandedColor }}
              transition="background-color 0.2s, box-shadow 0.2s"
            >
              <Flex alignItems="center" flex="1" textAlign="left">
                <InfoIcon boxSize={5} color={textColor} mr={2} display={{base : 'none', md : 'inline'}}/>
                <Text
                  fontWeight="bold"
                  fontSize={{base : 'sm', md : "lg"}}
                  color={textColor}
                  _hover={{ textDecoration: 'underline' }}
                  transition="color 0.2s"
                >
                  {faq.question}
                </Text>
              </Flex>
              <AccordionIcon color={textColor} />
            </AccordionButton>
            <AccordionPanel fontSize="md" pb={4} p={4} bg={panelBgColor} borderRadius="md" boxShadow="sm">
              <UnorderedList spacing={2} color={textColor}>
                {faq.answer.map((point, idx) => (
                  <ListItem key={idx} cursor="pointer">{point}</ListItem>
                ))}
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FaqSection;
