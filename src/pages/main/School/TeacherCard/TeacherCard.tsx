import { Box, Image, Tag, Text } from "@chakra-ui/react";  

const TeacherCard = ({ name, subject, imageUrl }:any) => {  
  return (  
    <Box maxW={"3xs"} shadow={"base"} rounded={"md"}>  
      <Image  
        src={imageUrl}  
        alt={name}  
        rounded={"md"}  
        borderTopRadius="md"  
        objectFit="cover"  
        height="200px"  
        w={'100%'}
      />  
      <Box p={2}>  
        <Text fontSize={"lg"} fontWeight={500} mb={1}>  
          {name}  
        </Text>  
        <Tag size={"sm"}>{subject}</Tag>  
      </Box>  
    </Box>  
  );  
};  

export default TeacherCard;