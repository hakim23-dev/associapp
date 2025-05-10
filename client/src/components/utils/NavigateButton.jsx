import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


export default function NavigateButton(props) {
    const navigate=useNavigate()
    const {destination,nom}=props
  return (
    <div className='flex justify-end'>
        <button onClick={()=>navigate(`/${destination}`)} className='flex mb-4 rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2' ><FaPlus size={20}/> Nouveau {nom}</button>
    </div>
  )
}
