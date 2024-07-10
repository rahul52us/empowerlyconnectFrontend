import { Box } from "@chakra-ui/react";
import PersonalDetailFilter from "./component/PersonalDetailFilter";
import { observer } from "mobx-react-lite";
import PersonalDetailTable from "./component/PersonalDetailTable";
import store from "../../../../store/store";
import { useState } from "react";
import { getStatusType } from "../../../../config/constant/statusCode";
import { generateResponse } from "./utils/function";

const PersonalDetailContainer = observer(() => {
  const [values, setValues] = useState<{ username?: string; code?: string }>({
    username: undefined,
    code: undefined,
  });
  const [searchData, setSearchData] = useState<{
    data: any[];
    loading: boolean;
  }>({
    data: [],
    loading: false,
  });

  const {
    Employe: { getEmployesSubOrdinateDetails },
    auth: { openNotification },
  } = store;

  const fetchData = async () => {
    setSearchData((prev) => ({ ...prev, loading: true }));
    try {
      const response = await getEmployesSubOrdinateDetails({
        username: values.username || undefined,
        code : values.code || undefined
      });
      console.log(response);
      setSearchData((prev) => ({ ...prev, data: response.data }));
    } catch (err: any) {
      openNotification({
        title: "Failed to Get",
        message: err?.data?.message || "An error occurred",
        type: getStatusType(err.status),
      });
    } finally {
      setSearchData((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Box>
      <PersonalDetailFilter
        setValues={setValues}
        values={values}
        fetchData={fetchData}
        loading={searchData.loading}
      />
      <PersonalDetailTable
        data={generateResponse(searchData.data)}
        loading={searchData.loading}
      />
    </Box>
  );
});

export default PersonalDetailContainer;
