import { memo, useState, useEffect, useCallback } from "react";
import classes from "../../CSS/PostCSS/PostSorting.module.css";
export function PostSorting({
  fields = [],
  value,
  orderValue,
  onOrderChange,
  onChange,
  
}) {

  const [localOrder, setLocalOrder] = useState(orderValue);

  // keep local state in sync if parent changes it externally
  useEffect(() => {
    setLocalOrder(orderValue);
  }, [orderValue]);

  // const handleSelect = useCallback((field) => {
  //   if (value === field) {
  //     onChange(""); // unselect
  //   } else {
  //     onChange(field);
  //   }
  // });

   const handleSelect = useCallback(
    (field) => {
      if (value === field) {
        onChange("");
      } else {
        onChange(field);
      }
    },
    [value, onChange]
  );

   // ✅ debounce order changes
  useEffect(() => {
    const handler = setTimeout(() => {
      onOrderChange(localOrder);
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [localOrder, onOrderChange]);

  return (
    // <div className={classes.postSortingContainer}>
    //   <label className={classes.postSortBylabel} htmlFor="sort-by">
    //     Sort By:
    //   </label>
    //   <select
    //     name="sort-by"
    //     id="sort-by"
    //     value={value}
    //     onChange={(e) => onChange(e.target.value)}
    //   >
    //     {fields.map((field) => (
    //       <option
    //         className={classes.postSortingOption}
    //         key={field}
    //         value={field}
    //       >
    //         {field}
    //       </option>
    //     ))}
    //   </select>
    //   {"/"}
    //   <label htmlFor="sort-order">Sort Order:</label>
    //   <select
    //     name="sort-order"
    //     id="sort-order"
    //     value={orderValue}
    //     onChange={(e) => onOrderChange(e.target.value)}
    //   >
    //     <option className={classes.postSortingOption} value={"ascending"}>
    //       ascending
    //     </option>
    //     <option className={classes.postSortingOption} value={"descending"}>
    //       desdending
    //     </option>
    //   </select>
    // </div>
    <div className={classes.container}>
      <div className={classes.div1}>
        {fields.map((field) => (
          <label key={field} className={classes.sortLabel}>
            <input
              type="checkbox"
             
              checked={value === field}
              onChange={() => handleSelect(field)}
              className={classes.sortCheckbox}
            />
            <span className={classes.customSortIndicator}>{field}</span>
          </label>
        ))}
      </div>

      {/* <div className={classes.sortOrderGroup}>
        <label>Order:</label>

        <select
          name="sort-order"
          id="sort-order"
          value={orderValue}
          onChange={(e) => onOrderChange(e.target.value)}
        >
          <option value="ascending">ascending</option>
          <option value="descending">descending</option>
        </select>
      </div> */}

      <div className={classes.div2}>
        {/* <label>Order:</label> */}

        <label className={classes.radioLabel}>
          <input
            type="radio"
          
            name="sort-order"
            value="ascending"
            checked={orderValue === "ascending"}
            onChange={() =>
              onOrderChange(orderValue === "ascending" ? "" : "ascending")
            }
            className={classes.radioInput}
          />
          <span className={classes.customRadio}>ascending</span>
        </label>

        <label className={classes.radioLabel}>
          <input
            type="radio"

            name="sort-order"
            value="descending"
            // checked={orderValue === "descending"}
            // onChange={() =>
            //   onOrderChange(orderValue === "descending" ? "" : "descending")
            // }
            checked={localOrder === "descending"}
            onChange={() =>
              // ✅ CHANGED: update local state instead of calling parent directly
              setLocalOrder(
                localOrder === "descending" ? "" : "descending"
              )
            }
            className={classes.radioInput}
          />
          <span className={classes.customRadio}>descending</span>
        </label>
      </div>
    </div>
  );
}

export default memo(PostSorting);
