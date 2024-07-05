import { useEffect } from "react";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import {
  contentLargeBodyPadding,
  contentSmallBodyPadding,
  headerHeight,
  mediumSidebarWidth,
  sidebarWidth,
} from "../../constant/variable";
import Loader from "../../component/Loader/Loader";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import styled from "styled-components";
import SidebarLayout from "./SidebarLayout/SidebarLayout";
import { useColorModeValue, useMediaQuery, useTheme } from "@chakra-ui/react";

const RedirectComponent = observer(() => {
  const navigate = useNavigate();
  const {
    auth: { restoreUser },
  } = store;
  useEffect(() => {
    if (!restoreUser()) {
      navigate("/login");
    }
  }, [navigate, restoreUser]);
  return <></>;
});

const DashboardLayout = observer(() => {
  const {
    auth: { restoreUser, user },
    layout: { fullScreenMode, mediumScreenMode },
    themeStore: { themeConfig },
  } = store;
  const navigate = useNavigate();
  const theme = useTheme();

  const [sizeStatus] = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);

  useEffect(() => {
    if (!restoreUser()) {
      navigate("/login");
    }
  }, [restoreUser, navigate]);

  return user ? (
    <MainContainer>
      <SidebarContainer
        fullScreenMode={fullScreenMode}
        className={
          fullScreenMode ? "fullscreen" : mediumScreenMode ? "mediumScreen" : ""
        }
      >
        <SidebarLayout />
      </SidebarContainer>
      <Container fullScreenMode={fullScreenMode}>
        <HeaderContainer
          className={
            fullScreenMode
              ? "fullscreen"
              : mediumScreenMode
              ? "mediumScreen"
              : ""
          }
          sizeStatus={sizeStatus}
          mediumScreenMode={mediumScreenMode}
          fullScreenMode={fullScreenMode}
          backgroundColor={useColorModeValue(
            themeConfig.colors.custom.light.primary,
            themeConfig.colors.custom.dark.primary
          )}
        >
          <HeaderLayout />
        </HeaderContainer>
        <ContentContainer
          mediumScreenMode={mediumScreenMode}
          className={
            fullScreenMode
              ? "fullscreen"
              : mediumScreenMode
              ? "mediumScreen"
              : ""
          }
          fullScreenMode={fullScreenMode}
          sizeStatus={sizeStatus}
        >
          <Suspense fallback={<Loader height="90vh" />}>
            <Outlet />
          </Suspense>
        </ContentContainer>
      </Container>
    </MainContainer>
  ) : (
    <RedirectComponent />
  );
});

export default DashboardLayout;

const MainContainer = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &.fullscreen {
    margin-left: -${sidebarWidth};
  }

  &.mediumscreen {
    margin-left: -${mediumSidebarWidth};
  }
`;
const SidebarContainer = styled.div<{ fullScreenMode: boolean }>`
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: ${sidebarWidth};
  display: inline;
  border-right: "1px solid red";
  background-color: blue;
  &.fullscreen {
    width: 0;
    transition: width 0.3s ease-in-out;
  }
  &.mediumscreen {
    width: ${sidebarWidth};
    transition: width 0.3s ease-in-out;
  }
`;

const Container = styled.div<{ fullScreenMode: boolean }>`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  &.fullscreen {
    margin-left: 0;
  }
  &.mediumscreen {
    margin-left: ${sidebarWidth};
  }
`;

const HeaderContainer = styled.div<{
  fullScreenMode: boolean;
  sizeStatus: boolean;
  mediumScreenMode: boolean;
  backgroundColor: any;
}>`
    height: ${headerHeight};
    border-bottom:'1px solid black'
    position: fixed;
    top:0;
    right: 0;
    background-color:${(props) => props.backgroundColor};
    left: ${(props) =>
      props.fullScreenMode || props.sizeStatus
        ? 0
        : props.mediumScreenMode
        ? mediumSidebarWidth
        : sidebarWidth};
    transition: all 0.3s ease-in-out;

    &.fullscreen {
      left: 0;
      width: 100%;
      transition: left 0.3s ease-in-out;
    }
    &.mediumscreen {
      left: 72;
      width: 100%;
      transition: left 0.3s ease-in-out;
    }
  `;

const ContentContainer = styled.div<{
  sizeStatus: boolean;
  fullScreenMode: boolean;
  mediumScreenMode: boolean;
}>`
  padding: ${({ sizeStatus }) =>
    sizeStatus ? contentSmallBodyPadding : contentLargeBodyPadding};
  width: ${({ sizeStatus, fullScreenMode, mediumScreenMode }) =>
    fullScreenMode || sizeStatus
      ? "100vw"
      : mediumScreenMode
      ? `calc(100vw - ${mediumSidebarWidth})`
      : `calc(100vw - ${sidebarWidth})`};
  overflow-x: hidden;
  height: calc(100vh - ${headerHeight});
  transition: all 0.3s ease-in-out;
  &.fullscreen {
    width: 100vw;
    transition: width 0.3s ease-in-out;
  }
`;