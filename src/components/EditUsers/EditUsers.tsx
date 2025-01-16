import { useEffect, useState } from "react";
import { countries } from "../../data/countries";
import { departments } from "../../data/departments";
import { statuses } from "../../data/statuses";
import DropDownButton from "../Users/DropDownButton/DropDownButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateUser, setOpenModal } from "../../store/usersSlice";
import { User } from "../../types/userType";
import './editUsers.scss';

const EditUsers = () => {
  const { users } = useSelector((state: RootState) => state.users);
  const [name, setName] = useState('');
  const [selectedDepartament, setSelectedDepartament] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [previousUser, setPreviousUser] = useState<User | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (users.length > 0) {
      const firstUser = users[0];
      setEditingUser(firstUser);
      setPreviousUser(firstUser); 
      setName(firstUser.name);
      setSelectedDepartament(firstUser.department?.value || null);
      setSelectedStatus(firstUser.status?.value || null);
      setSelectedCountry(firstUser.country?.value || null);
    }
  }, [users]);

  const handleSetSelectedDepartament = (elem: string) => {
    setSelectedDepartament(elem);
  };

  const handleSetSelectedStatus = (elem: string) => {
    setSelectedStatus(elem);
  };

  const handleSetSelectedCountry = (elem: string) => {
    setSelectedCountry(elem);
  };

  const handleSelectUser = (index: string) => {
    const selectedUser = users[parseInt(index)];
    if (selectedUser) {
      setEditingUser(selectedUser);
      setPreviousUser(selectedUser);
      setName(selectedUser.name);
      setSelectedDepartament(selectedUser.department?.value || null);
      setSelectedStatus(selectedUser.status?.value || null);
      setSelectedCountry(selectedUser.country?.value || null);
    }
  };

  const validate = (e: React.FormEvent) => {
    e.preventDefault();

    const department = departments.find((dept) => dept.value === selectedDepartament);
    const status = statuses.find((stat) => stat.value === selectedStatus);
    const country = countries.find((c) => c.value === selectedCountry);

    if (!department && !status && !country && name === editingUser?.name) {
      alert("At least one field must be updated!");
      return;
    }

    const updatedUser: User = {
      ...editingUser,
      name,
      status: status ? { name: status.name, value: status.value } : editingUser?.status,
      department: department ? { name: department.name, value: department.value } : editingUser?.department,
      country: country ? { name: country.name, value: country.value } : editingUser?.country,
    };

    dispatch(updateUser(updatedUser));
    dispatch(setOpenModal(false)); 
    alert("User updated successfully!");

    setPreviousUser(updatedUser);
  };

  const handleUndo = () => {
    if (previousUser) {
      setEditingUser(previousUser);
      setName(previousUser.name);
      setSelectedDepartament(previousUser.department?.value || null);
      setSelectedStatus(previousUser.status?.value || null);
      setSelectedCountry(previousUser.country?.value || null);
    }
  };

  return (
    <div className="editUser">
      <h2 className="editUser__h2">EDIT USER</h2>
      <div className="editUser__selection-user">
        <DropDownButton
          list={users.map((user, i) => {
            return { 'name': user.name, 'value': String(i) };
          })}
          selectedValue={editingUser?.name || ""}
          onChange={handleSelectUser}
        />
      </div>
      <h3 className="editUser__info-text">
        User Information
      </h3>

      <form className="editUser__info" onSubmit={validate}>
        <div className="editUser__controller">
          <div className="editUser__section">
            Fullname
            <input 
              type="text" 
              className="editUser__section-input" 
              value={name} 
              onChange={(elem) => {setName(elem.target.value)}} 
            />
          </div>
          <div className="editUser__section">
            Department
            <DropDownButton
              list={departments}
              selectedValue={selectedDepartament}
              onChange={handleSetSelectedDepartament}
            />
          </div>
          <div className="editUser__section">
            Status
            <DropDownButton
              list={statuses}
              selectedValue={selectedStatus}
              onChange={handleSetSelectedStatus}
            />
          </div>
          <div className="editUser__section">
            Country
            <DropDownButton
              list={countries}
              selectedValue={selectedCountry}
              onChange={handleSetSelectedCountry}
            />
          </div>
        </div>

        <div className="editUser__buttons">
          <button type="button" className="editUser__undo" onClick={handleUndo}>Undo</button>
          <button type="submit" className="editUser__save">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
