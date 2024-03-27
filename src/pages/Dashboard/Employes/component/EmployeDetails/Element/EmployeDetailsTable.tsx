import { useEffect, useState } from "react";
import store from "../../../../../../store/store";
import { observer } from "mobx-react-lite";
import CustomTable from "../../../../../../config/component/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../../../../config/constant/routes";
import { employDropdownData, generateTableData } from "../utils/constant";
import { tablePageLimit } from "../../../../../../config/constant/variable";

const EmployeDetailsTable = observer(() => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dropdowns = useState(employDropdownData)[0];
  const [selectedOptions, setSelectedOptions] = useState({});
  const [pageLimit, setPageLimit] = useState(tablePageLimit);
  const [date, setDate] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const {
    Employe: { getAllEmployes, employes },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getAllEmployes({ page: 1, limit: tablePageLimit })
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to get users",
          message: err?.message,
        });
      });
  }, [getAllEmployes, openNotification]);

  // function to get the data from backend on the page, limit, date and others
  const applyGetAllEmployes = ({ page, limit, reset }: any) => {
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
    getAllEmployes(query)
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to get users",
          message: err?.message,
        });
      });
  };

  const onDateChange = (e: any, type: string) => {
    setDate((prev: any) => ({ ...prev, [type]: e }));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    applyGetAllEmployes({ page, limit: pageLimit });
  };

  const resetTableData = () => {
    setCurrentPage(1);
    setPageLimit(tablePageLimit);
    setDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setSelectedOptions({});
    setSearchValue("");
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
      headerName: "E-Code",
      key: "code",
      props: { row: { minW: 100, textAlign: "center" } },
    },
    {
      headerName: "UserName",
      key: "username",
      props: {
        row: { minW: 160, textAlign: "left" },
        column: { textAlign: "left" },
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
      headerName: "Position",
      key: "position",
      type:'array',
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
        row: { minW: 180, textAlign: "left" },
        column: { textAlign: "left" },
      },
    },
  ];

  console.log(searchValue);
  return (
    <CustomTable
      actions={{
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
              navigate(dashboard.employes.new);
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
            searchValue: "",
            visible: true,
            placeholder: "Search Value here",
            onSearchChange: (e: string) => setSearchValue(e),
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
      totalPages={employes.totalPages}
      loading={employes.loading}
      serial={{ show: false, text: "S.No.", width: "10px" }}
    />
  );
});

export default EmployeDetailsTable;