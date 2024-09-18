import { observer } from "mobx-react-lite"
import FormModel from "../../../../../../../config/component/common/FormModel/FormModel"
import store from "../../../../../../../store/store"

const SearchTripAmount = observer(() => {
  const {tripStore : {searchModel, setOpenSearchTrip}} = store
  return (
    <FormModel title="Search Trips Amount" open={searchModel.open} close={() => setOpenSearchTrip({open : false})}>

    </FormModel>
  )
})

export default SearchTripAmount