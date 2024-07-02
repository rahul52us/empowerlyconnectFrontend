import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { sidebarData, sidebarFooterData } from "./SidebarItems";

export interface SidebarItem {
  id: number;
  name: string;
  icon: JSX.Element;
  url?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  isCollapsed: boolean;
  onItemClick: (item: SidebarItem) => void;
  onLeafItemClick: (item: SidebarItem) => void;
  openMobileSideDrawer: boolean;
  setOpenMobileSideDrawer: any;
}

const renderIcon = (depth: number, icon: JSX.Element) => {
  if (depth === 1) {
    return (
      <Text fontSize={"18px"} mr={2}>
        -
      </Text>
    );
  }
  if (depth > 1) {
    return (
      <Text fontSize={"18px"} mr={2}>
        ◦
      </Text>
    );
  }
  return <Icon as={icon.type} boxSize={5} />;
};

const findPathToActiveItem = (
  items: SidebarItem[],
  activeItemId: number
): number[] => {
  const path: number[] = [];

  const findPath = (
    items: SidebarItem[],
    id: number,
    currentPath: number[]
  ): boolean => {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.id === id) {
        path.push(...currentPath, index);
        return true;
      }
      if (item.children) {
        if (findPath(item.children, id, [...currentPath, index])) {
          return true;
        }
      }
    }
    return false;
  };

  findPath(items, activeItemId, []);
  return path;
};


const SidebarPopover: React.FC<{
  item: SidebarItem;
  depth: number;
  onClick: (item: SidebarItem) => void;
  onLeafClick: (item: SidebarItem) => void;
  isCollapsed: boolean;
  activeItemId: number | null;

}> = ({ item, depth, onClick, onLeafClick, isCollapsed, activeItemId }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  const handleMouseEnter = () => {
    if (item.children && item.children.length > 0 && isCollapsed) {
      setIsPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsPopoverOpen(false);
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopoverOpen(false);
    if (!item.children) {
      onLeafClick(item);
    } else {
      onClick(item);
    }
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={() => setIsPopoverOpen(false)}
      placement="right-start"
      closeOnBlur={false}
      trigger="hover"
    >
      <PopoverTrigger>
        <Flex
          align={"center"}
          width={"100%"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleItemClick}
        >
          <Flex
            align="center"
            justify={depth === 0 ? "center" : "unset"}
            width={"100%"}
            cursor="pointer"
            py={depth === 0 ? 3 : 1}
            color={activeItemId === item.id ? "teal.400" : "inherit"}
            fontWeight={activeItemId === item.id ? "600" : "inherit"}
            _hover={{ color: "teal.400" }}
          >
            {renderIcon(depth, item.icon)}
            {depth > 0 && (
              <Flex flex={1} align={"center"} justify={"space-between"}>
                <Text ml={2}>{item.name}</Text>
                {item.children && <ChevronRightIcon ml={2} />}
              </Flex>
            )}
          </Flex>
        </Flex>
      </PopoverTrigger>
      {item.children && (
        <Portal>
          <PopoverContent zIndex={15} w={"200px"}
            onMouseEnter={handleMouseEnter}
          >
            <PopoverArrow />
            <PopoverHeader bg={"blue.50"}>
              <Flex
                align="center"
                justify="space-between"
                width="100%"
                pl={2}
                my={0}
                cursor="pointer"
              >
                <Flex align="center" py={0}>
                  <Text color={"teal.700"} fontSize="19px" fontWeight={600} ml={depth === 0 ? 5 : 2}>
                    {item.name}
                  </Text>
                </Flex>
                {item.children && <ChevronDownIcon color={"teal.700"} fontSize="19px" fontWeight={600} />}
              </Flex>
            </PopoverHeader>
            <PopoverBody>
              <VStack align="start" spacing={1}>
                {item.children.map((child) => (
                  <SidebarPopover
                    key={child.id}
                    item={child}
                    depth={depth + 1}
                    onClick={onClick}
                    onLeafClick={onLeafClick}
                    isCollapsed={isCollapsed}
                    activeItemId={activeItemId}
                  />
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      )}
    </Popover>
  );
};

const SidebarAccordion: React.FC<{
  items: SidebarItem[];
  depth?: number;
  onClick: (item: SidebarItem) => void;
  onLeafClick: (item: SidebarItem) => void;
  activeItemId: number | null;
  expandedPath: number[];
}> = ({
  items,
  depth = 0,
  onClick,
  onLeafClick,
  activeItemId,
  expandedPath
}) => {
    // Determine the index to expand based on the depth and expandedPath
    const expandedIndex = expandedPath.length > depth ? expandedPath[depth] : null;

    return (
      <Accordion
        width={"100%"}
        px={3}
        allowMultiple
        defaultIndex={expandedIndex !== null ? [expandedIndex] : []}
      >
        {items.map((item) => {
          return (
            <AccordionItem key={item.id} border="none" width={"100%"}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    my={1.5}
                    px={1}
                    borderRadius={"10px"}
                    bg={isExpanded ? "blue.50" : "transparent"}
                    color={isExpanded ? "teal.700" : "inherit"}
                    fontWeight={isExpanded ? "600" : "inherit"}
                    _hover={{
                      bg: "blue.50",
                      color: "teal.700",
                      fontWeight: "600",
                      boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the accordion from closing the sidebar
                      if (!item.children) {
                        onLeafClick(item);
                      } else {
                        onClick(item);
                      }
                    }}
                  >
                    <Flex
                      align="center"
                      justify="space-between"
                      width="100%"
                      pl={2}
                      my={0}
                      cursor="pointer"
                      color={activeItemId === item.id ? "teal.400" : "inherit"}
                      fontWeight={activeItemId === item.id ? "600" : "inherit"}
                    >
                      <Flex align="center">
                        {renderIcon(depth, item.icon)}
                        <Text fontSize="18px" ml={depth === 0 ? 5 : 2}>
                          {item.name}
                        </Text>
                      </Flex>
                      {item.children && <AccordionIcon />}
                    </Flex>
                  </AccordionButton>
                  {item.children && (
                    <AccordionPanel pl={4} pr={0} pb={0} mt={"-5px"}>
                      <VStack align="start" spacing={0}>
                        <SidebarAccordion
                          items={item.children}
                          depth={depth + 1}
                          onClick={onClick}
                          onLeafClick={onLeafClick}
                          activeItemId={activeItemId}
                          expandedPath={expandedPath}
                        />
                      </VStack>
                    </AccordionPanel>
                  )}
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };


const Sidebar1: React.FC<SidebarProps> = ({
  isCollapsed,
  onItemClick,
  onLeafItemClick,
  openMobileSideDrawer,
  setOpenMobileSideDrawer,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue("gray.200", "gray.700");

  const [activeItemId, setActiveItemId] = useState<number | null>(() => {
    const storedActiveItemId = localStorage.getItem("activeSidebarItemId");
    return storedActiveItemId ? parseInt(storedActiveItemId, 10) : 1;
  });

  useEffect(() => {
    if (activeItemId !== null) {
      localStorage.setItem("activeSidebarItemId", activeItemId.toString());
    }
  }, [activeItemId]);

  const handleLeafItemClick = (item: SidebarItem) => {
    setActiveItemId(item.id);
    onLeafItemClick(item);
  };

  if (!isMobile) {
    setOpenMobileSideDrawer(false);
  }

  const expandedPath = activeItemId !== null ? findPathToActiveItem(sidebarData, activeItemId) : [];

  return (
    <>
      <Drawer
        isOpen={openMobileSideDrawer}
        placement="left"
        onClose={setOpenMobileSideDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom={"1px solid"}>
            <Flex align="center">
              <Image src="/img/short-logo.png" alt="Logo" boxSize="50px" />
              <Text color={"#25215A"} fontSize="2xl" fontWeight="700" ml={4}>
                SequelString
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody px={2} className="customScrollBar">
            <SidebarAccordion
              items={sidebarData}
              onClick={onItemClick}
              onLeafClick={handleLeafItemClick}
              activeItemId={activeItemId}
              expandedPath={expandedPath}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {!isMobile && (
        <Box
          pos={"fixed"}
          top={0}
          bottom={0}
          left={0}
          width={isCollapsed ? "80px" : "280px"}
          minH={"100vh"}
          transition="width 0.3s"
          color="gray.700"
          zIndex={10}
          bg={"white"}
          borderRight="1px"
          boxShadow="rgb(0 0 0 / 20%) 0px 0px 11px"
          borderRightColor={borderColor}
          className="customScrollBar"
        >
          <Box
            position="sticky"
            top={0}
            zIndex={11}
            bg={"white"}
            borderBottom={"1px solid"}
            borderBottomColor={headerBgColor}
            boxShadow="0px 10px 10px -10px rgba(0, 0, 0, 0.1)"
          >
            <Flex align="center" overflow={"hidden"} p={4}>
              <Image src="/img/short-logo.png" alt="Logo" boxSize="50px" />
              <Text color={"#25215A"} fontSize="2xl" fontWeight="700" ml={4}>
                SequelString
              </Text>
            </Flex>
          </Box>
          <Box
            overflowY="auto"
            overflowX={"hidden"}
            className="customScrollBar"
            py={6}
            // bg={"gray.50"}
            height="calc(100vh - 165px)" // Adjust based on the height of your header
          >
            {isCollapsed ? (
              <VStack align="start" spacing={3}>
                {sidebarData.map((item) => (
                  <SidebarPopover
                    key={item.id}
                    item={item}
                    depth={0}
                    onClick={onItemClick}
                    onLeafClick={handleLeafItemClick}
                    isCollapsed={isCollapsed}
                    activeItemId={activeItemId}
                  />
                ))}
              </VStack>
            ) : (
              <SidebarAccordion
                items={sidebarData}
                onClick={onItemClick}
                onLeafClick={handleLeafItemClick}
                activeItemId={activeItemId}
                expandedPath={expandedPath}
              />
            )}
          </Box>
          <Box
            position="fixed"
            bottom={0}
            left={0}
            width={isCollapsed ? "79px" : "279px"}
            transition="width 0.3s"
            py={4}
            zIndex={11}
            overflowX={"hidden"}
            // bg={"gray.100"}
          >
            {isCollapsed ? (
              <VStack align="start" spacing={3}>
                {sidebarFooterData.map((item) => (
                  <SidebarPopover
                    key={item.id}
                    item={item}
                    depth={0}
                    onClick={onItemClick}
                    onLeafClick={handleLeafItemClick}
                    isCollapsed={isCollapsed}
                    activeItemId={activeItemId}
                  />
                ))}
              </VStack>
            ) : (
              <SidebarAccordion
                items={sidebarFooterData}
                onClick={onItemClick}
                onLeafClick={handleLeafItemClick}
                activeItemId={activeItemId}
                expandedPath={expandedPath}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Sidebar1;
