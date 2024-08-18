import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const Documents = observer(({ setSelectedTab }: any) => {
  return (
    <div>
      Documents
      <Button onClick={() => setSelectedTab({ open: true, type: "documents" })}>
        Edit
      </Button>
    </div>
  );
});

export default Documents;
