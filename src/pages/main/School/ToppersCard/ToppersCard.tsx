import { Box, Card, Image, Tag, Text } from "@chakra-ui/react";

export default function ToppersCard({
  percentage,
  name,
  img,
  year,
  classs,
}: any) {
  return (
    <Card shadow={"md"} maxW={200} rounded={8} my={2}>
      <Image
        w={200}
        rounded={8}
        h={220}
        objectFit={"cover"}
        src={img}
        alt="toppers"
      />
      <Box p={2}>
        <Tag
          colorScheme="yellow"
          w={"fit-content"}
          textAlign={"center"}
          position={"absolute"}
          top={48}
          fontSize={"18px"}
          right={2}
        >
          {percentage}%
        </Tag>
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={700}>
          {name}
        </Text>
        <Text
          textAlign={"center"}
          fontWeight={500}
          color={"gray"}
          fontSize={"sm"}
        >
          Class: {classs} {year}
        </Text>
      </Box>
    </Card>
  );
}

// export default ToppersCard;
