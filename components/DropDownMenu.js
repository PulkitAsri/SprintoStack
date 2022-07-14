import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const filters = {
  Priority: {
    high: {
      selected: false,
      filter: "",
    },
    medium: {
      selected: false,
      filter: "",
    },
    low: {
      selected: false,
      filter: "",
    },
  },
  DueDate: {
    today: {
      selected: false,
      filter: "",
    },
    "tomorrow and after": {
      selected: false,
      filter: "",
    },
    "yesterday and before": {
      selected: false,
      filter: "",
    },
  },
  Status: {
    completed: {
      selected: false,
      filter: "",
    },
    incomplete: {
      selected: false,
      filter: "",
    },
  },
};

const DropDownMenu = () => {
  const [filterState, setFilterState] = useState(filters);

  const handleToggleSelected=(e,filterType, fieldOptions)=>{
    console.log(filterType,fieldOptions);
    setFilterState((prev)=>{
      return{
        ...prev,
        [filterType]:{
          ...prev[filterType],
          [fieldOptions]:{
            ...prev[filterType][fieldOptions],
            selected: !filterState[filterType][fieldOptions].selected
          }
        }
      }
    });
    console.log(filterState[filterType][fieldOptions].selected);
    
  }

  return (
    <div className={styles.dropDownMenu}>
      {Object.entries(filterState).map(([filterType, filterValues]) => (
        <div className={styles.dropDownColumn} key={filterType} name={filterType}>
          <span className={styles.dropDownFilterHeading}>{filterType}</span>
          <div className={styles.dropDownRow}>
            {Object.entries(filterValues).map(([fieldOptions, options]) => (
              <div
                className={styles.dropDownCell}
                key={fieldOptions}
                name={fieldOptions}
                value={options}
                onClick={(e) => {
                    handleToggleSelected(e, filterType, fieldOptions);
                    console.log(options.selected);
                    // console.log(filterType);
                    
                }}
                style={{
                  border: options.selected
                    ? "2px solid red"
                    : "",
                }}
              >
                <span
                  
                >
                  {fieldOptions}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
