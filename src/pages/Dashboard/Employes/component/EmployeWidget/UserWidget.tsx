import { Grid } from "@chakra-ui/react";
import UserWidgetCard from "../../element/EmployeWidgetCard";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import { cardArrayData } from "../../utils/constant";
import { CardDataI } from "../../utils/constant.interface";

const UserWidget = observer(() => {
  const [cardData, setCardData] = useState<CardDataI>(cardArrayData);

  const {
    User: { getUsersCount, UsersCounts },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getUsersCount()
      .then((data) => {
        setCardData((prevData) => ({
          ...prevData,
          NoOfUsers: { ...prevData.NoOfUsers, value: data },
        }));
      })
      .catch((err) => {
        openNotification({
          type: "error",
          title: "Failed to Position Count",
          message: err?.message,
        });
      });
  }, [getUsersCount, openNotification]);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
      columnGap={3}
      rowGap={3}
    >
      {Object.entries(cardData).map(([key, item]) => {
        return(
        <UserWidgetCard
          key={key}
          title={item.title}
          value={item.value}
          loading={UsersCounts.loading}
          icon={item.icon}
          link={item.link}
        />
      )})}
    </Grid>
  );
});

export default UserWidget;
