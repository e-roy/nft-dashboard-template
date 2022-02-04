import { useState, useEffect } from "react";
import "./style.css";

const SelectDropdown = ({ options, onChange, value }) => {
  const [active, setActive] = useState({});

  useEffect(() => {
    let result = options.find((option) => option.value === Number(value));
    setActive(result);
  }, [options, value]);

  return (
    <select className="select" value={active.value} onChange={onChange}>
      {options.map((o, i) => {
        return (
          <option key={i} value={o.value}>
            {o.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectDropdown;
