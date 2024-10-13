import { Box, Image, Tag, Text } from "@chakra-ui/react";  

const TeacherCard = ({ name, subject, imageUrl }: any) => {  
  return (  
    <Box  
      maxW={{ base: "100%", sm: "xs", md: "md", lg: "lg" }} // Responsive max width  
      shadow={"base"}  
      rounded={"md"}  
      overflow="hidden" // Ensures child elements don't overflow  
    >  
      <Image  
        src={imageUrl}  
        alt={name}  
        roundedTop={"md"}  
        objectFit="cover"  
        height={{ base: "150px", md: "200px" }} // Responsive height for image  
        w={'100%'}  
      />  
      <Box p={{ base: 2, md: 4 }}>  {/* Responsive padding */}  
        <Text  
          fontSize={{ base: "md", md: "lg" }}  // Responsive font size  
          fontWeight={500}  
          mb={1}  
        >  
          {name}  
        </Text>  
        <Tag size={"sm"}>{subject}</Tag>  
      </Box>  
    </Box>  
  );  
};  

export default TeacherCard;