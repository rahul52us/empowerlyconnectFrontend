import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface ShowDataProps {
  label: string;
  value: string | string[]; // Accept both single string and array of strings
  type?: "single" | "multi"; // Optional type prop
}

const ShowData: FC<ShowDataProps> = ({ label, value, type = "single" }) => {
  const labelColor = useColorModeValue("gray", "gray.400");
  const textColor = useColorModeValue("black", "gray.200");
  return (
    <Box>
      <Text color={labelColor} fontSize={"sm"}>
        {label}
      </Text>
      {type === "single" ? (
        <Text fontWeight={"semibold"} color={textColor}>
          {value}
        </Text>
      ) : (
        Array.isArray(value) &&
        value.map((item, index) => (
          <Text
            key={index}
            textTransform={"capitalize"}
            fontWeight={"semibold"}
          >
            {item}
          </Text>
        ))
      )}
    </Box>
  );
};

export default ShowData;
