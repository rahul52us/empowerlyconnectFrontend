import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../../constant/routes";
import store from "../../../../../store/store";
import { headerHeight } from "../../../../constant/variable";

const SidebarLogo = observer(() => {
  const {
    layout: { mediumScreenMode },
  } = store;
  const navigate = useNavigate();
  return (
    <Flex
      mb={3}
      bgGradient="linear-gradient(to right, #ff9d01, #ffaa01)"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height={headerHeight}
    >
      <Box cursor="pointer" onClick={() => navigate(dashboard.home)}>
        {mediumScreenMode ? (
          <Text fontWeight={600}>TF</Text>
        ) : (
          <Image
            src="https://themefisher.com/images/logo/logo.svg"
            alt=""
            mb={3}
          />
        )}
      </Box>
    </Flex>
  );
});

export default SidebarLogo;
