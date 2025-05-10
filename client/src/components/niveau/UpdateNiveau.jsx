import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import PopUp from '../utils/PopUp'
import { AppContext } from '../../context/AppContext'

export default function UpdateNiveau() {
  const [niveau, setNiveau] = useState({})
  const [loading, setLoading] = useState(false)
  const [popup, setPopUp] = useState(false)
  const {id}=useParams()
  const niveauRef=useRef()
  const navigate=useNavigate()
  const {token}=useContext(AppContext)

  const fetchOneNiveau=async()=>{
    setLoading(true)
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/niveau/${id}`)
      if(!response.ok){
        throw new Error
      }
      const data=await response.json()
      setNiveau(data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const handleSubmit=async (e) =>{
    e.preventDefault();
    const payload={
      niveau:niveauRef.current.value,
    }
    try {
      const response= await fetch(`http://127.0.0.1:8000/api/niveau/update/${id}`,{
        method:'PUT',
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

  useEffect(()=>{
    fetchOneNiveau()
  },[])

  if(loading) return <Spinners/>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <h2 className='text-center mb-3 font-bold'>Modifier le Niveau</h2>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="niveau" id="niveau" ref={niveauRef} defaultValue={niveau?.label}/>
          <div >
            <button className='w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors' type='submit'>Sauvegarder</button>
          </div>
        </form>
      </div>
      {
        popup && <PopUp/> 
      }
    </div>
  )
}
