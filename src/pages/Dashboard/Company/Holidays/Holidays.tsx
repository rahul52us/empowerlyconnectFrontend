import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
  employDropdownData,
} from "../../Employes/component/EmployeDetails/utils/constant";
import { tablePageLimit } from "../../../../config/constant/variable";
import store from "../../../../store/store";
import CustomTable from "../../../../config/component/CustomTable/CustomTable";
import { dashboard } from "../../../../config/constant/routes";
import AddHoliday from "./component/AddHoliday";
import { getStatusType } from "../../../../config/constant/statusCode";

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
  const [addFormValues, setAddFormValues] = useState({
    open: false,
    loading: false,
  });

  const {
    company: { getHolidays, holidays },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getHolidays({ page: 1, limit: tablePageLimit })
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: getStatusType(err.status),
          title: "Failed to get Holidays",
          message: err?.data?.message,
        });
      });
  }, [getHolidays, openNotification]);

  // function to get the data from backend on the page, limit, date and others
  const applyGetAllRecords = ({ page, limit, reset }: any) => {
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
    getHolidays(query)
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to get holidays",
          message: err?.message,
        });
      });
  };

  const onDateChange = (e: any, type: string) => {
    setDate((prev: any) => ({ ...prev, [type]: e }));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    applyGetAllRecords({ page, limit: pageLimit });
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
    applyGetAllRecords({ reset: true });
  };

  const employeTableColumns = [
    {
      headerName: "Title",
      key: "title",
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
      headerName: "Date",
      key: "date",
      props: { row: { minW: 100, textAlign: "center" } },
    },
    {
      headerName: "Day",
      key: "day",
      props: {
        row: { minW: 160, textAlign: "left" },
        column: { textAlign: "left" },
      },
    },
    {
      headerName: "Description",
      key: "description",
      type:"tooltip",
      props: {
        row: { minW: 160, textAlign: "left" },
        column: { textAlign: "left" },
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

  return (
    <>
      <CustomTable
        actions={{
          applyFilter: {
            show: true,
            function: () => applyGetAllRecords({ page: currentPage }),
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
                setAddFormValues(() => ({...addFormValues,open : true}))
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
            totalPages: holidays.totalPages,
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
            onApply: () => applyGetAllRecords({}),
            selectedOptions: selectedOptions,
            onDropdownChange: (value: any, label: string) => {
              setSelectedOptions((prev: any) => ({ ...prev, [label]: value }));
            },
          },
        }}
        title="Holidays"
        data={holidays.data}
        columns={employeTableColumns}
        loading={holidays.loading}
        serial={{ show: true, text: "S.No.", width: "10px" }}
      />
      <AddHoliday addFormValues={addFormValues} setAddFormValues={setAddFormValues} />
    </>
  );
});

export default EmployeDetailsTable;
