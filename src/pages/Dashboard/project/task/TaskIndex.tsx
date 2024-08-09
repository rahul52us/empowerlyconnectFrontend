import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import CustomDrawer from "../../../../config/component/Drawer/CustomDrawer";
import PageLoader from "../../../../config/component/Loader/PageLoader";
import { getStatusType } from "../../../../config/constant/statusCode";
import store from "../../../../store/store";
import { projectBreadCrumb } from "../../utils/breadcrumb.constant";
import AddTask from "./component/form/AddTask";
import TaskPage from "./component/TaskPage/TaskPage";

const TaskIndex = observer(() => {
  const [projectDetails, setProjectDetails] = useState<any>({
    loading: false,
    data: null,
  });
  const [taskData, setTaskData] = useState<any>();
  const {
    Project: { getSingleProject, setOpenTaskDrawer, openTaskDrawer, getTasks },
    auth: { openNotification },
  } = store;
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      setProjectDetails({ loading: true, data: null });
      getSingleProject({ id: projectId })
        .then((data: any) => {
          setProjectDetails({ loading: false, data: data.data });
          getTasks({ id: projectId })
            .then((response) => {
              setTaskData(response?.data);
            })
            .catch((err) => {
              openNotification({
                title: "Failed to Get",
                message: err?.data?.message || "An error occurred",
                type: getStatusType(err.status),
              });
            });
        })
        .catch((err) => {
          openNotification({
            title: "Failed to Get",
            message: err?.data?.message || "An error occurred",
            type: getStatusType(err.status),
          });
          setProjectDetails({ loading: false, data: null });
        });
    }
  }, [openNotification, getSingleProject, projectId, getTasks]);

  // console.log("projectDetails", taskData?.data);

  return (
    <React.Fragment>
      <Box>
        <DashPageHeader
          title="Project"
          breadcrumb={projectBreadCrumb.task.index}
        />
        <PageLoader
          loading={projectDetails.loading}
          noRecordFoundText={projectDetails.data === null ? true : false}
        >
          {projectDetails.data && (
            <Box p={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size={"sm"}>
                  project :- {projectDetails.data.project_name}
                </Heading>
                <Button
                  onClick={() =>
                    setOpenTaskDrawer("create", { projectId: projectId })
                  }
                >
                  CREATE TASK
                </Button>
              </Flex>
              <Box p={5}>
                {/* <Board 
                taskData={taskData?.data}
                /> */}
                <TaskPage taskData={taskData?.data} />
              </Box>
            </Box>
          )}
        </PageLoader>
      </Box>
      <CustomDrawer
        title="CREATE NEW TASK"
        open={openTaskDrawer.open}
        close={() => setOpenTaskDrawer("create")}
        width={"75vw"}
      >
        <AddTask projectId={openTaskDrawer?.data?.projectId} />
      </CustomDrawer>
    </React.Fragment>
  );
});

export default TaskIndex;
