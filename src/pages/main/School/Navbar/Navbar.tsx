import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "./school_logo.png";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <Flex
      as="nav"
      align="center"
      h="4.5rem"
      p={4}
      borderBottom="2px solid"
      borderColor="gray.200"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
      boxShadow="sm"
    >
      <Image src={Logo} alt="School logo" objectFit="contain" h="4rem" />

      <Flex gap={12} display={{ base: "none", md: "flex" }} fontWeight={500}>
        {["Home", "About", "Admissions", "Events", "Contact Us"].map((link) => (
          <Link
            key={link}
            fontSize="lg"
            color={activeLink === link ? "blue.600" : "gray.600"}
            onClick={() => handleLinkClick(link)}
            _hover={{ color: "blue.600", textDecoration: "none" }}
            cursor="pointer"
          >
            {link}
          </Link>
        ))}

        <Menu>
          <MenuButton
            as={Text}
            fontSize="lg"
            fontWeight={500}
            color={activeLink === "Academics" ? "blue.600" : "gray.600"}
            _hover={{ color: "blue.600", cursor: "pointer" }}
            onClick={() => handleLinkClick("Academics")}
            // icon={<ChevronDownIcon />}
          >
            Academics
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLinkClick("Departments")}>
              Departments
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("Programs")}>
              Programs
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("Faculty")}>
              Faculty
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex align="center" gap={4}>
        <Button
          display={{ base: "none", md: "inline-flex" }}
          colorScheme="blue"
          borderRadius="full"
        >
          Apply Now
        </Button>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={<FaBars />}
            aria-label="Open menu"
            variant="outline"
            colorScheme="blue"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
