import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {AppContext} from '../../context/AppContext'
import PopUp from '../utils/PopUp'

export default function AddNiveau() {
  const [popup, setPopUp] = useState(false)
  const niveauRef=useRef('')
  const navigate=useNavigate()
  const {user,token}=useContext(AppContext)

  const handleSubmit=async (e) =>{
    e.preventDefault();
    const payload={
      niveau:niveauRef.current.value,
      user_id:user?.id
    }
    try {
      const response= await fetch('http://127.0.0.1:8000/api/niveau/store',{
        method:'POST',
        body:JSON.stringify(payload),
        headers:{
          'content-type':'application/json',
          Authorization:`Bearer ${token}`
        }
      })

      if(response.status===403){
        setPopUp(true)
      }
      const data=await response.json()
      if(data){
        navigate('/niveau')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <h3 className='text-center mb-3 font-bold'>Nouveau Niveau</h3>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="niveau" id="niveau" ref={niveauRef} placeholder='Niveau'/>
          <div >
            <button type='submit' className='w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors'>Sauvegarder</button>
          </div>
        </form>
      </div>
      {
        popup && <PopUp/> 
      }
    </div>
  )
}
