import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../../context/AppContext'
import PopUp from '../utils/PopUp.jsx'

export default function AddItineraire() {
    const [popUp, setPopUp] = useState(false)
    const {user,token}=useContext(AppContext)
    const itineraireRef=useRef('');
    const PointdepartRef=useRef('')
    const PointarriveRef=useRef('')
    const distanceRef=useRef('')
    const navigate=useNavigate()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        const payload={
            itineraire:itineraireRef.current.value,
            p_depart:PointdepartRef.current.value,
            p_arrive:PointarriveRef.current.value,
            distance:Number(distanceRef.current.value),
            user_id:user?.id
        }
        try {
            const response=await fetch('http://127.0.0.1:8000/api/itineraire/store',{
                method:'POST',
                body:JSON.stringify(payload),
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status===304){
                setPopUp(true)
            }
            const itineraire=await response.json()
            if(itineraire){
                navigate('/itineraire')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <h2 className='text-center mb-3 font-bold'>Ajouter un nouveau parcours</h2>
                <input type="text"  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="itineraire" id="itineraire" placeholder="Intituler de l'itinéraire" ref={itineraireRef}/>
                <input type="text"  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="p_depart" id="p_depart" placeholder='Point de depart' ref={PointdepartRef}/>
                <input type="text"  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="p_arrive" id="p_arrive" placeholder="Point d'arrivée" ref={PointarriveRef}/>
                <input type="number"  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="" id="distance" placeholder='Distance (km)' ref={distanceRef}/>
                <div >
                    <button type='submit' className='w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors'>Sauvegarder</button>
                </div>
            </form>
        </div>
        {
            popUp && <PopUp/>
        }
    </div>
  )
}
