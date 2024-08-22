import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import TripUserWidget from "../component/TripWidget/TripWidgets";
import TripLayout from "../component/layout/TripLayout";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import TripChartContainer from "../component/TripChartContainer/TripChartContainer";
import DashPageHeader from "../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { tripBreadCrumb } from "../../../utils/breadcrumb.constant";

const TripUserDetail = observer(({ userId, isDrawer }: any) => {
  const [gridType, setGripType] = useState({ loading: true, type: "grid" });
  return (
    <Box>
      {!isDrawer && <DashPageHeader breadcrumb={tripBreadCrumb.index} />}
      <TripUserWidget userId={userId} />
      <TripChartContainer userId={userId} />
      <Box pb={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading
            display="flex"
            alignItems="center"
            fontSize={{ base: "xl", md: "2xl" }}
            color="teal.600"
          >
            <Icon as={FaHome} boxSize={6} mr={2} />
            Trips
          </Heading>
        </Flex>
        <TripLayout
          userId={userId}
          setGripType={setGripType}
          gridType={gridType.type}
          gridLoading={gridType.loading}
        />
      </Box>
    </Box>
  );
});

export default TripUserDetail;
