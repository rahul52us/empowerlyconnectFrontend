import { useState, useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AiFillDashboard } from "react-icons/ai";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "../../../../../store/store";

interface SidebarElementI {
  items: any;
}

const SidebarElement = observer(({ items }: SidebarElementI) => {
  const { layout: { mediumScreenMode } } = store;
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.submenus) {
      setDropdownOpen(false);
      setSelected(false);
      items.submenus.forEach((submenu: any) => {
        if (location.pathname === submenu.path) {
          setSelected(true);
          setDropdownOpen(true)
        }
      });
    }
  }, [location.pathname, items.submenus]);

  useEffect(() => {
    if (parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      setSubmenuPosition({
        top: parentRect.top,
        left:mediumScreenMode ?  72 : 230,
      });
    }

    // Add event listener to detect clicks outside the submenu
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mediumScreenMode]); // Update submenu position when mediumScreenMode changes

  const handleClickOutside = (event: MouseEvent) => {
    // Close the submenu if the click occurs outside of it
    if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleToggleDropdown = () => {
    if (items.submenus) {
      setDropdownOpen((prevState) => !prevState);
      setSelected(true);
    }
  };

  const handleCloseSubmenu = () => {
    setDropdownOpen(false);
  };

  return (
    <Box
      ref={parentRef}
      borderBottom="1px solid #021933"
      minH={35}
      display="Box"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        pr={3}
        pl={3}
        cursor="pointer"
        onClick={handleToggleDropdown}
        bg={isSelected ? "#042954" : "initial"}
      >
        <NavLink
          to={items.submenus ? "#" : items.path}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Flex alignItems="center">
            {mediumScreenMode && <AiFillDashboard color="white" fontSize="1.5rem" style={{marginLeft : (!mediumScreenMode || items.submenus) ? '2px' : '8px'}}/>}
            {!mediumScreenMode && <Text ml={2} color="white">{items.label}</Text>}
          </Flex>
        </NavLink>
        {items.submenus &&
          (isDropdownOpen ? (
            <RiArrowDropDownLine fontSize="1.8rem" color="white" />
          ) : (
            <RiArrowDropRightLine fontSize="1.8rem" color="white" />
          ))}
      </Flex>
      {items.submenus && isDropdownOpen && (
        <Box
          position="fixed"
          top={`${submenuPosition.top}px`}
          left={`${submenuPosition.left}px`}
          zIndex="10"
          backgroundColor="#051f3e"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          minWidth="200px"
        >
          {items.submenus.map((submenu: any, index: number) => (
            <NavLink
              key={index}
              to={submenu.path}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleCloseSubmenu}
            >
              <Flex
                alignItems="center"
                p={2}
                _hover={{
                  backgroundColor: "#042954",
                  transition: "background-color 0.3s ease",
                }}
                bg={location.pathname === submenu.path ? "#042954" : "initial"}
              >
                <RiArrowDropRightLine fontSize="1.8rem" color="white" />
                <Text ml={2} color="white">{submenu.label}</Text>
              </Flex>
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default SidebarElement;