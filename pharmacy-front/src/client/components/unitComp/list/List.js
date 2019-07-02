import React from 'react'
import './List.css'
export default function List({ header,list,listIndex,onClick,onClick1,clickValue,clickValue1,label,label1}) {
  return (
      <div className="list">
        <div className="list-row">
            {header.map((head,index)=><label className="header" key={index}>{head}</label>)}
        </div>

        {list.map((row,index)=>
            <div className="list-row" key={index}>
                  {listIndex.map((col,index)=><label  key={index}>{row[col]}</label>)}
                  {onClick && <div onClick={()=>onClick(row[clickValue])}>{label}</div>}
                  {onClick && <div onClick={()=>onClick1(row[clickValue1])}>{label1}</div>}
            </div>)}
      </div>
  )
}
