import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import PopUp from '../utils/PopUp.jsx'

export default function AddChauffeur() {
    const [popUp, setPopUp] = useState(false)
    const {user,token}=useContext(AppContext)
    const cinRef=useRef('')
    const permisRef=useRef('')
    const prenomRef=useRef('')
    const nomRef=useRef('')
    const telRef=useRef('')
    const emailRef=useRef('')
    const adresseRef=useRef('')
    const navigate=useNavigate();

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
            user_id:user.id
        }
        try {
            const response=await fetch('http://127.0.0.1:8000/api/chauffeur/store',{
                method:'POSt',
                body:JSON.stringify(payload),
                headers:{
                    Accept: "application/json",
                    'content-type':'application/json',
                    Authorization:`Bearer ${token}`
                },
            })
            if(response.status===403){
                setPopUp(true)
            }
            const data=await response.json();
            if(data){
                navigate('/chauffeur')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div  className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <h3 className='font-bold text-center'>Données du chauffeur</h3>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="cin" id="cin" placeholder='C.I.N' ref={cinRef}/>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="permis" id="permis" placeholder='Permis' ref={permisRef}/>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="prenom" id="prenom" placeholder='Prénom' ref={prenomRef}/>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="nom" id="nom" placeholder='Nom' ref={nomRef}/>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="tel" id="tel" placeholder='Tel.' ref={telRef}/>
                <input type="email" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="email" id="email" placeholder='Email' ref={emailRef}/>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="adresse" id="adresse" placeholder='Adresse' ref={adresseRef}/>
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
