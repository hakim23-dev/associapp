import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import PopUp from '../utils/PopUp'
import { AppContext } from '../../context/AppContext'

export default function UpdateEleve() {
    const {id}=useParams()
    const [eleve, setEleve] = useState({})
    const [loading, setLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [orphelin, setOrphelin] = useState(eleve?.orphelin)
    const prenomRef=useRef()
    const nomRef=useRef()
    const sexeRef=useRef()
    const birthdayRef=useRef()
    const telephoneRef=useRef()
    const emailRef=useRef()
    const adresseRef=useRef()
    const {token}=useContext(AppContext)

    const fetchOneEleve=async()=>{
        setLoading(true)
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/eleve/${id}`)
            if(!response.ok){
                throw new Error
            }
            const eleve=await response.json()
            setEleve(eleve)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchOneEleve()
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const payload={
            prenom:prenomRef.current.value,
            nom:nomRef.current.value,
            sexe:sexeRef.current.value,
            birthday:birthdayRef.current.value,
            orphelin:orphelin,
            telephone:telephoneRef.current.value,
            email:emailRef.current.value,
            adresse:adresseRef.current.value,
        }
    try {
        const response=await fetch(`http://127.0.0.1:8000/api/eleve/update/${id}`,{
            method:'PUT',
            body:JSON.stringify(payload),
            headers:{
                Accept: "application/json",
                'content-type':'application/json',
                Authorization:`Bearer ${token}`,
            }
        });
        if(response.status===304){
            setPopUp(true)
        }
        const data=await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    }

    if(loading) return <Spinners/>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
            <form className='space-y-4'  onSubmit={handleSubmit}>
                <h3>Modifier les information de l'éleve <span className='text-center mb-3 font-bold'>{eleve.nom} {eleve.prenom}</span> </h3>

                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="prenom"  defaultValue={eleve?.prenom} ref={prenomRef}/>
                <input type="text" name="nom" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"  defaultValue={eleve?.nom} ref={nomRef}/>
                
                <input type="date" name="birthday" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" ref={birthdayRef} defaultValue={eleve.date_naissance}/>
                <input type="text" name="telephone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"  defaultValue={eleve.telephone} ref={telephoneRef}/>
                <input type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" defaultValue={eleve.email} ref={emailRef}/>
                <input type="text" name="adresse" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" defaultValue={eleve.adresse} ref={adresseRef}/>

                <select ref={sexeRef} className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'>
                    <option value="masculin" selected={eleve.sexe==='masculin'}>Masculin</option>
                    <option value="feminin" selected={eleve.sexe==='feminin'}>Feminin</option>
                </select>

                <div className=' flex w-full flex-row rounded-xl bg-white shadow gap-4 px-4 py-2'>
                    <p>Orphelin :</p>
                    <div>
                        <input type="radio" name="orphelin" id="oui" value={'oui'} className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all'  onChange={e=>setOrphelin(e.target.value)}/>
                        <label htmlFor="oui" className='ml-2 text-slate-600 cursor-pointer text-sm'>Oui</label>
                    </div>
                    <div>
                        <input type="radio" name="orphelin" id="non" value={'non'} checked={orphelin==='non'} className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all' onChange={e=>setOrphelin(e.target.value)}/>
                        <label htmlFor="non" className='ml-2 text-slate-600 cursor-pointer text-sm'>Non</label>
                    </div>
                </div>
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
