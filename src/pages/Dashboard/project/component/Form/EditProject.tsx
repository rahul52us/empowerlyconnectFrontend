import { observer } from "mobx-react-lite";
import ProjectForm from "./ProjectForm";
import { initialValuesOfProjects } from "../utils/constant";

const EditProject = observer(() => {
  return (
    <div>
      <ProjectForm initialValuesOfProjects={initialValuesOfProjects} />
    </div>
  );
});
export default EditProject;
