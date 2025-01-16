import { useState } from "react"
import { departments } from "../../../data/departments"
import DropDownButton from "../../Users/DropDownButton/DropDownButton"
import './popUp.scss';
import { statuses } from "../../../data/statuses";
import { countries } from "../../../data/countries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addUser, setOpenModal } from "../../../store/usersSlice";

const PopUp = () => {
  const [name,setName] = useState('');
  const [selectedDepartament, setSelectedDepartament] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCountry,setSelectedCountry] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSetSelectedDepartament = (elem: string) => {
    setSelectedDepartament(elem)
  }
  const handleSetSelectedStatus = (elem: string) => {
    setSelectedStatus(elem)
  }
  const handleSetSelectedCountry = (elem: string) => {
    setSelectedCountry(elem)
  }

  const validate = (e: React.FormEvent) => {
    e.preventDefault(); 

    const department = departments.find(
      (dept) => dept.value === selectedDepartament
    );
    const status = statuses.find((stat) => stat.value === selectedStatus);
    const country = countries.find((c) => c.value === selectedCountry);

    if (!name || !department || !status || !country) {
      alert("All fields are required!");
      return;
    }

    const newUser = {
      name,
      status: {
        name: status.name,
        value: status.value,
      },
      department: {
        name: department.name,
        value: department.value,
      },
      country: {
        name: country.name,
        value: country.value,
      },
    };

    dispatch(addUser(newUser));
    dispatch(setOpenModal(false))
    alert("User added successfully!");
    setName("");
    setSelectedDepartament(null);
    setSelectedStatus(null);
    setSelectedCountry(null);
  };

  return (
    <div className="popUp">
      <form className="popUp__block" onSubmit={validate}>
        <h2 className="popUp__text">ADD USER</h2>
        <div className="popUp__controller">
          <div className="popUp__selector popUp--input">
            Full Name
            <input 
              value={name}  
              onChange={(elem) => {setName(elem.target.value)}}
              className="popUp__input"
              placeholder="Enter full Name"
            />
          </div>
          <div className="popUp__selector">
            Department
            <DropDownButton
              list={departments}
              selectedValue={selectedDepartament}
              onChange={handleSetSelectedDepartament}
            />
          </div>
          <div className="popUp__selector">
            Country
            <DropDownButton
              list={statuses}
              selectedValue={selectedStatus}
              onChange={handleSetSelectedStatus}
            />
          </div>
          <div className="popUp__selector">
            Status
            <DropDownButton
              list={countries}
              selectedValue={selectedCountry}
              onChange={handleSetSelectedCountry}
            />
          </div>
        </div>
        <div className="popUp__buttons">
          <button className="cancel" onClick={() => {
            dispatch(setOpenModal(false))
          }}>cancel</button>
          <button className="add" type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PopUp;