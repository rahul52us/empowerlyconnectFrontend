import { observer } from "mobx-react-lite";
import ProjectForm from "./ProjectForm";
import { initialValuesOfProjects } from "../utils/constant";

const CreateProject = observer(() => {
  return <ProjectForm initialValuesOfProjects={initialValuesOfProjects}/>;
});

export default CreateProject;