import { useCallback, useEffect, useState } from "react";
import store from "../../../../../../store/store";
import { observer } from "mobx-react-lite";
import CustomTable from "../../../../../../config/component/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../../../../config/constant/routes";
import { employDropdownData, generateTableData } from "../utils/constant";
import { tablePageLimit } from "../../../../../../config/constant/variable";
import useDebounce from "../../../../../../config/component/customHooks/useDebounce";
import { Avatar, Box, Tooltip } from "@chakra-ui/react";

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

  const {
    Employe: { getAllEmployes, employes },
    auth: { openNotification },
  } = store;


  const applyGetAllEmployes = useCallback(
    ({ page, limit, reset } : any) => {
      const query : any = {};
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
    [debouncedSearchQuery, currentPage, pageLimit, date, getAllEmployes, openNotification]
  );


  useEffect(() => {
      applyGetAllEmployes({ page: currentPage, limit: tablePageLimit ,search: debouncedSearchQuery });
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
      type:'link',
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
      type:'component',
      metaData: {
        component: () => (
          <Box m={1}><Avatar src="" /></Box>
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
      type:'tooltip',
      props: {
        row: { minW: 160, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Designation",
      key: "designation",
      type:'component',
      metaData: {
        component: (e : any) => (
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
    <CustomTable
      cells={true}
      actions={{
        search:{
          show: true,
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
            function: (dt: string) => {
              alert(dt);
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
          totalPages:employes.totalPages
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
            searchValue : searchQuery,
            visible: false,
            placeholder: "Search Value here",
            // onSearchChange: (e: any) => setSearchQuery(e),
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
  );
});

export default EmployeDetailsTable;