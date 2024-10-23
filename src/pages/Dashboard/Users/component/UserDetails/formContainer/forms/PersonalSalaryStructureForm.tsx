import { observer } from "mobx-react-lite"
import SalaryStructureForm from "../../../../../salaryStructure/component/SalaryStructureForm"

const PersonalSalaryStructureForm = observer(() => {
  return (
    <div>
        <SalaryStructureForm />
    </div>
  )
})

export default PersonalSalaryStructureForm