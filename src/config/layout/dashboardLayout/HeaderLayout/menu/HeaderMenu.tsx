import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import "./styles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Header = ({ title, Menus, link }: any) => {
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
          fontSize="17px"
          cursor="pointer"
          fontWeight="500"
          className="animated-text"
          onClick={() => {
            if (link && !Menus) {
              navigate(link);
            }
          }}
        >
          {title}
        </Text>
      </PopoverTrigger>
      {Menus && (
        <PopoverContent mt={5}>
          <PopoverBody borderRadius={0}>
            {<Menus />}
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Header;
