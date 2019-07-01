import React from 'react'
import './List.css'
export default function List({ header,list,listIndex,onClick}) {
  return (
      <div className="list">
        <div className="list-row">
            {header.map((head,index)=><label className="header" key={index}>{head}</label>)}
        </div>

        {list.map((row,index)=>
            <div className="list-row" key={index}>
                  {listIndex.map((col,index)=><label key={index}>{row[col]}</label>)}
                  {onClick && <div onClick={onClick}>view</div>}
            </div>)}
      </div>
  )
}
