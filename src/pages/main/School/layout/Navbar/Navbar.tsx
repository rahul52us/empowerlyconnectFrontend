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
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import Logo from "./school_logo.png";
import { largeHeaderHeight } from "../common/constant";

const Header = ({  scrollToSection, linksConfig = [] }: any) => {
  const [activeLink, setActiveLink] = useState("home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLinkClick = (linkId: any) => {
    setActiveLink(linkId);
    scrollToSection(linkId);
  };

  const dropdownMenuColor = useColorModeValue("white", "gray.700")

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
        {linksConfig.slice(0, 5).map((link: any) => {
          const linkConfig = linksConfig.find(
            (item: any) => item.id === link.id
          );
          return (
            <Link
              key={link.id}
              fontSize="lg"
              position="relative"
              color={
                activeLink === link.id
                  ? "teal.500"
                  : colorMode === "dark"
                  ? "gray.200"
                  : "gray.600"
              }
              onClick={() => handleLinkClick(link.id)}
              _hover={{ color: "teal.800" }}
              _after={{
                content: '""',
                position: "absolute",
                width: activeLink === link.id ? "100%" : "0",
                height: "2px",
                bottom: "-4px",
                left: "0",
                bg: "teal.500",
                transition: "width 0.3s ease",
              }}
              cursor="pointer"
            >
              {linkConfig.name.charAt(0).toUpperCase() +
                linkConfig.name.slice(1)}
            </Link>
          );
        })}

        <Menu>
          <MenuButton
            as={Text}
            fontSize="lg"
            fontWeight={500}
            position="relative"
            color={colorMode === "dark" ? "gray.200" : "gray.600"}
            _hover={{ color: "teal.800", bg: "teal.100", borderRadius: "md" }}
            px={3}
            py={1}
            borderRadius="md"
            cursor="pointer"
            display={linksConfig?.length > 4 ? undefined : "none"}
          >
            More
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.700")}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            boxShadow="lg"
            rounded="md"
            minW="150px"
            mt={2}
            p={1}
            overflow="hidden"
            transformOrigin="top center"
            transition="all 0.2s ease-in-out"
          >
            {linksConfig.slice(5).map((link: any) => {
              const linkConfig = linksConfig.find(
                (item: any) => item.id === link.id
              );
              if (linkConfig) {
                return (
                  <MenuItem
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    bg={dropdownMenuColor}
                    _hover={{ bg: "teal.100", color: "teal.800" }}
                    px={4}
                    py={2}
                    borderRadius="md"
                    fontWeight="500"
                  >
                    {linkConfig.name.charAt(0).toUpperCase() +
                      linkConfig.name.slice(1)}
                  </MenuItem>
                );
              }
              return null;
            })}
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
          mr={{ base: 2, md: 5 }}
        />

        <IconButton
          icon={<FaBars style={{ marginLeft: "10px" }} />}
          aria-label="Open menu"
          variant="outline"
          colorScheme="teal"
          onClick={onOpen}
          display={{ md: "none" }}
        />
        {linksConfig.find((link: any) => link.id === "contact") && (
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
            {linksConfig.find((link: any) => link.id === "contact").name}
          </Button>
        )}
      </Flex>

      {/* Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={4} mt={4}>
              {linksConfig.map((link: any) => {
                const linkConfig = linksConfig.find(
                  (item: any) => item.id === link.id
                );
                if (linkConfig) {
                  return (
                    <Button
                      key={link.id}
                      w="full"
                      onClick={() => {
                        handleLinkClick(link.id);
                        onClose();
                      }}
                    >
                      {linkConfig.name}
                    </Button>
                  );
                }
                return null;
              })}

              <Menu>
                <MenuButton as={Button} w="full">
                  Academics
                </MenuButton>
                <MenuList>
                  {linksConfig.slice(5).map((link: any) => {
                    const linkConfig = linksConfig.find(
                      (item: any) => item.id === link.id
                    );
                    if (linkConfig && !linkConfig.isButton) {
                      return (
                        <MenuItem
                          key={link.id}
                          onClick={() => handleLinkClick(link.id)}
                        >
                          {linkConfig.name}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
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
