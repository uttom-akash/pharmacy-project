import React from 'react'
import './List.css'
export default function List({ header,list,onClick}) {
  return (
      <div className="list">
        {list.map((row,index)=>
                <div className="list-row" key={index}>
                    {row.map((col,index)=><label key={index}>{col}{header[index]}</label>)}
                    {onClick && <div onClick={onClick}>view</div>}
                </div>)}
      </div>
  )
}
