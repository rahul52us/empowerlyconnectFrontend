import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { employDropdownData } from "../../Employes/component/EmployeDetails/utils/constant";
import store from "../../../../store/store";
import CustomTable from "../../../../config/component/CustomTable/CustomTable";
import AddHoliday from "./component/AddHoliday";
import { getStatusType } from "../../../../config/constant/statusCode";
import { generateResponse } from "./utils/function";
import EditHoliday from "./component/EditHoliday";
import DeleteHoliday from "./component/DeleteHoliday";

const HolidaysDetailTable = observer(() => {
  const dropdowns = useState(employDropdownData)[0];
  const [selectedOptions, setSelectedOptions] = useState({});
  const [date, setDate] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [formValues, setFormValues] = useState<any>({
    open: false,
    loading: false,
    type: "add",
    data: null,
  });

  const {
    company: { getHolidays, holidays, updateHoliday },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getHolidays({})
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
  const applyGetAllRecords = () => {
    const query: any = {};
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

  const handleChangePage = () => {
    applyGetAllRecords();
  };

  const resetTableData = () => {
    setDate({
      startDate: new Date(),
      endDate: new Date(),
    });
    setSelectedOptions({});
    applyGetAllRecords();
  };

  const deleteRecord = (data: any) => {
    setFormValues(() => ({ ...formValues, loading: true }));
    updateHoliday({ title: data.title?.trim(), delete: 1 })
      .then((data: any) => {
        openNotification({
          title: "Deleted Successfully",
          message: data?.message,
          type: "success",
        });
        applyGetAllRecords();
        setFormValues(() => ({
          ...formValues,
          loading: false,
          data: null,
          type: "add",
          open: false,
        }));
      })
      .catch((err: any) => {
        openNotification({
          title: "Deleted Failed",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
        setFormValues(() => ({ ...formValues, loading: false }));
      });
  };

  const employeTableColumns = [
    {
      headerName: "Title",
      key: "title",
      type: "tooltip",
      function: (e: any) => {
        setFormValues(() => ({
          ...formValues,
          type: "edit",
          data: e,
          open: true,
        }));
      },
      props: {
        column: { textAlign: "center" },
        row: {
          minW: 120,
          textAlign: "center",
          fontWeight: 500,
          textDecoration: "none",
        },
      },
    },
    {
      headerName: "Date",
      key: "date",
      type: "date",
      props: { row: { minW: 100, textAlign: "center" } },
    },
    {
      headerName: "Day",
      key: "day",
      props: {
        row: { minW: 120, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Description",
      key: "description",
      type: "tooltip",
      props: {
        row: { minW: 160, textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Actions",
      key: "table-actions",
      type: "table-actions",
      props: {
        row: { maxW: 60, textAlign: "center" },
        column: { maxW: 60, textAlign: "center" },
      },
    },
  ];

  return (
    <>
      <CustomTable
        cells={true}
        actions={{
          search:{
            show: true,
            placeholder:'Search by code and username',
            searchValue: '',
            onSearchChange:() => {},
          },
          applyFilter: {
            show: false,
            function: () => applyGetAllRecords(),
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
                setFormValues(() => ({
                  ...formValues,
                  open: true,
                  type: "add",
                }));
              },
            },
            editKey: {
              showEditButton: true,
              function: (e: any) => {
                setFormValues(() => ({
                  ...formValues,
                  type: "edit",
                  data: e,
                  open: true,
                }));
              },
            },
            viewKey: {
              showViewButton: false,
              function: (dt: string) => {
                alert(dt);
              },
            },
            deleteKey: {
              showDeleteButton: true,
              function: (dt: string) => {
                setFormValues(() => ({
                  ...formValues,
                  data: dt,
                  open: true,
                  type: "delete",
                }));
              },
            },
          },
          pagination: {
            show: false,
            onClick: handleChangePage,
            currentPage: 1,
            totalPages: holidays.totalPages,
          },
          datePicker: {
            show: false,
            isMobile: true,
            date: {
              startDate: date.startDate,
              endDate: date.endDate,
            },
            onDateChange: (e: string, type: string) => onDateChange(e, type),
          },
          multidropdown: {
            show: false,
            title: "Apply Filters",
            placeholder: "Apply Filters",
            search: {
              searchValue: "",
              visible: true,
              placeholder: "Search Value here",
              onSearchChange: () => {},
            },
            dropdowns: dropdowns,
            onApply: () => applyGetAllRecords(),
            selectedOptions: selectedOptions,
            onDropdownChange: (value: any, label: string) => {
              setSelectedOptions((prev: any) => ({ ...prev, [label]: value }));
            },
          },
        }}
        title="Holidays"
        data={generateResponse(holidays.data)}
        columns={employeTableColumns}
        loading={holidays.loading}
        serial={{ show: false, text: "S.No.", width: "10px" }}
      />
      <AddHoliday
        formValues={formValues}
        setFormValues={setFormValues}
        getAllRecords={applyGetAllRecords}
      />
      <EditHoliday
        formValues={formValues}
        setFormValues={setFormValues}
        getAllRecords={applyGetAllRecords}
      />
      <DeleteHoliday
        formValues={formValues}
        setFormValues={setFormValues}
        deleteRecord={deleteRecord}
      />
    </>
  );
});

export default HolidaysDetailTable;
