import { observer } from "mobx-react-lite";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { CalendarIcon, InfoIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { MdLocationOn, MdAccountCircle, MdLanguage } from "react-icons/md";
import { BiIdCard } from "react-icons/bi";

// Define the type for personal details
interface PersonalDetail {
  _id: string;
  user: string;
  language: string[];
  addressInfo: {
    address: string;
    country: string;
    state: string;
    city: string;
    pinCode: string;
    _id: string;
  }[];
  aadharNo: string;
  bloodGroup: string;
  dob: string;
  emergencyNo: string;
  healthCardNo: string;
  insuranceCardNo: string;
  maritalStatus: string;
  medicalCertificationDetails: string;
  mobileNo: string;
  nickName: string;
  panNo: string;
  personalEmail: string;
  pfUanNo: string;
  refferedBy: string;
  weddingDate: string;
}

// Key-to-Label mapping
const keyLabels: { [key: string]: string } = {
  language: "Language",
  addressInfo: "Address Info",
  aadharNo: "Aadhar No",
  bloodGroup: "Blood Group",
  dob: "Date of Birth",
  emergencyNo: "Emergency No",
  healthCardNo: "Health Card No",
  insuranceCardNo: "Insurance Card No",
  maritalStatus: "Marital Status",
  medicalCertificationDetails: "Medical Certification Details",
  mobileNo: "Mobile No",
  nickName: "Nick Name",
  panNo: "PAN No",
  personalEmail: "Personal Email",
  pfUanNo: "PF UAN No",
  refferedBy: "Referred By",
  weddingDate: "Wedding Date",
};

// Key-to-Icon mapping
const keyIcons: { [key: string]: JSX.Element } = {
  language: <MdLanguage size="20px" />,
  addressInfo: <MdLocationOn size="20px" />,
  aadharNo: <BiIdCard size="20px" />,
  bloodGroup: <InfoIcon boxSize="20px" />,
  dob: <CalendarIcon boxSize="20px" />,
  emergencyNo: <PhoneIcon boxSize="20px" />,
  healthCardNo: <BiIdCard size="20px" />,
  insuranceCardNo: <BiIdCard size="20px" />,
  maritalStatus: <InfoIcon boxSize="20px" />,
  medicalCertificationDetails: <InfoIcon boxSize="20px" />,
  mobileNo: <PhoneIcon boxSize="20px" />,
  nickName: <MdAccountCircle size="20px" />,
  panNo: <BiIdCard size="20px" />,
  personalEmail: <EmailIcon boxSize="20px" />,
  pfUanNo: <BiIdCard size="20px" />,
  refferedBy: <MdAccountCircle size="20px" />,
  weddingDate: <CalendarIcon boxSize="20px" />,
};

// Helper functions
const formatAddressInfo = (addresses: PersonalDetail['addressInfo']) =>
  addresses.map((address, index) => (
    <Text key={index} fontSize="md" noOfLines={1}>
      {`${address.address}, ${address.city}, ${address.state}, ${address.country} - ${address.pinCode}`}
    </Text>
  ));

const formatValue = (key: string, value: any) => {
  if (key === 'dob' || key === 'weddingDate') {
    return new Date(value).toLocaleDateString();
  }
  return value.toString();
};

const PersonalInfo = observer(
  ({ personalDetails }: { personalDetails: PersonalDetail[] }) => {
    // Chakra UI color modes
    const textColor = useColorModeValue("gray.800", "gray.200");
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
        p={6}
      >
        <Heading mb={8} textAlign={"center"} fontSize="3xl" fontWeight="bold">
          Personal Details
        </Heading>
        {personalDetails.map((detail) => (
          <Box
            key={detail._id}
            color={textColor}
            borderRadius="md"
            boxShadow="md"
            p={6}
            mb={6}
            borderWidth="1px"
            borderColor={cardBorder}
          >
            <VStack align="start" spacing={4}>
              {Object.keys(detail).map((key) => {
                if (key === "_id" || key === "user" || key === "__v") return null; // Skip rendering the _id and user fields

                const value: any = detail[key as keyof PersonalDetail];
                const label = keyLabels[key] || key;
                const icon = keyIcons[key] || <InfoIcon boxSize="20px" />;

                return (
                  <HStack
                    key={key}
                    align="center"
                    spacing={4}
                    mb={3}
                    wrap="wrap"
                    w="full"
                    display={'flex'}
                  >
                    {icon}
                    <Box flex="1">
                      <Text fontSize="md" fontWeight="medium" ml={3}>
                        <strong>{label}:</strong> {Array.isArray(value) ? (
                          key === 'addressInfo' ? (
                            formatAddressInfo(value as PersonalDetail['addressInfo'])
                          ) : (
                            value.map((item, index) => (
                              <Text key={index} fontSize="md" ml={6}>
                              {Array.isArray(item) ? item.join(', ') : item.toString()}
                            </Text>

                            ))
                          )
                        ) : (
                          formatValue(key, value)
                        )}
                      </Text>
                    </Box>
                  </HStack>
                );
              })}
              <Divider borderColor={cardBorder} />
            </VStack>
          </Box>
        ))}
      </Box>
    );
  }
);

export default PersonalInfo;
