import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Divider,
  Box,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import store from "../../../../../../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { authentication, main } from "../../../../../../constant/routes";
import {
  FaCog,
  FaLock,
  FaPalette,
  FaSignOutAlt,
  FaUser,
  FaKey,
  FaHome,
} from "react-icons/fa";

const HeaderProfile = observer(() => {
  const { pathname } = useLocation();
  const {
    auth: { user, doLogout },
    themeStore: { setOpenThemeDrawer },
  } = store;
  const navigate = useNavigate();

  return user ? (
    <Menu closeOnSelect={false} placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="User Menu"
        icon={
          <Avatar
            src={user?.pic}
            width="45px"
            height="45px"
            borderRadius={'full'}
            name={user?.name}
          />
        }
        size="sm"
        variant="ghost"
      />
      <MenuList
        minWidth="220px"
        boxShadow="md"
        borderRadius="md"
        zIndex={10}
        p={2}
      >
        <VStack spacing={2}>
          <Box textAlign="center">
            <Avatar src={user?.pic} size="lg" name={user?.name} />
            <Text mt={2} fontWeight="bold">
              {user?.name}
            </Text>
          </Box>
          <Divider />
          {user && pathname !== main.home && (
            <MenuItem onClick={() => navigate(main.home)}>
              <FaHome style={{ marginRight: "8px" }} /> Home
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate(main.profile)}>
            <FaCog style={{ marginRight: "8px" }} /> Profile Settings
          </MenuItem>
          <MenuItem onClick={() => navigate(main.changePassword)}>
            <FaLock style={{ marginRight: "8px" }} /> Change Password
          </MenuItem>
          <MenuItem onClick={setOpenThemeDrawer}>
            <FaPalette style={{ marginRight: "8px" }} /> Customize Theme
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              doLogout();
              navigate(authentication.login);
            }}
            // colorScheme="red"
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  ) : (
    <Menu closeOnSelect={false} placement="bottom-end">
      <MenuButton variant="ghost" border="2px solid" as={Button}>Login</MenuButton>
      <MenuList minWidth="220px" boxShadow="md" borderRadius="md" zIndex={10} p={2}>
        <VStack spacing={2}>
          <MenuItem onClick={() => navigate(authentication.login)}>
            <FaUser style={{ marginRight: "8px" }} /> Login
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate(authentication.createOrganisationStep1)}>
            <FaKey style={{ marginRight: "8px" }} /> Create New Account
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  );
});

export default HeaderProfile;
