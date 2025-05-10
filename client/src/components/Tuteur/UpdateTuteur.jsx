import React, { useContext, useEffect,useRef,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner' 
import { AppContext } from '../../context/AppContext'
import PopUp from '../utils/PopUp'

export default function UpdateTuteur() {
    const [tuteur, setTuteur] = useState({})
    const [loading, setLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)

    const cinRef=useRef()
    const nomRef=useRef()
    const prenomRef=useRef()
    const telRef=useRef()
    const emailRef=useRef()
    const adresseRef=useRef()
    const {token}=useContext(AppContext)
    const {id}=useParams()

    const navigate=useNavigate()

    const fetchTuteur=async ()=>{
        setLoading(true)
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/oneTuteur/${id}`)
            if(!response.ok){
                throw new Error('un erreur est produit');
            }
            const fetchedTuteur=await response.json()
            setTuteur(fetchedTuteur)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const payload={
            cin:cinRef.current.value,
            nom:nomRef.current.value,
            prenom:prenomRef.current.value,
            tel:telRef.current.value,
            email:emailRef.current.value ? emailRef.current.value:null,
            adresse:adresseRef.current.value,
        }
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/updateTuteur/${id}`,{
                method:'PUT',
                body:JSON.stringify(payload),
                headers: {
                    Accept: "application/json",
                    "content-type": "application/json",
                    Authorization:`Bearer ${token}`
                },
            })

            if (response.status===403) {
                setPopUp(true)
              }else {
                //console.log(response)
                navigate('/tuteurs');
              }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchTuteur()
    },[])

    if(loading) return <Spinners/>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
            <h3>Modifier les données de <span className='text-center mb-3 font-bold'>{tuteur?.prenom} {tuteur?.nom}</span> </h3>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="cin"  defaultValue={tuteur?.cin} ref={cinRef}/>
                </div>
                <div>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="nom"  defaultValue={tuteur?.nom} ref={nomRef}/>
                </div>
                <div>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="prenom"  defaultValue={tuteur?.prenom} ref={prenomRef}/>
                </div>
                <div>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="tel"  defaultValue={tuteur?.telephone} ref={telRef}/>
                </div>
                <div>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="email"  defaultValue={tuteur?.email} ref={emailRef}/>
                </div>
                <div>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="adresse"  defaultValue={tuteur?.adresse} ref={adresseRef}/>
                </div>
                
                <div>
                    <button type='submit' className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">Sauvegarder</button>
                </div>
            </form>
        </div>
        {
            popUp && <PopUp/>
        }
    </div>
  )
}
