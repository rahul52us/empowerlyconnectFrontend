import { Box } from "@chakra-ui/react";

const DrawerFormHeightContainer = ({ children }: any) => {
  return (
    <Box minH={"81vh"} maxH={"81vh"} overflowY={"auto"}>
      {children}
    </Box>
  );
};

export default DrawerFormHeightContainer;
