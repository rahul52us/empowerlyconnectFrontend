import { useEffect, useState } from "react";
import CustomTable from "../../../../config/component/CustomTable/CustomTable";
import FormModel from "../../../../config/component/common/FormModel/FormModel";
import store from "../../../../store/store";
import { tablePageLimit } from "../../../../config/constant/variable";
import DeleteModel from "../../../../config/component/common/DeleteModel/DeleteModel";
import { Box, Text, useColorMode } from "@chakra-ui/react";

const DepartmentDetails = ({ selectedCategory, setSelectedCategory }: any) => {
  const {colorMode} = useColorMode()
  const [openModel, setOpenModel] = useState<any>({
    open: false,
    data: null,
    type: "add",
    loading: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const {
    DepartmentStore: { getAllDepartment, departments, deleteDepartment },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    setLoading(true);
    getAllDepartment(selectedCategory?.data?._id, {
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
  }, [getAllDepartment, openNotification, selectedCategory]);

  // function to get the data from backend on the page, limit, date and others
  const applyGetAllEmployes = ({ page, limit, reset }: any) => {
    const query: any = {};
    if (reset) {
      query["page"] = 1;
      query["limit"] = tablePageLimit;
    } else {
      query["page"] = page || currentPage;
      query["limit"] = limit || tablePageLimit;
    }
    setLoading(true);
    getAllDepartment(selectedCategory?.data?._id, query)
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

  const deleteRecord = (id: any) => {
    setOpenModel((prev: any) => ({ ...prev, loading: true }));
    deleteDepartment(id)
      .then(() => {
        openNotification({
          type: "success",
          title: "Deleted Successfully",
          message: "Record Has been Deleted Successfully",
        });
        applyGetAllEmployes({ page: 1, limit: tablePageLimit });
        setOpenModel({ loading: false, open: false, data: null, type: "add" });
      })
      .catch((err) => {
        openNotification({
          type: "error",
          title: "Failed to get Department Categories",
          message: err?.message,
        });
      })
      .finally(() => {
        setOpenModel((prev: any) => ({ ...prev, loading: false }));
      });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    applyGetAllEmployes({ page, limit: tablePageLimit });
  };

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
      headerName: "Code",
      key: "code",
    },
    {
      headerName: "Created At",
      type: "date",
      key: "createdAt",
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
      <FormModel
        loading={departments.loading}
        title={`${selectedCategory.data?.title} (${selectedCategory?.data?.code})`}
        open={selectedCategory.open}
        close={() => setSelectedCategory({ open: false, data: null, id: null })}
      >
        <CustomTable
          columns={columns}
          data={data}
          loading={loading}
          actions={{
            actionBtn: {
              addKey: {
                showAddButton: true,
                function: () => {},
              },
              editKey: {
                showEditButton: true,
                function: () => {},
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
      </FormModel>
      {openModel?.open && openModel?.type === "delete" && (
        <DeleteModel
          id={openModel?.data?._id}
          open={openModel?.open}
          close={() => {
            setOpenModel({
              type: "add",
              data: null,
              open: false,
              loading: false,
            });
          }}
          title={openModel?.data?.title}
          submit={(id: any) => deleteRecord(id)}
          loading={openModel?.loading}
        >
          <Box p={5} textAlign="center" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold" mb={3}>
              Confirm Deletion
            </Text>
            <Text fontWeight="bold" color={colorMode === "dark" ? "white" : "gray.800"} fontSize="lg" mb={4}>
              Are you sure you want to delete the position{" "}
              <Text as="span" color="red.500" fontWeight="bold">
                "{openModel?.data?.title}"
              </Text>
              ? This action cannot be undone. All associated data will also be
              permanently removed.
            </Text>
          </Box>
        </DeleteModel>
      )}
    </>
  );
};

export default DepartmentDetails;
