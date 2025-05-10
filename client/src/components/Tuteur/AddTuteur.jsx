import {  Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import React, {useContext, useRef, useState } from 'react'
import { MdDangerous } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import {AppContext} from '../../context/AppContext'
import PopUp from '../utils/PopUp';

export default function AddTuteur() {
    const [modal, setModal] = useState(false)
    const [tuteur, setTuteur] = useState(null)
    const [popUp, setPopUp] = useState(false)
    const {user,token}=useContext(AppContext)
    const cinRef=useRef('')
    const nomRef=useRef('')
    const prenomRef=useRef('')
    const telRef=useRef('')
    const emailRef=useRef('')
    const adresseRef=useRef('')
    const navigate=useNavigate()

    const handleCheck= async ()=>{
      const payload={
        cin:cinRef.current.value
      }

      try {
        const response=await fetch('http://127.0.0.1:8000/api/checkCin',{
          method:'POST',
          body:JSON.stringify(payload),
          headers: {
            "content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        });

        if (response.status===403) {
          setPopUp(true)
        }

        const res=await response.json()

        if(res.msg){
          setModal(true)
          setTuteur(res.tuteur)
        }

      } catch (error) {
        console.log(error)
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
        userId:user?.id,
      }
      
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/addTuteur`,{
          method:'POST',
          body:JSON.stringify(payload),
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization:`Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error("La réponse du réseau n'était pas correcte");
        }

        const res=await response.json()
        if(res){
          navigate('/tuteurs')
        }

      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8'>
          <h3 className='text-center mb-3 font-bold'>Nouveau Tuteur</h3>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="cin" id="" ref={cinRef} placeholder='C.I.N' onBlur={handleCheck}/>
            </div>
            <div>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="nom" id="" ref={nomRef} placeholder='Nom'/>
            </div>
            <div>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="prenom" id="" ref={prenomRef} placeholder='Prenom'/>
            </div>
            <div>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="tel" id="" ref={telRef} placeholder='Tel.'/>
            </div>
            <div>
              <input type="email"className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"  name="email" id="" ref={emailRef} placeholder='Email'/>
            </div>
            <div>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="adresse" id="" ref={adresseRef} placeholder='Adresse'/>
            </div>
            <button type='submit' className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">Sauvegarder</button>
          </form>
      </div>
      <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <MdDangerous className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ce tuteur desja existe, est ce que vous pouvez l'affecter un éléves 
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={()=>navigate(`/addEleves/${tuteur.id}`)}>Oui</Button>
              <Button onClick={()=>navigate(`/tuteurs`)}>Non</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {
        popUp && <PopUp/>
      }
    </div>
    
  )
}
