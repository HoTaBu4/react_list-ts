import React, { useState } from "react";
import './DropDownButton.scss'

interface DropDownItem {
  value: string; 
  name: string; 
}

interface DropDownButtonProps {
  list: DropDownItem[];        
  selectedValue: string | null; 
  onChange: (value: string) => void;
  placeholder?: string;           
  label?: string;                 
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  list,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  label = "Dropdown",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (value: string) => {
    onChange(value);
    setIsOpen(false); 
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown__head"
        onClick={handleDropdownToggle}
        role="button"
        aria-expanded={isOpen}
        aria-label={`${label} toggle`}
      >
        {selectedValue || placeholder}
        <img
          src="/src/assets/arrow.svg"
          alt="arrow"
          className={`dropdown__arrow ${isOpen ? "rotated" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="dropdown__body">
          <div className="dropdown__list">
            {list.map((item,i) => (
              <div
                key={item.value}
                onClick={() => handleItemClick(item.value)}
                className={`dropdown__item ${
                  selectedValue === item.value ? "selected" : ""
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
