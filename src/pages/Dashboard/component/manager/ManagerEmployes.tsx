import { observer } from "mobx-react-lite";
import NormalTable from "../../../../config/component/Table/NormalTable/NormalTable";
import store from "../../../../store/store";
import { useEffect, useState } from "react";
import { miniTablePageLimit } from "../../../../config/constant/variable";
import { generateManagerData } from "./utils/function";

const ManagerEmployes = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(miniTablePageLimit);

  const {
    Employe: { getAllManagerEmployes, managerEmployes },
    auth: { openNotification, user },
  } = store;

  useEffect(() => {
    if (user.role === "manager") {
      getAllManagerEmployes({
        page: 1,
        limit: miniTablePageLimit,
        managerId: user._id,
      })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            type: "error",
            title: "Failed to get users",
            message: err?.message,
          });
        });
    }
  }, [getAllManagerEmployes, openNotification, user]);

  // function to get the data from backend on the page, limit, date and others
  const applyGetAllManagerEmployes = ({ page, limit, reset }: any) => {
    const query: any = {};
    query["managerId"] = user._id;
    if (reset) {
      query["page"] = 1;
      query["limit"] = miniTablePageLimit;
    } else {
      query["page"] = page || currentPage;
      query["limit"] = limit || pageLimit;
    }
    getAllManagerEmployes(query)
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: "error",
          title: "Failed to get users",
          message: err?.message,
        });
      });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    applyGetAllManagerEmployes({ page, limit: pageLimit });
  };

  return (
    <NormalTable
      title="Team Members"
      data={generateManagerData(managerEmployes.data)}
      loading={managerEmployes.loading}
      currentPage={currentPage}
      totalPages={managerEmployes.totalPages}
      onPageChange={handleChangePage}
    />
  );
});

export default ManagerEmployes;
