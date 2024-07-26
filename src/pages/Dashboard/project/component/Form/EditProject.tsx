import { observer } from "mobx-react-lite";
import ProjectForm from "./ProjectForm";
import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import { generateProjectInitialValues } from "../utils/function";
import Loader from "../../../../../config/component/Loader/Loader";

const EditProject = observer((projectData: any) => {
  const {
    Project: { getSingleProject, openProjectDrawer },
  } = store;
  const [fetchProjectData, setFetchProjectData] = useState<any>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    setFetchProjectData({ loading: true, data: null });
    getSingleProject({ id: openProjectDrawer?.data?._id })
      .then((data: any) => {
        setFetchProjectData({ loading: false, data: data.data });
      })
      .catch(() => {
        setFetchProjectData({ loading: false, data: null });
      });
  }, [getSingleProject, projectData, openProjectDrawer]);

  return (
    <div>
      {fetchProjectData.loading === false ? (
        fetchProjectData.data && (
          <ProjectForm
            initialValuesOfProjects={generateProjectInitialValues(
              fetchProjectData.data
            )}
          />
        )
      ) : (
        <Loader height="75vh" />
      )}
    </div>
  );
});

export default EditProject;