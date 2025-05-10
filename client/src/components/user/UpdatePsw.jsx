import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function UpdatePsw() {
  const [error, setError] = useState({
    oldPsw:'',
    pswConfirm:'',
    samePsw:'',
    success:''
  });
  const {token}=useContext(AppContext);
  const oldPswRef=useRef()
  const pswRef=useRef()
  const pswConfirmRef=useRef()
  const navigate=useNavigate()

  const handleDubmit= async(e)=>{
    e.preventDefault()
    const payload={
      old_psw:oldPswRef.current.value,
      password:pswRef.current.value,
      password_confirmation:pswConfirmRef.current.value
    }
    if(payload.password===payload.password_confirmation){
      console.log(payload)
      try {
        const response= await fetch('http://127.0.0.1:8000/api/changePassword',{
          method:'PUT',
          body:JSON.stringify(payload),
          headers:{
            Authorization:`Bearer ${token}`,
            'content-type':'Application/json',
            Accept:'Application/json'
          }
        })

        if(!response.ok){
          throw new Error;
        }

        const data=await response.json();
        if(data.oldPswError){
          setError({oldPsw:data.oldPswError})
        }else if(data.samePsw){
          setError({samePsw:data.samePsw})
        }else{
          setError({success:'mot de passe est bien modifié'})
          setTimeout(()=>{
            navigate(-1)
          },3000)
        }
      } catch (error) {
        console.log(error)
      }
    }else {
      setError({pswConfirm:'le mot de passe doit etre confirmé'})
    }
  }

  return (
    <form onSubmit={handleDubmit} className='max-w-md mx-auto space-y-4'>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Modifier le mot de passe</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Votre Mot de passe actuel</label>
        <input type="password" ref={oldPswRef} name="old_psw" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"/>
        {error.oldPsw && <small className='font-semibold text-sm text-red-600'>{error.oldPsw}</small>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Votre Noyveau mot de passe</label>
        <input type="password" ref={pswRef} name="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"/>
        {error.samePsw && <small className='font-semibold text-sm text-red-600'>{error.samePsw}</small>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer Votre Nouveau mot de passe</label>
        <input type="password" ref={pswConfirmRef} name="password_confirmation" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"/>
        {error.pswConfirm && <small className='font-semibold text-sm text-red-600'>{error.pswConfirm}</small>}
      </div>
      <button type='submit' className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">Modifier</button>
      {
        error.success && 
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Succeé</span> {error.success}
        </div>
      }
    </form>
  )
}
