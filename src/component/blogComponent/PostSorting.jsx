import { memo, useCallback } from "react";
import classes from "../../CSS/PostCSS/PostSorting.module.css";
export function PostSorting({
  fields = [],
  value,
  orderValue,
  onOrderChange,
  onChange,
}) {
  const handleSelect = useCallback((field) => {
    if (value === field) {
      onChange(""); // unselect
    } else {
      onChange(field);
    }
  });
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
            <span className={classes.customSortIndicator}></span>
            {field}
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
            checked={orderValue === "descending"}
            onChange={() =>
              onOrderChange(orderValue === "descending" ? "" : "descending")
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
