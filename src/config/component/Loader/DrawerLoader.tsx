import { Center, Flex, Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import SpinnerLoader from "./SpinnerLoader";

// it handle loader and it's children for the drawer
const DrawerLoader = observer(({ loading, children }: { loading: boolean; children: React.ReactNode; }) => {
  return (
    <>
      {loading ? (
        <Center height="100%">
          <Flex alignItems="center">
            <Box p={4}>
              <SpinnerLoader />
            </Box>
          </Flex>
        </Center>
      ) : (
        <>{children}</>
      )}
    </>
  );
});

export default DrawerLoader;
