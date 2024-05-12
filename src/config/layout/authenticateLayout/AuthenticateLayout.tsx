import {
  Box,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "../../../store/store";
import Loader from "../../component/Loader/Loader";
import { authentication } from "../../constant/routes";

const AuthenticateLayout = observer(() => {
  const {pathname} = useLocation()
  const {
    auth: { restoreUser },
  } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (restoreUser()) {
      navigate("/");
    }
  }, [navigate, restoreUser]);
  return (
    !pathname.includes(authentication.createOrganisationStep1) ?
    <Grid minH={"100vh"}>
      <Flex
        flexDirection="column"
        minH="100vh"
        w="100%"
      >
        <Box m="auto" width={{ base: "95%", sm : '80%', md : "60%", xl: "35%" }}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </Grid> :
    <Outlet />
  );
});

export default AuthenticateLayout;
