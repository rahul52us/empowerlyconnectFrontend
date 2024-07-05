import React, { useEffect, useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import CustomTable from "../../../config/component/CustomTable/CustomTable";
import store from "../../../store/store";
import { toJS } from "mobx";
import { format } from "date-fns"; // Importing format function from date-fns

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const PunchAttendance: React.FC = observer(() => {
  const {
    AttendencePunch: { getRecentPunch, recentPunch },
  } = store;
  const [userId, setUserId] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [remarks, setRemarks] = useState<string>(""); // State for remarks
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<string>("");

  // Function to get geolocation data
  const getGeolocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => resolve(position),
          (error) => reject(error)
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  // Function to get device information
  const getDeviceInfo = () => {
    setDeviceInfo(navigator.userAgent);
  };

  console.log("The device info:", deviceInfo);
  console.log("The latitude:", latitude);
  console.log("The longitude:", longitude);

  // Punch-in function
  const handlePunchIn = async () => {
    try {
      const position = await getGeolocation();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      getDeviceInfo();

      console.log("The device info:", deviceInfo);
      console.log("The latitude:", latitude);
      console.log("The longitude:", longitude);
    } catch {}
  };

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

  // Punch-out function
  const handlePunchOut = async () => {
    try {
      const position = await getGeolocation();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      getDeviceInfo();

      console.log("The device info:", deviceInfo);
      console.log("The latitude:", latitude);
      console.log("The longitude:", longitude);

      // Optionally send data to server
      const response = await axios.post("http://localhost:3000/punchout", {
        userId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        deviceInfo,
      });
      console.log("Punch-out successful:", response.data);
    } catch (error: any) {
      console.error(
        "Error during punch-out:",
        error.response ? error.response.data : error.message
      );
    }
  };

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

  console.log(toJS(recentPunch))

  return (
    <React.Fragment>
      <CustomTable
        cells={true}
        title="Punch Attendence"
        data={recentPunch.data}
        columns={columns}
        actions={{}}
        loading={recentPunch.loading}
        tableProps={{
          tableBox: { size: "md", minH: "35vh", maxH: "35vh" },
          table: { size: "md" },
        }}
      />
      <div style={{ display: "none" }}>
        <h1>PunchAttendance System</h1>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Remarks"
          value={remarks} // Bind input to remarks state
          onChange={(e) => setRemarks(e.target.value)}
        />
        <button onClick={handlePunchIn}>Punch In</button>
        <button onClick={handlePunchOut}>Punch Out</button>
      </div>
    </React.Fragment>
  );
});

export default PunchAttendance;
