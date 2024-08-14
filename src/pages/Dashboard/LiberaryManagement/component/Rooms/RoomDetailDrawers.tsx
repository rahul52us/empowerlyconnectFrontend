import { observer } from "mobx-react-lite";
import CustomDrawer from "../../../../../config/component/Drawer/CustomDrawer";
import store from "../../../../../store/store";
import RoomView from "./RoomDetails/forms/RoomView";
import AddRoom from "./RoomDetails/forms/AddRoom";
import EditRoom from "./RoomDetails/forms/EditRoom";
import SeatForm from "./SeatDetails/form/SeatForm";

const RoomDetailDrawer = observer(({ fetchRecords }: any) => {
  const {
    bookLiberary: { handleRoomForm, roomForm, roomSeatForm , handleRoomSeatForm},
  } = store;

  return (
    <>
      <CustomDrawer
        open={roomForm.open}
        title={roomForm.type === "add" ? "CREATE NEW Room" : "UPDATE Room"}
        close={() => handleRoomForm({ open: false, type: "add", data: null })}
        width={roomForm.type === "view" ? "75vw" : "90vw"}
      >
        {roomForm.type === "view" ? (
          <RoomView data={roomForm.data} />
        ) : roomForm.type === "add" ? (
          <AddRoom
            fetchRecords={fetchRecords}
            data={roomForm.data}
            close={() =>
              handleRoomForm({ open: false, type: "add", data: null })
            }
          />
        ) : (
          <EditRoom
            fetchRecords={fetchRecords}
            data={roomForm.data}
            close={() =>
              handleRoomForm({ open: false, type: "add", data: null })
            }
          />
        )}
      </CustomDrawer>
      <CustomDrawer
        open={roomSeatForm.open}
        title={roomSeatForm.type === "add" ? "CREATE SEATS" : "UPDATE SEATS"}
        close={() => handleRoomSeatForm({ open: false, type: "add", data: null })}
        width={roomSeatForm.type === "view" ? "75vw" : "90vw"}
      >
        {roomSeatForm.type === "view" ? (
          <RoomView data={roomSeatForm.data} />
        ) : roomSeatForm.type === "add" ? (
          <SeatForm data={roomSeatForm.data}/>
        ) : (
          <EditRoom
            fetchRecords={fetchRecords}
            data={roomForm.data}
            close={() =>
              handleRoomSeatForm({ open: false, type: "add", data: null })
            }
          />
        )}
      </CustomDrawer>
      </>
  );
});

export default RoomDetailDrawer;
