import { observer } from "mobx-react-lite";
import NormalTable from "../../../../config/component/Table/NormalTable/NormalTable";
import store from "../../../../store/store";
import { useEffect, useState, useCallback } from "react";
import { miniTablePageLimit } from "../../../../config/constant/variable";
import { generateManagerData } from "./utils/function";
import useDebounce from "../../../../config/component/customHooks/useDebounce";
import { managerEmployeColumns } from "./utils/constant";

const ManagerEmployes = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(miniTablePageLimit);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    Employe: { getAllManagerEmployes, managerEmployes },
    auth: { openNotification, user },
  } = store;

  const applyGetAllManagerEmployes = useCallback(({ page, limit, reset, search }: any) => {
    const query: any = {};
    query["managerId"] = user._id;
    if (reset) {
      query["page"] = 1;
      query["limit"] = miniTablePageLimit;
    } else {
      query["page"] = page || currentPage;
      query["limit"] = limit || pageLimit;
    }
    if (search) {
      query["search"] = search;
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
  }, [user._id, currentPage, pageLimit, getAllManagerEmployes, openNotification]);

  useEffect(() => {
    if (user.role === "manager") {
      applyGetAllManagerEmployes({ page: currentPage, limit: miniTablePageLimit, search: debouncedSearchQuery });
    }
  }, [user.role, currentPage, debouncedSearchQuery, applyGetAllManagerEmployes]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <NormalTable
      title="Team Members"
      data={generateManagerData(managerEmployes.data)}
      loading={managerEmployes.loading}
      currentPage={currentPage}
      totalPages={managerEmployes.totalPages}
      onPageChange={handleChangePage}
      onSearchChange={handleSearchChange}
      searchValue={searchQuery}
      columns={managerEmployeColumns}
    />
  );
});

export default ManagerEmployes;
