import React, { useState } from "react";
import "../style.css";

function CustomDropdown(props) {
  const initialState = props.options?.[0];
  const [selectedOption, setSelectedOption] = useState(initialState);
  const [click, setclick] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    props.setShowOptions(false);
    style.header.borderRadius = 10;
  };

  const handleShowOptions = () => {
    props.setShowOptions(!props.showOptions);
    style.header.borderRadius = "10px 10px 0px 0px";
  };

  return (
    <div style={style.main}>
      <div
        style={{
          ...style.header,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "#ff7e24",
        }}
        onClick={() => {
          handleShowOptions();
        }}
      >
        {selectedOption ? selectedOption.label : props.label}
        <span style={style.icon}>&#9662;</span>
      </div>
      {props.showOptions && (
        <div
          style={{
            ...style.options,
            backgroundColor: props.optionsbackgroundColor
              ? props.optionsbackgroundColor
              : "#ff7e24",
          }}
        >
          {props.options.map((option) => (
            <div
              key={option.value}
              style={style.option}
              onClick={() => {
                handleOptionSelect(option);
              }}
            >
              {option?.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;

const style = {
  main: {
    position: "relative",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 15,
    // backgroundColor: props.backgroundColor,
    color: "#fff",
    cursor: "pointer",
    height: "24px",
    width: "90px",
  },
  icon: {
    fontsize: "10px",
  },

  options: {
    position: "absolute",
    width: "90px",
    zIndex: 10,
    padding: 0,
    borderRadius: "0px 0px 25px 25px",
  },
  option: {
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    padding: "0px 5px 0px 5px",
    width: "90px",
    backgroundColor: "#005db6",
  },
};
