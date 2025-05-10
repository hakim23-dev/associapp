import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import {AppContext} from '../../context/AppContext.jsx'
import PopUp from '../utils/PopUp.jsx'

export default function UpdateBus() {
  const [bus, setBus] = useState({})
  const [loading, setLoading] = useState({})
  const [popUp, setPopUp] = useState(false)

  const immatRef=useRef()
  const capaciteRef=useRef()
  const marqueRef=useRef()
  const modeleRef=useRef()

  const navigate=useNavigate()

  const {id}=useParams()

  const {token}=useContext(AppContext)

  const fetchOneBus=async()=>{
    setLoading(true)
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/bus/${id}`);
      if(!response.ok){
        throw new Error
      }

      const bus=await response.json()
      setBus(bus)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const payload={
      immatriculation:immatRef.current.value,
      capacite:Number(capaciteRef.current.value),
      marque:marqueRef.current.value,
      modele:modeleRef.current.value
    }
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/bus/update/${id}`,{
        method:'PUT',
        body:JSON.stringify(payload),
        headers:{
          'content-type':'application/json',
          Authorization:`Bearer ${token}`
        }
      })
      if(response.status===401){
        setPopUp(true)
      }
      const data=await response.json()
      if(data){
        navigate('/bus')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchOneBus()
  },[])

  if(loading) return <Spinners/>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}> 
          <h3>Modifier les données de bus <span className='text-center mb-3 font-bold'>{bus?.immatriculation}</span> </h3>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="immatriculation" ref={immatRef} defaultValue={bus?.immatriculation}/>
          <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="capacite" ref={capaciteRef} defaultValue={bus?.capacite}/>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="marque" ref={marqueRef} defaultValue={bus?.marque}/>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="modele" ref={modeleRef} defaultValue={bus?.modele}/>
          <div>
            <button type='submit' className='w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors'>Modifier</button>
          </div>
        </form>
      </div>
      {
        popUp && <PopUp/>
      }
    </div>
  )
}
