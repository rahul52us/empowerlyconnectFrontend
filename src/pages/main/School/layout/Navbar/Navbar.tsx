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
  useDisclosure,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa"; // Importing icons for theme toggle
import Logo from "./school_logo.png";
import { largeHeaderHeight } from "../common/constant";

const Header = ({ scrollToSection }: { scrollToSection: (section: string) => void }) => {
  const [activeLink, setActiveLink] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode(); // Destructure toggleColorMode from useColorMode

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    scrollToSection(link);
  };

  return (
    <Flex
      as="nav"
      align="center"
      p={4}
      justify="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md"
      height={largeHeaderHeight}
      transition="background-color 0.3s ease, box-shadow 0.3s ease"
    >
      <Image src={Logo} alt="School logo" objectFit="contain" h="4rem" ml={4} />

      <Flex
        gap={8}
        align="center"
        display={{ base: "none", md: "flex" }}
        fontWeight={500}
        color={colorMode === "dark" ? "white" : "gray.700"}
      >
        {["Home", "About", "Gallery", "Contact Us", "FAQ"].map((link) => (
          <Link
            key={link}
            fontSize="lg"
            position="relative"
            color={
              activeLink === link
                ? "teal.500"
                : colorMode === "dark"
                ? "gray.200"
                : "gray.600"
            }
            onClick={() => handleLinkClick(link)}
            _hover={{ color: "teal.800" }}
            _after={{
              content: '""',
              position: "absolute",
              width: activeLink === link ? "100%" : "0",
              height: "2px",
              bottom: "-4px",
              left: "0",
              bg: "teal.500",
              transition: "width 0.3s ease",
            }}
            cursor="pointer"
          >
            {link}
          </Link>
        ))}

        {/* Academics Dropdown */}
        <Menu>
          <MenuButton
            as={Text}
            fontSize="lg"
            fontWeight={500}
            position="relative"
            color={
              activeLink === "Academics"
                ? "teal.500"
                : colorMode === "dark"
                ? "gray.200"
                : "gray.600"
            }
            _hover={{ color: "teal.800" }}
            _after={{
              content: '""',
              position: "absolute",
              width: activeLink === "Academics" ? "100%" : "0",
              height: "2px",
              bottom: "-4px",
              left: "0",
              bg: "teal.500",
              transition: "width 0.3s ease",
            }}
            cursor="pointer"
          >
            Academics
          </MenuButton>
          <MenuList
            bg={colorMode === "dark" ? "gray.700" : "white"}
            borderRadius="md"
            shadow="lg"
            p={2}
          >
            {["Departments", "Programs", "Principal", "Teachers"].map((subLink) => (
              <MenuItem
                key={subLink}
                onClick={() => handleLinkClick(subLink)}
                _hover={{ bg: colorMode === "dark" ? "gray.600" : "teal.50" }}
                borderRadius="md"
                px={4}
              >
                {subLink}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <Flex align="center" gap={4}>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} // Toggle between sun and moon icons
          onClick={toggleColorMode}
          variant="outline"
          colorScheme="teal"
          size="lg"
          rounded="full"
        />

        <Button
          display={{ base: "none", md: "inline-flex" }}
          colorScheme="teal"
          borderRadius="full"
          boxShadow="md"
          _hover={{
            bg: "teal.600",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          }}
          px={6}
          onClick={() => handleLinkClick("Contact Us")}
        >
          Apply Now
        </Button>

        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={<FaBars />}
            aria-label="Open menu"
            variant="outline"
            colorScheme="blue"
            onClick={onOpen}
            _hover={{ bg: "blue.100" }}
          />
        </Box>
      </Flex>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === "dark" ? "gray.800" : "white"}>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={4} p={4}>
              <Text fontSize="xl" fontWeight="bold" color={colorMode === "dark" ? "white" : "black"}>
                Main Menu
              </Text>
              {["Home", "About", "Gallery", "FAQ", "Contact Us"].map((link) => (
                <Link
                  key={link}
                  fontSize="lg"
                  color={activeLink === link ? "teal.500" : colorMode === "dark" ? "gray.200" : "gray.700"}
                  onClick={() => {
                    handleLinkClick(link);
                    onClose();
                  }}
                  _hover={{
                    color: "teal.600",
                    transition: "color 0.3s ease",
                  }}
                  cursor="pointer"
                >
                  {link}
                </Link>
              ))}

              <Text fontSize="xl" fontWeight="bold" color={colorMode === "dark" ? "white" : "black"}>
                Academics
              </Text>
              <Stack spacing={2} ml={4}>
                {["Departments", "Programs", "Principal", "Teachers"].map((subLink) => (
                  <Link
                    key={subLink}
                    fontSize="lg"
                    color={colorMode === "dark" ? "gray.200" : "gray.700"}
                    onClick={() => {
                      handleLinkClick(subLink);
                      onClose();
                    }}
                    _hover={{
                      color: "teal.600",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {subLink}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
