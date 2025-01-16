import { useState } from "react"
import { departments } from "../../../data/departments"
import DropDownButton from "../../Users/DropDownButton/DropDownButton"
import './popUp.scss';

const PopUp = () => {

  const validate = () => {

  }

  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCountry,setSelectedCountry] = useState(null);

  return (
    <div className="popUp">
      <form className="popUp__block" onSubmit={validate}>
        <h2 className="popUp__text"></h2>
        <div className="popUp__controller">
          <DropDownButton
            list={departments}
            selectedValue={selectedDepartament}
            onChange={(elem) => setSelectedDepartament(elem)}
          />
        </div>
        <div className="popUp__buttons">
          <button className="cancel">cancel</button>
          <button className="add" type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PopUp;