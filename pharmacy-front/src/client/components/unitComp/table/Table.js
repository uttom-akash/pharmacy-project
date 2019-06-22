import React from 'react'
import './Table.css'
export default function Table({children}) {
  return (
    <table className="ctable">
      {children}    
    </table>
            
  )
}
