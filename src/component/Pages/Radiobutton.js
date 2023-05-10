
import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

const RadioButton = props => {
  const [background, setBackGround] = useState(1);
  const [getId,setId]= useState('')
  // const radioData = [
  //     { type: 'Pharmacy', id: 1, color: false },
  //     { type: 'Doctor', id: 2, color: false },
  //     { type: 'Stockiest', id: 3, color: false },
  //   ];

  const data= [
    {type: 'Male', id: 1, color: false},
    {type: 'Female', id: 2, color: false},
  ]

  const handleRadio = (item, index) => {
    props.setType(item.type);
     
  };

  return (
    <>
      
      <div style={{display:'flex',flexDirection:'row'}}>
        {props?.data?.map((item, index) => {
          const myTouch =props.getType === item.type;
          return (
            <div
              key={item.id}
              onClick={() => {
                handleRadio(item, index);
              }}>
              <Button
                style={{
                  background:myTouch?'#005db6': ' #a5a5a5' ,
                  //   borderColor: myTouch ? '#34acd3' : '#000',
                  justifyContent:'center',
                  //   borderWidth: 1,
                  alignItems:'center',
                  borderRadius: 5,
                  margin:5,
                }}>
                <text style={{color: myTouch ? '#fff' : '#fff'}}>
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

