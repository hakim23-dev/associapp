import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import { AppContext } from '../../context/AppContext'
import PopUp from '../utils/PopUp.jsx'

export default function UpdateChauffeur() {
    const [chauffeur, setChauffeur] = useState({})
    const [loading, setLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const cinRef=useRef()
    const permisRef=useRef()
    const prenomRef=useRef()
    const nomRef=useRef()
    const telRef=useRef()
    const emailRef=useRef()
    const adresseRef=useRef()
    const {id}=useParams()
    const {token}=useContext(AppContext)

    const fetchOneChauffeur=async ()=>{
        setLoading(true)
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/chauffeur/${id}`);
            if(!response.ok){
                throw new Error
            }
            const chauffeur=await response.json()
            setChauffeur(chauffeur)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const payload={
            cin:cinRef.current.value,
            permis:permisRef.current.value,
            prenom:prenomRef.current.value,
            nom:nomRef.current.value,
            telephone:telRef.current.value,
            email:emailRef.current.value,
            adresse:adresseRef.current.value,
        }
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/chauffeur/update/${id}`,{
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
            const data=await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchOneChauffeur()
    },[])

    if(loading) return <Spinners/>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <h3> Modifier le chauffeur <span className='text-center mb-3 font-bold'>{chauffeur?.prenom} {chauffeur?.nom}</span>  </h3>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="cin" id="cin" defaultValue={chauffeur?.cin} ref={cinRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="permis" id="permis" defaultValue={chauffeur?.permis} ref={permisRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="prenom" id="prenom" defaultValue={chauffeur?.prenom} ref={prenomRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="nom" id="nom" defaultValue={chauffeur?.nom} ref={nomRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="tel" id="tel" defaultValue={chauffeur?.telephone} ref={telRef}/>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="email" id="email" defaultValue={chauffeur?.email} ref={emailRef}/>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="adresse" id="adresse" defaultValue={chauffeur?.adresse} ref={adresseRef}/>
                <div >
                    <button className='w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors' type='submit'>Modifier</button>
                </div>
            </form>
        </div>
        {
            popUp && <PopUp/>
        }
    </div>
  )
}
