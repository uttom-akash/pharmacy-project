import React from 'react'

export default function CheckBox({name,check,onChange}) {
  return (
    <div>
      <input type="checkbox" name={name} checked={check}  onChange={onChange} className="checkbox">{name}</input><br />  
    </div>
  )
}
