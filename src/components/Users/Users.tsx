import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Dropdown from "./dropdown/Dropdown";
import './users.scss'
import { deleteUser, setOpenModal } from "../../store/usersSlice";

const Users = () => {
  const { users: userList, filters } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  
  // Apply filters to user list
  const filteredUsers = userList.filter((user) => {
    const matchesDepartment = filters.department.length
      ? filters.department.includes(user.department.value)
      : true;
    const matchesCountry = filters.country
      ? user.country.value === filters.country
      : true;
    const matchesStatus = filters.status !== null ? user.status.value === filters.status : true;

    return matchesDepartment && matchesCountry && matchesStatus;
  });

  const handleDelete = (userName: string) => {
    // Викликаємо action для видалення користувача
    dispatch(deleteUser(userName));
  }
  
  return (
    <div className="users">
      <h1 className="users__title">Users</h1>
      <div className="users__buttons">
        <div className="user-notify">
          Please add at least 3 departmetns to be able to proceed next steps.
        </div>
        <div className="users__controllers">
          <Dropdown/>
          <button 
            className="users__add-button" 
            onClick={() => {
              dispatch(setOpenModal(true))
            }}>Add User</button>
        </div>
      </div>
      <div className="users__block">
        <div className="users__block-header userItem">
          <div className="UserItem__name">Full Name</div>
          <div className="UserItem__department">Departments</div>
          <div className="UserItem__country">Country</div>
          <div className="UserItem__status">status</div>
          <div className="userItem__delete"></div> 
        </div>
        <div className="users__block-body">
          {filteredUsers.map((elem,i) => (
            <div className="userItem" key={i}>
              <div className="UserItem__name">{elem.name}</div>
              <div className="UserItem__department">{elem.department.name}</div>
              <div className="UserItem__country">{elem.country.name}</div>
              <div className="UserItem__status">{elem.status.value}</div>
              <div className="userItem__delete">
                <img src="/src/assets/bin.svg" alt="" onClick={() =>handleDelete(elem.name)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users;