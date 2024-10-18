import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import {
  WebLargeScreenHeaderHeight,
  WebSmallScreenHeaderHeight,
  headerHeight,
} from "../../constant/variable";
import { observer } from "mobx-react-lite";
import { useColorModeValue, useMediaQuery, useTheme } from "@chakra-ui/react";
import styled from "styled-components";
import FooterLayout from "../MainLayout/FooterLayout/FooterLayout";

const WebLayout = observer(() => {
  const theme = useTheme();
  const location = useLocation();
  const [sizeStatus] = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);

  // Scroll to top when the location changes (new page is opened)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      style={{
        backgroundColor: useColorModeValue("#ffffff", "#1A202C"),
      }}
    >
      <ContentContainer sizeStatus={sizeStatus}>
        <Suspense fallback={<Loader height="90vh" />}>
          <Outlet />
        </Suspense>
        <FooterLayout />
      </ContentContainer>
    </div>
  );
});

const ContentContainer = styled.div<{ sizeStatus: Boolean }>`
  margin-top: ${({ sizeStatus }) =>
    sizeStatus ? WebSmallScreenHeaderHeight : WebLargeScreenHeaderHeight};
  overflow-x: hidden;
  /* height: calc(100vh - ${headerHeight}); */
  transition: all 0.3s ease-in-out;
  &.fullscreen {
    width: 100vw;
    transition: width 0.3s ease-in-out;
  }
`;

export default WebLayout;