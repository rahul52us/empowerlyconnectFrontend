import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const CompanyDetails = observer(({ setSelectedTab }: any) => {
  return (
    <div>
      CompanyDetails
      <Button
        onClick={() => setSelectedTab({ open: true, type: "company-details" })}
      >
        Edit
      </Button>
    </div>
  );
});

export default CompanyDetails;
