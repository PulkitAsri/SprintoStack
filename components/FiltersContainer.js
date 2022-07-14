import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import DropDownMenu from "./DropDownMenu";

const FiltersContainer = () => {
  const [open, setOpen] = useState(false);
  const initialState={};
  const [allFilters, setAllFilters] = useState(initialState);
  const handleApplyFilters= (e)=>{
    e.preventDefault();
    setOpen(false)

  }
  const handleResetFilters= (e)=>{
    e.preventDefault();
    setOpen(false)

  }
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersOptionsWrapper}>
        <button onClick={() => setOpen(!open)}>Add Filter</button>
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleResetFilters}>Reset</button>
      </div>
      {open && <DropDownMenu onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />}
    </div>
  );
};

export default FiltersContainer;
