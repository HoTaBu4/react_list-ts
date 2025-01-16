// src/components/Users.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setFilters } from "../../../store/usersSlice";
import { departments } from "../../../data/departments";
import { countries } from "../../../data/countries";
import { statuses } from "../../../data/statuses";
import './dropdown.scss';


const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.users);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleDropdownToggle = (dropdown: string) => {
    switch (dropdown) {
      case 'department':
        setIsDepartmentOpen(!isDepartmentOpen);
        break;
      case 'country':
        setIsCountryOpen(!isCountryOpen);
        break;
      case 'status':
        setIsStatusOpen(!isStatusOpen);
        break;
      default:
        break;
    }
  };


  const handleDepartmentChange = (value: string) => {
    const newDepartments = filters.department.includes(value)
      ? filters.department.filter((d) => d !== value)
      : [...filters.department, value];
    dispatch(setFilters({ ...filters, department: newDepartments }));
  };

  const handleCountryChange = (value: string) => {
    dispatch(setFilters({ ...filters, country: value }));
  };

  const handleStatusChange = (value: string) => {
    dispatch(setFilters({ ...filters, status: value }));
  };

  // Reset filters if departments count is less than 3
  useEffect(() => {
    if (filters.department.length < 3) {
      // dispatch(resetFilters());
    }
  }, [filters.department, dispatch]);

  return (
    <div className="dropdown__main">
      <div className="filters dropdown-departments">
        {/* Department Filter */}
        <div className="dropdown">
          <div className="dropdown__head" onClick={() => handleDropdownToggle('department')}>
            {`Selected (${filters.department.length})`}
            <img
              src="/src/assets/arrow.svg"
              alt="arrow"
              className={`dropdown__arrow ${isDepartmentOpen ? 'rotated' : ''}`}
            />
          </div>
          {isDepartmentOpen && (
            <div className="dropdown__body">
              <div className="dropdown__list">
                {departments.map((dep) => (
                  <label key={dep.value}>
                    <input
                      type="checkbox"
                      checked={filters.department.includes(dep.value)}
                      onChange={() => handleDepartmentChange(dep.value)}
                      disabled={filters.department.length === 3 && !filters.department.includes(dep.value)}
                    />
                    {dep.name}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Country Filter */}
        <div className="dropdown dropdow-country">
          <div className="dropdown__head" onClick={() => handleDropdownToggle('country')}>
            {filters.country ? filters.country : 'country' }
            <img
              src="/src/assets/arrow.svg"
              alt="arrow"
              className={`dropdown__arrow ${isCountryOpen ? 'rotated' : ''}`}
            />
          </div>
          {isCountryOpen && filters.department.length === 3 && (
            <div className="dropdown__body">
              <div className="dropdown__list">
                {countries.map((country) => (
                  <div
                    key={country.value}
                    onClick={() => handleCountryChange(country.value)}
                    className={`dropdown__item ${filters.country === country.value ? 'selected' : ''}`}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="dropdown dropdown-status">
          <div className="dropdown__head" onClick={() => handleDropdownToggle('status')}>
            {filters.status ? filters.status : 'status'} 
            <img
              src="/src/assets/arrow.svg"
              alt="arrow"
              className={`dropdown__arrow ${isStatusOpen ? 'rotated' : ''}`}
            />
          </div>
          {isStatusOpen && filters.department.length === 3 && filters.country && (
            <div className="dropdown__body">
              <div className="dropdown__list">
                {statuses.map((status) => (
                  <div
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    className={`dropdown__item ${filters.status === status.value ? 'selected' : ''}`}
                  >
                    {status.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
