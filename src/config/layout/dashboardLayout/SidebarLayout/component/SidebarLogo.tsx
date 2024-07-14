import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../../constant/routes";
import store from "../../../../../store/store";
import { headerHeight } from "../../../../constant/variable";

const SidebarLogo = observer(() => {
  const {
    layout: { isCallapse },
    themeStore: { themeConfig },
  } = store;
  const navigate = useNavigate();
  // "linear-gradient(to right, #ff9d01, #ffaa01)"
  return (
    <Flex
      bgColor={useColorModeValue(
        themeConfig.colors.custom.light.primary,
        themeConfig.colors.custom.dark.primary
      )}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height={headerHeight}
    >
      <Box cursor="pointer" onClick={() => navigate(dashboard.home)}>
        {isCallapse ? (
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
