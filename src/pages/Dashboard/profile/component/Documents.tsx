import {
  Box,
  Stack,
  Heading,
  Flex,
  useColorModeValue,
  Divider,
  Text,
  Grid,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import CustomButton from "../../../../config/component/Button/CustomButton";
import ShowFileUploadFile from "../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";

const Documents = observer(({ setSelectedTab, isEditable, userDetails }: any) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");

  console.log('the user details', userDetails)

  return (
    <Flex width="100%">
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
        <Stack spacing={6}>
          <Flex justify="space-between" alignItems="center">
            <Heading
              as="h2"
              size="xl"
              textAlign="center"
              color={textColor}
              fontSize={{ base: "sm", md: "2xl" }}
            >
              Documents
            </Heading>
            {isEditable && <CustomButton
              onClick={() =>
                setSelectedTab({ open: true, type: "documents" })
              }
              btnText="Edit"
            />}
          </Flex>
          <Divider />
          {
            (userDetails?.documents?.length && userDetails?.documents[0]?.documents?.length) ?
            <Grid gridTemplateColumns={'1fr'}>
               {userDetails?.documents[0]?.documents?.map((item : any, index : number) => {
                return(
                  <Box key={index} mb={5}>
                     <Text fontSize="xl" cursor="pointer" color="gray.600" fontWeight={500}>{item.title}</Text>
                     {(item.file && Object.entries(item.file || {}).length) ? <ShowFileUploadFile edit={true} files={item.file}
                     /> : <Text textAlign="center" fontSize={'md'} fontWeight={500}>No Document Exists</Text>}
                  </Box>
                )
               })}
            </Grid>
            : <Text textAlign="center">No Document exists</Text>
          }
        </Stack>
      </Box>
    </Flex>
  );
});

export default Documents;
