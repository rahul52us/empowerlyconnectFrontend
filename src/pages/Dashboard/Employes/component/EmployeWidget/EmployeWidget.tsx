import { Grid } from "@chakra-ui/react";
import EmployeWidgetCard from "../../element/EmployeWidgetCard";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import { cardArrayData } from "../../utils/constant";
import { CardDataI } from "../../utils/constant.interface";

const EmployeWidget = observer(() => {
  const [cardData, setCardData] = useState<CardDataI>(cardArrayData);

  const {
    Employe: { getEmployesCount, employesCounts },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getEmployesCount()
      .then((data) => {
        setCardData((prevData) => ({
          ...prevData,
          NoOfEmployes: { ...prevData.NoOfEmployes, value: data },
        }));
      })
      .catch((err) => {
        openNotification({
          type: "error",
          title: "Failed to Position Count",
          message: err?.message,
        });
      });
  }, [getEmployesCount, openNotification]);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
      columnGap={3}
      rowGap={3}
    >
      {Object.entries(cardData).map(([key, item]) => {
        return(
        <EmployeWidgetCard
          key={key}
          title={item.title}
          value={item.value}
          loading={employesCounts.loading}
          icon={item.icon}
          link={item.link}
        />
      )})}
    </Grid>
  );
});

export default EmployeWidget;
