import { Box,Image } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
// import Logo from "../../../../../assets/icon_images/Logo.jpg";

const HeaderLogo = observer(() => {
  return (
    <Box p={5}>
      <Image src='https://themefisher.com/images/logo/logo.svg' alt="" mb={3} />
      {/* <Heading color="blue.400">LOGO</Heading> */}
    </Box>
  );
});

export default HeaderLogo;
