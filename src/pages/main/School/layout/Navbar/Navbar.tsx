import {
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
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import Logo from "./school_logo.png";
import { largeHeaderHeight } from "../common/constant";

const Header = ({ scrollToSection }: { scrollToSection: (section: string) => void }) => {
  const [activeLink, setActiveLink] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
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
        {["home", "about", "gallery", "contact", "faq"].map((link) => (
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
            {link.charAt(0).toUpperCase() + link.slice(1)} {/* Capitalize first letter */}
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
              activeLink === "academics"
                ? "teal.500"
                : colorMode === "dark"
                ? "gray.200"
                : "gray.600"
            }
            _hover={{ color: "teal.800" }}
            _after={{
              content: '""',
              position: "absolute",
              width: activeLink === "academics" ? "100%" : "0",
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
          <MenuList>
            <MenuItem onClick={() => handleLinkClick("curriculum")}>
              Curriculum
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("teachers")}>
              Teachers
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex align="center">
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
          variant="outline"
          colorScheme="teal"
          mr={{base : 2, md : 5}}
        />

        <IconButton
          icon={<FaBars style={{marginLeft : '10px'}}/>}
          aria-label="Open menu"
          variant="outline"
          colorScheme="teal"
          onClick={onOpen}
          display={{ md: "none" }}
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
          onClick={() => handleLinkClick("contact")}
        >
          Apply Now
        </Button>
      </Flex>

      {/* Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={4} mt={4}>
              {["home", "about", "gallery", "contact", "faq"].map((link) => (
                <Button
                  key={link}
                  w="full"
                  onClick={() => {
                    handleLinkClick(link);
                    onClose();
                  }}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Button>
              ))}

              <Menu>
                <MenuButton as={Button} w="full">
                  Academics
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleLinkClick("curriculum")}>
                    Curriculum
                  </MenuItem>
                  <MenuItem onClick={() => handleLinkClick("teachers")}>
                    Teachers
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
