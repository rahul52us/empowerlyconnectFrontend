import { observer } from "mobx-react-lite"
import HolidayForm from "./form/HolidayForm"

const EditHoliday = observer(() => {
  return (
    <div>
        <HolidayForm />
    </div>
  )
})

export default EditHoliday