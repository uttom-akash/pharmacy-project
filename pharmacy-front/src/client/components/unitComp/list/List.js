import React from 'react'
import './List.css'
export default function List({ header=[],list,listIndex,onClick,onClick1,clickValue,clickValue1,label,label1,id}) {
  return (
      <div className="list" id={id}>
        <div className="list-row">
            {header.map((head,index)=><label className="header" key={index}>{head}</label>)}
        </div>

        
        {
            list.map((row,index)=>
            <div className="list-row" key={index}>
                  {listIndex.map((col,index)=><label  key={index}>{row[col]}</label>)}

                  {onClick && <div onClick={()=>onClick(row[clickValue])} id="list-btn">{label}</div>}
                  {onClick && <div onClick={()=>onClick1(row[clickValue1])} id="list-btn">{label1}</div>}
            </div>)
        }
      </div>
  )
}
