import { memo, useCallback, useState } from "react";
import classes from "../../CSS/PostCSS/PostFilter.module.css";
export function PostFilter({
  // field, value, onChange
  searchBy,
  query,
  onSearchByChange,
  onQueryChange,
}) {
  const [inputValue, setInputValue] = useState("");
  // return (
  //   <div className={classes.postFilterContainer}>
  //     <label htmlFor={`field - ${field}`}>{field}</label>
  //     <input
  //       placeholder="author"
  //       type="text"
  //       name={`filter-${field}`}
  //       value={value}
  //       onChange={(e) => onChange(e.target.value)}
  //     />
  //   </div>
  // );

  // Define options dynamically based on field
  // const options = field === "searchBy" ? ["author", "tag"] : [field];

  // Make sure options include both author and tag
  const options = ["author", "tag"];

  // Handle toggle so user can unselect a radio
  // const handleRadioChange = useCallback((opt) => {
  //   if (value === opt) {
  //     onChange("");
  //     setInputValue("");
  //   } else {
  //     onChange(opt);
  //     setInputValue("");
  //   }
  // });

  const handleSelect = useCallback(
    (opt) => {
      onSearchByChange(opt === searchBy ? "" : opt);
      onQueryChange("");
    },
    [searchBy, onSearchByChange, onQueryChange]
  );
  return (
    <div className={classes.container}>
      <div className={classes.div1}>
        {options.map((opt) => (
          <label key={opt} className={classes.label}>
            <input
              type="checkbox"
              // name={field}
              // value={opt}
              // checked={value === opt}
              checked={searchBy === opt}
              // onChange={() => handleRadioChange(opt)}
              onChange={() => handleSelect(opt)}
              className={classes.input}
            />
            <span className={classes.options}>{opt}</span>
          </label>
        ))}
      </div>

      {/* <label htmlFor={`field - ${field}`}>{field}</label> */}
      {/* {value && ( */}
      {searchBy && (
        <input
          // placeholder="author"
          placeholder={`Search by ${searchBy}`}
          type="text"
          // name={`filter-${field}`}
          // value={inputValue}
          // onChange={(e) => {
          //   setInputValue(e.target.value);
          //   onChange(e.target.value);
          // }}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className={classes.textInput}
        />
      )}
    </div>
  );
}

export default memo(PostFilter);
