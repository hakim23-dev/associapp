import React, { useContext, useRef } from 'react'
import { AppContext } from '../../context/AppContext'
import Spinners from '../utils/Spinner'
import {useNavigate} from 'react-router-dom'

export default function UpdateProfile() {
    const {user,token}=useContext(AppContext)
    const nomRef=useRef();
    const prenomRef=useRef();
    const usernameRef=useRef();
    const imageRef=useRef();
    const navigate=useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',nomRef.current.value)
        formData.append('prenom',prenomRef.current.value)
        formData.append('username',usernameRef.current.value)
        formData.append('image',imageRef.current.files[0])
        
        try {
            const response=await fetch('http://127.0.0.1:8000/api/updateProfile',{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                body:formData
            });
            if(!response.ok){
                throw new Error('un erreur est produit');
            }
            const data=await response.json();
            
            if(data){
                navigate('/userProfile');
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(!user) return <Spinners/>
  return (
    <section className='py-4'>
        <div className='max-w-[40%] mx-auto'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom :</label>
                    <input type="text" name="" id="name" defaultValue={user.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" ref={nomRef}/>
                </div>
                <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prenom :</label>
                    <input type="text" name="" id="prenom" defaultValue={user.prenom} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" ref={prenomRef}/>
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username :</label>
                    <input type="text" name="" id="" defaultValue={user.username} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" ref={usernameRef}/>
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Photo :</label>
                    <input type="file" name="" id="" accept='image/*' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" ref={imageRef}/>
                </div>
                <div>
                    <button type='submit' className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">Modifier</button>
                </div>
            </form>
        </div>
    </section>
  )
}
