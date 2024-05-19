import { useEffect, useState } from "react";
import { tablePageLimit } from "../../../../../../../config/constant/variable";
import store from "../../../../../../../store/store";
import CustomTable from "../../../../../../../config/component/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../../../../../config/constant/routes";

const LeaveDetails = ({ selectedCategory }: any) => {
   const navigate = useNavigate()
  const setOpenModel = useState<any>({
    open: false,
    data: null,
    type: "add",
    loading: false,
  })[1];

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const {
    requestStore: { getAllRequest },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    setLoading(true);
    getAllRequest({
      page: 1,
      limit: tablePageLimit,
    })
      .then((data) => {
        setData(data?.data || []);
        setTotalPages(data.totalPages);
      })
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to get Departments",
          message: err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getAllRequest, openNotification, selectedCategory]);

  // function to get the data from backend on the page, limit, date and others
  const applyGetAllRecords = ({ page, limit, reset }: any) => {
    const query: any = {};
    if (reset) {
      query["page"] = 1;
      query["limit"] = tablePageLimit;
    } else {
      query["page"] = page || currentPage;
      query["limit"] = limit || tablePageLimit;
    }
    setLoading(true);
    getAllRequest(query)
      .then((data) => {
        setData(data?.data || []);
        setTotalPages(data.totalPages);
      })
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to get Department Categories",
          message: err?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    applyGetAllRecords({ page, limit: tablePageLimit });
  };

  const columns = [
    {
      headerName: "Leave Type",
      type: "link",
      key: "leaveType",
      function: (e: any) => {
        navigate(`${dashboard.request.leave}/edit/${e._id}`);
      },
      props: {
        column: { textAlign: "left" },
        row: {
          textAlign: "left",
          fontWeight: 500,
          textDecoration: "none",
        },
      },
    },
    {
      headerName: "Start Date",
      type: "date",
      key: "startDate",
      props: {
        row : {textAlign : 'center'},
        column: { textAlign: "center" },
      }
    },
    {
      headerName: "End Date",
      type: "date",
      key: "endDate",
      props: {
        row : {textAlign : 'center'},
        column: { textAlign: "center" },
      }
    },
    {
      headerName: "Status",
      type: "text",
      key: "status",
      props: {
        row : {textAlign : 'center', fontWeight : '500'},
        column: { textAlign: "center" },
      }
    },
    // {
    //   headerName: "Manager",
    //   type: "text",
    //   key: "sendTo",
    //   props: {
    //     row : {textAlign : 'center'},
    //     column: { textAlign: "center" },
    //   }
    // },
    {
      headerName : 'Remarks',
      type : 'approvals',
      key : 'approvals',
      props: {
        row : {textAlign : 'center'},
        column: { textAlign: "center" },
      }
    },
    {
      headerName: "Created At",
      type: "date",
      key: "createdAt",
      props: {
        row : {textAlign : 'center'},
        column: { textAlign: "center" },
      }
    },
    {
      headerName: "Actions",
      key: "table-actions",
      type: "table-actions",
      props: {
        column: { textAlign: "center" },
      },
    },
  ];

  return (
    <>
        <CustomTable
          columns={columns}
          data={data}
          loading={loading}
          title="Leave Request"
          actions={{
            applyFilter: {
              show: false,
              function: () => {},
            },
            resetData: {
              show: true,
              text: "Reset Data",
              function: () => applyGetAllRecords({reset : true}),
            },
            actionBtn: {
              addKey: {
                showAddButton: true,
                function: () => {
                  navigate(dashboard.request.leaveAdd)
                },
              },
              editKey: {
                showEditButton: true,
                function: (dt : any) => {
                  navigate(`${dashboard.request.leave}/edit/${dt._id}`)
                },
              },
              deleteKey: {
                showDeleteButton: true,
                function: (dt: string) => {
                  setOpenModel({
                    type: "delete",
                    data: dt,
                    open: true,
                  });
                },
              },
            },
            pagination: {
              show: true,
              onClick: handleChangePage,
              currentPage: currentPage,
              totalPages:totalPages
            },
          }}
        />
    </>
  );
};

export default LeaveDetails;