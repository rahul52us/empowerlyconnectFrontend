import {
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import "./styles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Header = ({ title, menus, link }: any) => {
  const navigate = useNavigate();
  return (
    <Popover trigger="hover" placement="bottom">
      <PopoverTrigger>
        <Text
          _hover={{
            textDecoration: "underline",
            color: "blue.500",
            animation: "slideFromLeft 0.3s ease forwards",
          }}
          fontSize="xl"
          cursor="pointer"
          fontWeight="500"
          className="animated-text"
          onClick={() => {
            if (link && !menus) {
              navigate(link);
            }
          }}
        >
          {title}
        </Text>
      </PopoverTrigger>
      {menus && (
        <PopoverContent mt={5}>
          <PopoverBody borderRadius={0}>
            <Box color="black">
              <Text>Item 1</Text>
              <Text>Item 2</Text>
              <Text>Item 3</Text>
            </Box>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Header;
