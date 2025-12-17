import { memo, useCallback, useState } from "react";
import classes from "../../CSS/PostCSS/PostFilter.module.css";
export function PostFilter({ field, value, onChange }) {
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
  const handleRadioChange = useCallback((opt) => {
    if (value === opt) {
      onChange(""); // unselect if already selected
      setInputValue(""); // clear input
    } else {
      onChange(opt);
      setInputValue("");
    }
  });
  return (
    <div className={classes.container}>
      {options.map((opt) => (
        <label key={opt} className={classes.radioLabel}>
          <input
            type="checkbox"
            name={field}
            value={opt}
            checked={value === opt}
            onChange={() => handleRadioChange(opt)}
            className={classes.radioInput}
          />
          <span className={classes.radio}></span>
          {opt}
        </label>
      ))}

      {/* <label htmlFor={`field - ${field}`}>{field}</label> */}
      {value && (
        <input
          placeholder="author"
          type="text"
          name={`filter-${field}`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          className={classes.textInput}
        />
      )}
    </div>
  );
}

export default memo(PostFilter);
