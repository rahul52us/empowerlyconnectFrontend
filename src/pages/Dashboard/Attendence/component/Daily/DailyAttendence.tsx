import { Box, Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import { format } from "date-fns";
import NormalTable from "../../../../../config/component/Table/NormalTable/NormalTable";

const DailyAttendance = observer(() => {
  const {
    AttendencePunch: { getRecentPunch, recentPunch },
  } = store;

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const formatDate = (date : any) => format(date, "yyyy-MM-dd");
    getRecentPunch({
      startDate: formatDate(selectedDate),
      endDate: formatDate(selectedDate), // Using the same date for both start and end
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }, [getRecentPunch, selectedDate]);

  const columns = [
    { headerName: "Date", key: "date" },
    { headerName: "In", key: "punchInTime" },
    { headerName: "Out", key: "punchOutTime" },
    { headerName: "WHrs.", key: "workingHours" },
    { headerName: "Status", key: "status" },
    { headerName: "Late Coming", key: "lateComingMinutes" },
    { headerName: "Early Going", key: "earlyGoingMinutes" },
  ];

  const handleDateChange = (date : any) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={5}>
      <Flex align="center" mb={5}>
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
      </Flex>
      <Flex justify="space-between" align="center" mb={4}>
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
      <Box overflowX="auto">
        <NormalTable
          columns={columns}
          data={recentPunch.data}
          loading={recentPunch.loading}
          currentPage={0}
          totalPages={0}
          onPageChange={() => {}}
        />
      </Box>
    </Box>
  );
});

export default DailyAttendance;
