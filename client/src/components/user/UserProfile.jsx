import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Spinners from '../utils/Spinner';

export default function UserProfile() {
    const {user,userPicture}=useContext(AppContext);
    
    if(!user) return <Spinners/>
    
  return (
    <section className='bg-gray-100 py-4'>
      <div className='flex flex-col justify-center justify-items-center bg-white max-w-[50%] mx-auto p-8 rounded-sm shadow-md'>
        <div className='flex justify-center'>
          <img src={userPicture || '/user.jpeg'} alt="user Picture" className='rounded-full object-cover h-36 w-36 shadow-md'/>
        </div>
        <div>

          <div className='grid sm:grid-cols-2 gap-4 my-6 border-b-2 py-2'>
            <h3 className='font-bold '>Nom :</h3>
            <p className='font-bold  text-blue-500'>{user?.name} </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-4 my-4 border-b-2 py-2'>
            <h3 className='font-bold '>Prenom :</h3>
            <p className='font-bold  text-blue-500'>{user?.prenom} </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-4 my-4 border-b-2 py-2'>
            <h3 className='font-bold '>Username :</h3>
            <p className='font-bold  text-blue-500'>{user?.username} </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-4 my-4 border-b-2 py-2'>
            <h3 className='font-bold '>Role :</h3>
            <p className='font-bold  text-blue-500'>{user?.role} </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-4 my-4 border-b-2 py-2'>
            <h3 className='font-bold '>Email :</h3>
            <p className='font-bold  text-blue-500'>{user?.email} </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-4 my-4 border-b-2 py-2'>
            <h3 className='font-bold '>Role :</h3>
            <p className='font-bold  text-blue-500'>{user?.role} </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-4 my-4 border-b-2 py-2'>
            <h3 className='font-bold '>Dernier connexion :</h3>
            <p className='font-bold  text-blue-500'>{user?.last_login} </p>
          </div>
        </div>
      </div>
    </section>
  )
}
