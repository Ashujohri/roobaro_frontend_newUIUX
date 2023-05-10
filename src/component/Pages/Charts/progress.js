import React, { useState } from 'react'
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Dropdown from '../../Dropdown/dropdown';

const percentage = 60;
const name = 'sachin';
export default function Progress() {
  





  return (
    <div style={{  width: 280, height: 270, backgroundColor: 'white', borderRadius: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 20 }}>

      <div style={{ textAlign: 'left' ,paddingLeft:10,fontFamily:'Poppins',color:'black',fontWeight:800}}>
        Total Engagement Time

      </div>

      <div style={{  width: 150, height: 150, alignSelf: 'center', trailColor: '#d6d6d6', marginTop: 20, position: "relative" }}>
         <CircularProgressbarWithChildren
         fillOpacity={1}
        value={20}
        strokeWidth={14}
        styles={buildStyles({
          pathColor: `#2a86df `,
          textColor: 'yelow',
          trailColor: '#005db6',


        })}

        >
          
          <div style={{flexDirection:'column'}}>
          <div style={{fontSize:24}}>
            56%
          </div>
          <div style={{fontSize:18}}>
          Shivani
          </div>
          </div>
        
        </CircularProgressbarWithChildren>




        </div>
        <div style={{marginTop: 15, flexDirection: 'row', display: 'flex' ,width:"170px",alignSelf:'center'/* ,background:'red' */}}>
        <Dropdown  />
        <div style={{marginLeft:10}}>
          <Dropdown/>
          </div>



      </div>

    </div>



  )
}

