import React from 'react'
import './List.css'
export default function List({ header,list,onClick}) {
  return (
      <div className="list">
        <div className="list-row">
            {header.map((head,index)=><label className="header" key={index}>{head}</label>)}
        </div>

        {list.map((row,index)=>
            <div className="list-row" key={index}>
                  {row.map((col,index)=><label key={index}>{col}</label>)}
                  {onClick && <div onClick={onClick}>view</div>}
            </div>)}
      </div>
  )
}
