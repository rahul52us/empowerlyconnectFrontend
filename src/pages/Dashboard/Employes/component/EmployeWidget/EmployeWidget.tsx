import { Grid } from "@chakra-ui/react";
import { cardDataArray } from "../../utils/constant";
import EmployeWidgetCard from '../../element/EmployeWidgetCard'
import { observer } from "mobx-react-lite";

const EmployeWidget = observer(() => {
  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
      columnGap={3}
      rowGap={3}
    >
      {cardDataArray.map((item: any, index: number) => (
        <EmployeWidgetCard
          key={index}
          title={item.key}
          value={item.value}
          loading={false}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </Grid>
  );
});

export default EmployeWidget;
