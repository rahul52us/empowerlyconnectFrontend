import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";
import { useCallback, useState } from "react";
import store from "../../../../../store/store";
import { format, addDays } from "date-fns";
import NormalTable from "../../../../../config/component/Table/NormalTable/NormalTable";
import { SearchIcon } from "@chakra-ui/icons";

const DailyAttendance = observer(() => {
  const {
    AttendencePunch: { getRecentPunch, recentPunch },
  } = store;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  const fetchRecordsData = useCallback(() => {
    const selectedDatePlusOne = addDays(selectedDate, 1);

    getRecentPunch({
      startDate: formatDate(selectedDate),
      endDate: formatDate(selectedDatePlusOne),
      limit:31
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }, [selectedDate, getRecentPunch]);

  const handleDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const columns = [
    { headerName: "Date", key: "date" },
    { headerName: "In", key: "punchInTime" },
    { headerName: "Out", key: "punchOutTime" },
    { headerName: "WHrs.", key: "workingHours" },
    { headerName: "Status", key: "status" },
    { headerName: "Late Coming", key: "lateComingMinutes" },
    { headerName: "Early Going", key: "earlyGoingMinutes" },
  ];

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={3}
      boxShadow={boxShadow}
      bg={bgColor}
    >
      <Flex align="center" mb={6}>
        <Text fontWeight="bold" mr={2}>
          Date:
        </Text>
        <CustomInput
          type="date"
          onChange={(date) => handleDateChange(date)}
          name="date"
          value={selectedDate}
          placeholder="Select Date"
        />
        <Button
          ml={{ base: 0, md: 4 }}
          mt={{ base: 4, md: 0 }}
          colorScheme="teal"
          onClick={fetchRecordsData}
          leftIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Flex>
      <Flex justify="space-between" align="center" mb={6}>
        <Flex align="center" flex="1">
          <Text fontWeight="bold" mr={2}>
            Employee:
          </Text>
          <Text>Rahul Kushwah</Text>
        </Flex>
        <Flex align="center" flex="1" justify="flex-end">
          <Text fontWeight="bold" mr={2}>
            ECode:
          </Text>
          <Text>SS-298</Text>
        </Flex>
      </Flex>
      <Box
        overflowX="auto"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={2}
        bg={useColorModeValue("white", "gray.700")}
      >
        <NormalTable
          columns={columns}
          data={recentPunch.data}
          loading={recentPunch.loading}
          currentPage={0}
          totalPages={0}
          onPageChange={() => {}}
          title="Monthly Punch"
        />
      </Box>
    </Box>
  );
});

export default DailyAttendance;