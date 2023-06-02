import React, { useState } from "react";
import { Button } from "react-bootstrap";

const RadioButton = (props) => {
  const handleRadio = (item, index) => {
    props.setType(item.type);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {props?.data?.map((item, index) => {
          const myTouch = props.getType === item.type;
          const disabled = props.disabled === true;
          return (
            <div
              key={item.id}
              onClick={() => {
                handleRadio(item, index);
              }}
            >
              <Button
                style={{
                  background: myTouch ? "#005db6" : " #a5a5a5",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  margin: 5,
                }}
                disabled={disabled ? true : false}
              >
                <text style={{ color: myTouch ? "#fff" : "#fff" }}>
                  {item.type}
                </text>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RadioButton;
