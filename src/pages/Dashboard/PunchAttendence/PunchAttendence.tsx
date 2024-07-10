import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { toJS } from "mobx";
import { format } from "date-fns"; // Importing format function from date-fns
import NormalTable from "../../../config/component/Table/NormalTable/NormalTable";
import { generatePunchResponse } from "./utils/function";

const PunchAttendance: React.FC = observer(() => {
  const {
    AttendencePunch: { getRecentPunch, recentPunch },
  } = store;

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatDate = (date: any) => format(date, "yyyy-MM-dd");
    getRecentPunch({
      startDate: formatDate(today),
      endDate: formatDate(tomorrow),
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }, [getRecentPunch]);

  console.log("the recent punch are", toJS(recentPunch));

  const columns: any = [
    {
      headerName: "Date",
      key: "date",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "In",
      key: "punchInTime",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Out",
      key: "punchOutTime",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "WHrs.",
      key: "workingHours",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Status",
      key: "status",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Late Coming",
      key: "lateComingMinutes",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
    {
      headerName: "Early Going",
      key: "earlyGoingMinutes",
      props: {
        row: { textAlign: "center" },
        column: { textAlign: "center" },
      },
    },
  ];

  return (
    <React.Fragment>
      <NormalTable
        title="Punch Attendence"
        data={generatePunchResponse(recentPunch.data)}
        columns={columns}
        loading={recentPunch.loading}
        currentPage={0}
        onPageChange={() => {}}
        onSearchChange={() => {}}
        totalPages={1}
      />
    </React.Fragment>
  );
});

export default PunchAttendance;
