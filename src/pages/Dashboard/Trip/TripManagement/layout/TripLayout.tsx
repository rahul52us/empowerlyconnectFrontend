import { observer } from "mobx-react-lite";
import TripCard from "../component/TripCard";
import { Box, Center, Grid, Spinner } from "@chakra-ui/react";
import store from "../../../../../store/store";
import { useEffect, useState } from "react";
import CustomTable from "../../../../../config/component/CustomTable/CustomTable";
import { tablePageLimit } from "../../../../../config/constant/variable";
import EditTripForm from "../component/forms/EditTripForm";
import AddTripForm from "../component/forms/AddTripForm";
import { getStatusType } from "../../../../../config/constant/statusCode";
const TripLayout = observer(
  ({
    setTripFormData,
    tripFormData,
    gridType,
    gridLoading,
    setGripType,
  }: any) => {
    const {
      tripStore: {
        getAllTrip,
        trips: { data, loading, totalPages },
      },
      auth: { openNotification },
    } = store;

    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(tablePageLimit);
    const [date, setDate] = useState<any>({
      startDate: new Date(),
      endDate: new Date(),
    });

    useEffect(() => {
      getAllTrip({ page: 1, limit: tablePageLimit })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            title: "Failed to get Department Categories",
            message: err?.data?.message,
            type: getStatusType(err.status),
          });
        })
        .finally(() => {
          setGripType({ loading: false, type: "grid" });
        });
    }, [getAllTrip, openNotification, setGripType]);

    // function to get the data from backend on the page, limit, date and others
    const applyGetAllRecord = ({ page, limit, reset }: any) => {
      const query: any = {};
      if (reset) {
        query["page"] = 1;
        query["limit"] = tablePageLimit;
      } else {
        if (searchValue?.length > 0 && searchValue?.trim()) {
          query["search"] = searchValue;
        }
        query["page"] = page || currentPage;
        query["limit"] = limit || pageLimit;
        query["startDate"] = date?.startDate ? date?.startDate : undefined;
        query["endDate"] = date?.endDate ? date?.endDate : undefined;
      }
      getAllTrip(query)
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            title: "Failed to get Department Categories",
            message: err?.data?.message,
            type: getStatusType(err.status),
          });
        });
    };

    const onDateChange = (e: any, type: string) => {
      setDate((prev: any) => ({ ...prev, [type]: e }));
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

    // const deleteRecord = (record: any) => {
    //   deleteDepartmentCategory(record?._id)
    //     .then(() => {
    //       openNotification({
    //         type: "success",
    //         title: "Successfully Deleted",
    //         message: "Record Deleted Successfully",
    //       });
    //       applyGetAllRecord({});
    //     })
    //     .catch((err : any) => {
    //       openNotification({
    //         type: "error",
    //         title: "Failed to get Department Categories",
    //         message: err?.message,
    //       });
    //     });
    // };

    const columns = [
      {
        headerName: "title",
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
        type : "tooltip",
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

    if (gridLoading === true) {
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
        {gridType === "grid" ? (
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
            {data.map((item: any, index: number) => {
              return (
                <TripCard
                  key={index}
                  item={item}
                  setTripFormData={setTripFormData}
                />
              );
            })}
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
                onDateChange: (e: string, type: string) =>
                  onDateChange(e, type),
              },
              resetData: {
                show: true,
                text: "Reset Data",
                function: () => resetTableData(),
              },
              pagination: {
                show: true,
                onClick: handleChangePage,
                currentPage: currentPage,
                totalPages: totalPages,
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
  }
);

export default TripLayout;