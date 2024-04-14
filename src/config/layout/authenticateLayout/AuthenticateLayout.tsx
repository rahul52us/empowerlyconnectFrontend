import {
  Grid
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../store/store";
import Newsignup from "./Newsignup";

const AuthenticateLayout = observer(() => {
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
    <Grid minH={"100vh"}>
      <Newsignup />
      {/* <Flex
        flexDirection="column"
        minH="100vh"
        w="100%"
        bg={useColorModeValue("yellow", "gray.800")}
      >
        <Box m="auto" width={{ base: "95%", sm: "60%" }}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Flex> */}
    </Grid>
  );
});

export default AuthenticateLayout;
