import { Center, Flex, Box, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import SpinnerLoader from "./SpinnerLoader";

// it handle loader and it's children for the drawer
const DrawerLoader = observer(
  ({
    loading,
    children,
    noRecordFoundText = false,
  }: {
    loading?: boolean;
    children: React.ReactNode;
    noRecordFoundText?: boolean;
  }) => {
    return (
      <>
        {loading ? (
          <Center height="100%">
            <Flex alignItems="center" justifyContent="center">
              <Box p={4} mt={"40vh"}>
                <SpinnerLoader />
              </Box>
            </Flex>
          </Center>
        ) : noRecordFoundText ? (
          <Center height="100%">
            <Flex alignItems="center" justifyContent="center">
              <Box p={4} mt={"40vh"}>
                 <Text>No Such Records Are Found</Text>
              </Box>
            </Flex>
          </Center>
        ) : (
          <>{children}</>
        )}
      </>
    );
  }
);

export default DrawerLoader;
