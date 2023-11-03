import React, { useState } from "react";
import "./sortTest.css";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";

const SortTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelectedSort(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <button className="button" onClick={toggleMenu}>
        <div className="text-wrapper">{selectedSort || "Sort By"}</div>
        <ArrowIcon className="vuesax-linear-arrow" />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => selectOption("Option1")}
          >
            Option1
          </div>
          <div
            className="dropdown-item"
            onClick={() => selectOption("Option2")}
          >
            Option2
          </div>
        </div>
      )}
    </div>
  );
};

export default SortTest;
