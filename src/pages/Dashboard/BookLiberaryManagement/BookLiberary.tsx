import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { liberaryBreadCrumb } from "../utils/breadcrumb.constant";
import { Box, Text } from "@chakra-ui/react";

const BookLiberary = observer(() => {
  return (
    <Box>
      <DashPageHeader
        title="Dashboard"
        breadcrumb={liberaryBreadCrumb.liberary}
      />
      <Text>Liberary Index</Text>
    </Box>
  );
});

export default BookLiberary;
