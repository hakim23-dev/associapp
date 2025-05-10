import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner';
import { AppContext } from '../../context/AppContext';
import PopUp from '../utils/PopUp.jsx'

export default function UpdateIrineraire() {
    const [itineraire, setItineraire] = useState({})
    const [loading, setLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const {token}=useContext(AppContext)
    const {id}=useParams();
    const itineraireRef=useRef();
    const PointdepartRef=useRef()
    const PointarriveRef=useRef()
    const distanceRef=useRef()
    const navigate=useNavigate()
    
    const fetchOneItineraire=async()=>{
        setLoading(true)
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/itineraire/${id}`)
            if(!response.ok){
                throw new Error
            }
            const itineraire=await response.json();
            setItineraire(itineraire)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const payload={
            itineraire:itineraireRef.current.value,
            p_depart:PointdepartRef.current.value,
            p_arrive:PointarriveRef.current.value,
            distance:Number(distanceRef.current.value)
        }
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/itineraire/update/${id}`,{
                method:'put',
                body:JSON.stringify(payload),
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${token}`,
                }
            })
            if(response.status===403){
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

    useEffect(()=>{
        fetchOneItineraire()
    },[])


    if(loading) return <Spinners/>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <h3 className='text-center mb-3 font-bold'>Modifier les données du parcour</h3>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="itineraire" id="itineraire" defaultValue={itineraire?.nom} ref={itineraireRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="p_depart" id="p_depart" defaultValue={itineraire?.point_depart} ref={PointdepartRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="p_arrive" id="p_arrive" defaultValue={itineraire?.point_arrivee} ref={PointarriveRef}/>
                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="distance" id="distance" defaultValue={itineraire?.distance} ref={distanceRef}/>
                <div >
                    <button className='w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors' type='submit'>Sauvegarder</button>
                </div>
            </form>
        </div>
        {
            popUp && <PopUp/>
        }
    </div>
  )
}
