import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ShowDataProps {
  label: string;
  value: string | string[]; // Accept both single string and array of strings
  type?: "single" | "multi"; // Optional type prop
}

const ShowData: FC<ShowDataProps> = ({ label, value, type = "single" }) => {
  return (
    <Box>
      <Text color={"gray"} fontSize={"sm"}> 
        {label}
      </Text>
      {type === "single" ? (
        <Text  fontWeight={"semibold"}>
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
