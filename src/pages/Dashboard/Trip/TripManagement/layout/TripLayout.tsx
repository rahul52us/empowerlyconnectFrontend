import { observer } from "mobx-react-lite";
import TripCard from "../component/TripCard";
import { Box, Center, Grid, Spinner } from "@chakra-ui/react";
import store from "../../../../../store/store";
import { useCallback, useEffect, useState } from "react";
import CustomTable from "../../../../../config/component/CustomTable/CustomTable";
import { tablePageLimit } from "../../../../../config/constant/variable";
import EditTripForm from "../component/forms/EditTripForm";
import AddTripForm from "../component/forms/AddTripForm";
import { getStatusType } from "../../../../../config/constant/statusCode";
import NotFoundData from "../../../../../config/component/NotFound/NotFoundData";

const TripLayout = observer((props: any) => {
  const { setTripFormData, tripFormData, gridType, gridLoading, setGripType } =
    props;

  const {
    tripStore: { getAllTrip, trips },
    auth: { openNotification },
  } = store;

  const { data, loading, totalPages } = trips;

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(tablePageLimit);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const fetchTrips = useCallback(
    (params = { page: 1, limit: tablePageLimit }) => {
      setGripType({ loading: true, type: "grid" });
      getAllTrip(params)
        .catch((err: any) => {
          openNotification({
            title: "Failed to get Trips",
            message: err?.data?.message,
            type: getStatusType(err.status),
          });
        })
        .finally(() => {
          setGripType({ loading: false, type: "grid" });
        });
    },
    [getAllTrip, openNotification, setGripType]
  );

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const applyGetAllRecord = ({ page, limit, reset }: any) => {
    const query: any = {};
    if (reset) {
      query.page = 1;
      query.limit = tablePageLimit;
    } else {
      if (searchValue.trim()) {
        query.search = searchValue;
      }
      query.page = page || currentPage;
      query.limit = limit || pageLimit;
      query.startDate = date?.startDate || undefined;
      query.endDate = date?.endDate || undefined;
    }
    fetchTrips(query);
  };

  const onDateChange = (e: any, type: string) => {
    setDate((prev) => ({ ...prev, [type]: e }));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    applyGetAllRecord({ page, limit: pageLimit });
  };

  const resetTableData = () => {
    setCurrentPage(1);
    setPageLimit(tablePageLimit);
    setDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setSearchValue("");
    applyGetAllRecord({ reset: true });
  };

  const columns = [
    {
      headerName: "Title",
      key: "title",
      props: {
        column: { textAlign: "left" },
        row: {
          minW: 120,
          textAlign: "left",
          fontWeight: 500,
          textDecoration: "none",
        },
      },
    },
    {
      headerName: "Trip Type",
      key: "type",
      props: {
        column: { textAlign: "left" },
      },
    },
    {
      headerName: "Description",
      key: "description",
      type: "tooltip",
      props: {
        column: { textAlign: "left" },
      },
    },
    {
      headerName: "Created At",
      type: "date",
      key: "createdAt",
      props: {
        column: { textAlign: "left", minW: 160 },
      },
    },
    {
      headerName: "Actions",
      key: "table-actions",
      type: "table-actions",
      props: {
        row: { minW: 180, textAlign: "left" },
        column: { textAlign: "left" },
      },
    },
  ];

  if (gridLoading) {
    return (
      <Center>
        <Box mt={20}>
          <Spinner color="blue.500" thickness="4px" size="xl" />
        </Box>
      </Center>
    );
  }

  return (
    <Box>
      {data.length === 0 ? (
        <NotFoundData
          onClick={() => {
            setTripFormData({ open: true, type: "add", data: null });
          }}
          btnText="CREATE Trip"
          title="No trip found"
          subTitle="Start by creating a new trip to get started."
        />
      ) : gridType === "grid" ? (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          }}
          gap={4}
          columnGap={3}
        >
          {data.map((item: any, index: number) => (
            <TripCard
              key={index}
              item={item}
              setTripFormData={setTripFormData}
            />
          ))}
        </Grid>
      ) : (
        <CustomTable
          title="Trips"
          loading={loading}
          columns={columns}
          data={data}
          actions={{
            actionBtn: {
              editKey: {
                showEditButton: true,
                function: (item: any) => {
                  setTripFormData({ open: true, data: item, type: "edit" });
                },
              },
            },
            datePicker: {
              show: true,
              isMobile: true,
              date: {
                startDate: date.startDate,
                endDate: date.endDate,
              },
              onDateChange,
            },
            resetData: {
              show: true,
              text: "Reset Data",
              function: resetTableData,
            },
            pagination: {
              show: true,
              onClick: handleChangePage,
              currentPage,
              totalPages,
            },
          }}
        />
      )}
      {tripFormData?.type === "edit" && (
        <EditTripForm
          tripFormData={tripFormData}
          setTripFormData={setTripFormData}
          handleGetRecord={applyGetAllRecord}
        />
      )}
      <AddTripForm
        tripFormData={tripFormData}
        setTripFormData={setTripFormData}
        handleGetRecord={applyGetAllRecord}
      />
    </Box>
  );
});

export default TripLayout;
