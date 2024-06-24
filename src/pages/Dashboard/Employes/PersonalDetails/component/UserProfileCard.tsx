import {
  Box,
  Grid,
  Avatar,
  Text,
  useColorModeValue,
  Flex,
  Tag,
} from "@chakra-ui/react";
interface User {
  _id: string;
  username: string;
  name: string;
  code: string;
  title: string;
  designation?: any;
}
const UserProfileCard = ({
  userData,
  designation,
}: {
  userData: User;
  designation?: string;
}) => {
  // console.log('designation',designation)

  return (
    <Box
      maxW={"xs"}
      p={3}
      shadow={"rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"}
      rounded={12}
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <Grid templateColumns={"1fr 3fr"} alignItems={"center"}>
        <Avatar
          name={userData.name}
          src={
            "https://img.freepik.com/free-photo/indoor-shot-attractive-young-woman-with-glasses-posing-against-white-wall_273609-20347.jpg?t=st=1718643092~exp=1718646692~hmac=2c597a3db8b25f38bcb6f2b1413e32cb642bbbb1a1f91ccb9d1087dbbced49a4&w=1060"
          }
        />
        <Box textTransform={"capitalize"} fontSize={"sm"}>
          <Text fontWeight="bold">{userData.name}</Text>
          <Text my={1}>{userData.username}</Text>
          <Flex gap={4} mt={2}>
            <Tag size={"sm"} colorScheme={"telegram"}>
              {userData?.code}
            </Tag>
            <Tag colorScheme={"telegram"} size={"sm"}>
              {designation}
            </Tag>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default UserProfileCard;
