import React from 'react'
import { FaCaretSquareLeft } from 'react-icons/fa'
import {  useNavigate } from 'react-router-dom'

export default function GoBack() {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate(-1)
    }
  return (
    <div>
        <button  onClick={handleClick}>
            <FaCaretSquareLeft size={35} color='#51EDDA'/>
        </button>
    </div>
  )
}
