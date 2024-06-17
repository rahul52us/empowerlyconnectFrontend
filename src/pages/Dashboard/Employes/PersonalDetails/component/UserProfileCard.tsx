
import { Box, Grid, Avatar, Text, Badge } from "@chakra-ui/react";
interface User {
  _id: string;
  username: string;
  name: string;
  code: string;
  title: string;
}
const UserProfileCard = ({ userData }: { userData:User }) => {
  return (
    <Box maxW={"xs"} p={6} shadow={"md"} rounded={12}>
      <Grid templateColumns={"1fr 3fr"} gap={4} alignItems={"center"}>
        <Avatar
          size={"lg"}
          name={userData.name}
          src={`https://avatars.dicebear.com/api/avataaars/${userData.username}.svg`} // Placeholder avatar URL
        />
        <Box textTransform={"capitalize"} fontSize={"sm"}>
          <Text fontWeight="bold">{userData.name}</Text>
          <Text my={1}>{userData.username}</Text>
          <Badge colorScheme="telegram">{userData.code}</Badge>
        </Box>
      </Grid>
    </Box>
  );
};

export default UserProfileCard;
