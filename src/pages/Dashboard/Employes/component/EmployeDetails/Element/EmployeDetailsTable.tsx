import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../../../../config/component/customHooks/useDebounce";
import CustomTable from "../../../../../../config/component/CustomTable/CustomTable";
import { dashboard } from "../../../../../../config/constant/routes";
import { tablePageLimit } from "../../../../../../config/constant/variable";
import store from "../../../../../../store/store";
import { employDropdownData, generateTableData } from "../utils/constant";
import UserProfile from "./UserProfile";
// import IndividualEmployeeDetails from "./IndividualEmployeeDetails";

// Employe Table
const EmployeDetailsTable = observer(() => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dropdowns = useState(employDropdownData)[0];
  const [selectedOptions, setSelectedOptions] = useState({});
  const [pageLimit, setPageLimit] = useState(tablePageLimit);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [date, setDate] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [employeeId, setEmployeeId] = useState<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    Employe: { getAllEmployes, employes },
    auth: { openNotification },
  } = store;

  // console.log('generateTableData',generateTableData(employes.data))
  const applyGetAllEmployes = useCallback(
    ({ page, limit, reset }: any) => {
      const query: any = {};
      if (reset) {
        query["page"] = 1;
        query["limit"] = tablePageLimit;
      } else {
        if (debouncedSearchQuery.trim()) {
          query["search"] = debouncedSearchQuery;
        }
        query["page"] = page || currentPage;
        query["limit"] = limit || pageLimit;
        query["startDate"] = date.startDate;
        query["endDate"] = date.endDate;
      }
      getAllEmployes(query)
        .then(() => {})
        .catch((err) => {
          openNotification({
            type: "error",
            title: "Failed to get users",
            message: err?.message,
          });
        });
    },
    [
      debouncedSearchQuery,
      currentPage,
      pageLimit,
      date,
      getAllEmployes,
      openNotification,
    ]
  );

  useEffect(() => {
    applyGetAllEmployes({
      page: currentPage,
      limit: tablePageLimit,
      search: debouncedSearchQuery,
    });
  }, [currentPage, debouncedSearchQuery, applyGetAllEmployes]);

  const onDateChange = (e: any, type: string) => {
    setDate((prev: any) => ({ ...prev, [type]: e }));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const resetTableData = () => {
    setCurrentPage(1);
    setPageLimit(tablePageLimit);
    setDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setSelectedOptions({});
    setSearchQuery("");
    applyGetAllEmployes({ reset: true });
  };

  const employeTableColumns = [
    {
      headerName: "Name",
      key: "name",
      type: "link",
      function: (e: any) => {
        navigate(
          `${dashboard.employes.details}/edit/${e?._id}?tab=profile-details`
        );
      },
      props: {
        column: { textAlign: "center" },
        row: {
          minW: 140,
          textAlign: "center",
          fontWeight: 500,
          textDecoration: "none",
        },
      },
    },
    {
      headerName: "Pic",
      key: "designation",
      type: "component",
      metaData: {
        component: () => (
          <Box m={1}>
            <Avatar src="" />
          </Box>
        ),
      },
      props: {
        row: { minW: 120, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "E-Code",
      key: "code",
      props: { row: { minW: 100, textAlign: "center" } },
    },
    {
      headerName: "UserName",
      key: "username",
      props: {
        row: { minW: 160, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "DOB",
      key: "dob",
      type: "date",
      props: {
        row: { minW: 120, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Mobile Number",
      key: "mobileNo",
      type: "tooltip",
      props: {
        row: { minW: 160, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Designation",
      key: "designation",
      type: "component",
      metaData: {
        component: (e: any) => (
          <Tooltip label={e?.designation}>Comments</Tooltip>
        ),
      },
      props: {
        row: { minW: 120, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Created At",
      key: "createdAt",
      type: "date",
      props: { row: { minW: 120, textAlign: "center" } },
    },
    {
      headerName: "Actions",
      key: "table-actions",
      type: "table-actions",
      props: {
        // isSticky: true,
        row: { minW: 180, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
  ];

  return (
    <Box>
      <CustomTable
        cells={true}
        actions={{
          search: {
            show: true,
            placeholder: "Search by code and username",
            searchValue: searchQuery,
            onSearchChange: (e: any) => setSearchQuery(e.target.value),
          },
          applyFilter: {
            show: true,
            function: () => applyGetAllEmployes({ page: currentPage }),
          },
          resetData: {
            show: true,
            text: "Reset Data",
            function: () => resetTableData(),
          },
          actionBtn: {
            addKey: {
              showAddButton: true,
              function: () => {
                navigate(
                  `${dashboard.employes.details}/new?tab=profile-details`
                );
              },
            },
            editKey: {
              showEditButton: true,
              function: (e: any) => {
                navigate(
                  `${dashboard.employes.details}/edit/${e?._id}?tab=profile-details`
                );
              },
            },
            viewKey: {
              showViewButton: true,
              function: (e: any) => {
                setEmployeeId(e._id);
                console.log("---------------", e._id);
                onOpen();
              },
            },
            deleteKey: {
              showDeleteButton: true,
              function: (dt: string) => {
                alert(dt);
              },
            },
          },
          pagination: {
            show: true,
            onClick: handleChangePage,
            currentPage: currentPage,
            totalPages: employes.totalPages,
          },
          datePicker: {
            show: true,
            isMobile: true,
            date: {
              startDate: date.startDate,
              endDate: date.endDate,
            },
            onDateChange: (e: string, type: string) => onDateChange(e, type),
          },
          multidropdown: {
            show: true,
            title: "Apply Filters",
            placeholder: "Apply Filters",
            search: {
              searchValue: searchQuery,
              visible: true,
              placeholder: "Search Value here",
              onSearchChange: (e: any) => setSearchQuery(e),
            },
            dropdowns: dropdowns,
            onApply: () => applyGetAllEmployes({}),
            selectedOptions: selectedOptions,
            onDropdownChange: (value: any, label: string) => {
              setSelectedOptions((prev: any) => ({ ...prev, [label]: value }));
            },
          },
        }}
        title="Employes Details"
        data={generateTableData(employes.data)}
        columns={employeTableColumns}
        loading={employes.loading}
        serial={{ show: false, text: "S.No.", width: "10px" }}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent borderLeftRadius={"2xl"}>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create your account</DrawerHeader> */}

          <DrawerBody p={0}>
              {isOpen && employeeId && (
              // <IndividualEmployeeDetails
              //   employeeId={employeeId}

              // />
              <>
                <UserProfile employeeId={employeeId} />
              </>
            )}
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Box>
  );
});

export default EmployeDetailsTable;
