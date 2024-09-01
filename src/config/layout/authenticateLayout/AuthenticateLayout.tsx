import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "../../../store/store";
import Loader from "../../component/Loader/Loader";
import { authentication } from "../../constant/routes";

const AuthenticateLayout = observer(() => {
  const { pathname } = useLocation();
  const {
    auth: { restoreUser },
  } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (restoreUser()) {
      navigate("/");
    }
  }, [navigate, restoreUser]);

  // Using theme values for background colors and text colors
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const imageSrc = "https://decisive-attraction-317cbbe3f7.media.strapiapp.com/Document_Verification_illustration_2e81eb006f.svg"

  return (
    !pathname.includes(authentication.createOrganisationStep1) ? (
      <Flex
        minH="100vh"
        direction={{ base: "column", md: "row" }}
        bg={bgColor}
        overflow="hidden"
      >
        {/* Left Section with Image */}
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: 6, md: 8 }}
        >
          <Image
            src={imageSrc}
            alt="Login Illustration"
            objectFit="contain"
            width="100%"
            height="auto"
            maxWidth="90%"
            maxHeight="90%"
          />
        </Box>

        {/* Right Section with Content */}
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          p={{ base: 6, md: 12 }}
        >
          <VStack spacing={6} minW="xl" align="flex-start">
            <Box width="100%">
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </Box>
          </VStack>
        </Flex>
      </Flex>
    ) : (
      <Outlet />
    )
  );
});

export default AuthenticateLayout;
