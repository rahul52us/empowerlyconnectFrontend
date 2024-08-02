import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { liberaryBreadCrumb } from "../utils/breadcrumb.constant";
import { Box, SimpleGrid } from "@chakra-ui/react";
import store from "../../../store/store";
import { useEffect } from "react";
import SummaryWidget from "../../../config/component/WigdetCard/SummaryWidget";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { getStatusType } from "../../../config/constant/statusCode";
import BookDetails from "./component/BooksDetails/BookDetails";

const BookLiberary = observer(() => {
  const {
    bookLiberary: { getBooksCounts, booksCounts },
    auth: { openNotification },
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([fetchData(getBooksCounts)])
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          title: "Failed to Retrieve Books Count",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      });
  }, [getBooksCounts, openNotification]);

  const summaryData = [
    {
      label: "Total Books",
      value: booksCounts.data,
      icon: FaPersonCircleQuestion,
      colorScheme: "teal",
      description: "Total No. of Books Counts",
    },
    {
      label: "New Label Data",
      value: booksCounts.data,
      icon: FaPersonCircleQuestion,
      colorScheme: "teal",
      description: "Here is an description for the users",
    },
    {
      label: "New Label Data",
      value: booksCounts.data,
      icon: FaPersonCircleQuestion,
      colorScheme: "teal",
      description: "Here is an description for the users",
    },
  ];

  return (
    <Box px={{ base: 4, md: 6 }} py={2}>
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
          />
        ))}
      </SimpleGrid>
      <BookDetails />
    </Box>
  );
});

export default BookLiberary;