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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "./school_logo.png";
import { largeHeaderHeight } from "../common/constant";

const Navbar = ({
  scrollToSection,
}: {
  scrollToSection: (section: string) => void;
}) => {
  const [activeLink, setActiveLink] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    scrollToSection(link);
  };

  return (
    <Flex
      as="nav"
      align="center"
      p={4}
      borderBottom="2px solid"
      borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
      justify="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={colorMode === "dark" ? "gray.800" : "white"}
      boxShadow="md"
      height={largeHeaderHeight}
      transition="background-color 0.3s ease"
    >
      <Image src={Logo} alt="School logo" objectFit="contain" h="4rem" />

      <Flex
        gap={8}
        display={{ base: "none", md: "flex" }}
        fontWeight={500}
        color={colorMode === "dark" ? "white" : "gray.700"}
      >
        {["Home", "About", "Admissions", "Gallery", "Contact Us"].map((link) => (
          <Link
            key={link}
            fontSize="lg"
            color={activeLink === link ? "blue.400" : colorMode === "dark" ? "gray.200" : "gray.600"}
            onClick={() => handleLinkClick(link)}
            _hover={{
              color: "blue.500",
              textDecoration: "underline",
              transition: "color 0.3s ease",
            }}
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
            color={activeLink === "Academics" ? "blue.400" : colorMode === "dark" ? "gray.200" : "gray.600"}
            _hover={{
              color: "blue.500",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Academics
          </MenuButton>
          <MenuList bg={colorMode === "dark" ? "gray.700" : "white"}>
            <MenuItem onClick={() => handleLinkClick("Departments")}>
              Departments
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("Programs")}>
              Programs
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("Principal")}>
              Principal
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("Teachers")}>
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
          boxShadow="md"
          _hover={{
            bg: "blue.600",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          }}
          px={6}
          onClick={() => handleLinkClick('Contact Us')}
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
            <Stack spacing={6} p={4}>
              {["Home", "About", "Admissions", "Gallery", "Contact Us"].map(
                (link) => (
                  <Link
                    key={link}
                    fontSize="xl"
                    color={activeLink === link ? "blue.400" : colorMode === "dark" ? "gray.200" : "gray.700"}
                    onClick={() => {
                      handleLinkClick(link);
                      onClose();
                    }}
                    _hover={{
                      color: "blue.500",
                      textDecoration: "underline",
                      transition: "color 0.3s ease",
                    }}
                    cursor="pointer"
                  >
                    {link}
                  </Link>
                )
              )}

              <Text fontSize="xl" color={colorMode === "dark" ? "gray.200" : "gray.700"} fontWeight={500}>
                Academics
              </Text>
              <Stack spacing={2} ml={4}>
                <Link
                  fontSize="lg"
                  color={colorMode === "dark" ? "gray.200" : "gray.700"}
                  onClick={() => {
                    handleLinkClick("Departments");
                    onClose();
                  }}
                >
                  Departments
                </Link>
                <Link
                  fontSize="lg"
                  color={colorMode === "dark" ? "gray.200" : "gray.700"}
                  onClick={() => {
                    handleLinkClick("Programs");
                    onClose();
                  }}
                >
                  Programs
                </Link>
                <Link
                  fontSize="lg"
                  color={colorMode === "dark" ? "gray.200" : "gray.700"}
                  onClick={() => {
                    handleLinkClick("Principal");
                    onClose();
                  }}
                >
                  Principal
                </Link>
                <Link
                  fontSize="lg"
                  color={colorMode === "dark" ? "gray.200" : "gray.700"}
                  onClick={() => {
                    handleLinkClick("Teachers");
                    onClose();
                  }}
                >
                  Faculty
                </Link>
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
