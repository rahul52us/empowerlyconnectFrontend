import { observer } from "mobx-react-lite";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaBookOpen, FaBookReader } from "react-icons/fa";
import store from "../../../../../../store/store";
import { getStatusType } from "../../../../../../config/constant/statusCode";
import { dashboard } from "../../../../../../config/constant/routes";
import DashPageHeader from "../../../../../../config/component/common/DashPageHeader/DashPageHeader";
import { liberaryBreadCrumb } from "../../../../utils/breadcrumb.constant";
import SummaryWidget from "../../../../../../config/component/WigdetCard/SummaryWidget";
import RoomDetails from "./RoomDetails";

const BookLiberary = observer(() => {
  const {
    bookLiberary: {
      getBooksCounts,
      booksCounts,
      bookCategoryCount,
      bookUsersCount,
      getBooksCategoryCounts,
      getBookUsersCounts,
    },
    auth: { openNotification },
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([
      fetchData(getBooksCounts),
      fetchData(getBooksCategoryCounts),
      fetchData(getBookUsersCounts),
    ])
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          title: "Failed to Retrieve Counts",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      });
  }, [
    getBooksCounts,
    getBooksCategoryCounts,
    getBookUsersCounts,
    openNotification,
  ]);

  const summaryData = [
    {
      label: "Books Category",
      value: bookCategoryCount.data,
      loading: bookCategoryCount.loading,
      icon: FaBookReader,
      colorScheme: "teal",
      description: "Here is an description for the users",
      link:dashboard.liberary.books.category.index
    },
    {
      label: "Total Books",
      value: booksCounts.data,
      loading: booksCounts.loading,
      icon: FaBookOpen,
      colorScheme: "teal",
      description: "Total No. of Books Counts",
    },
    {
      label: "Total Users",
      value: bookUsersCount.data,
      loading: bookUsersCount.loading,
      icon: FaPersonCircleQuestion,
      colorScheme: "teal",
      description: "Here is an description for the users",
    },
  ];

  return (
    <Box px={{ base: 2, md: 4 }}>
      <DashPageHeader
        title="Dashboard"
        breadcrumb={liberaryBreadCrumb.liberary}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
        {summaryData.map((data, index) => (
          <SummaryWidget
            key={index}
            label={data.label}
            value={data.value}
            icon={data.icon}
            colorScheme={data.colorScheme}
            description={data.description}
            link={data.link}
            loading={data.loading}
          />
        ))}
      </SimpleGrid>
      <RoomDetails />
    </Box>
  );
});

export default BookLiberary;
