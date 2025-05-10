import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../../context/AppContext'
import Spinners from '../utils/Spinner';
import UnauthorizedPage from '../utils/UnauthorizedPage';
import PopUp from '../utils/PopUp';

export default function AddUser() {
  const [error, setError] = useState({
    psw:'',
    permission:''
  })
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const usernameRef=useRef();
  const nameRef=useRef();
  const prenomRef=useRef();
  const emailRef=useRef();
  const pictureRef=useRef();
  const passwordRef=useRef();
  const cpasswordRef=useRef();
  const {user,token}=useContext(AppContext)
  const [showAunotorized,setShowAunotorized]=useState(false)

  const navigate=useNavigate()

  const names=[
    {
      id:1,
      name:'tableau de bord',
      key:'dashbord',
    },
    {
      id:2,
      name:'tuteurs',
      key:'tuteur',
    },
    {
      id:3,
      name:'eleves',
      key:'eleve',
    },
    {
      id:4,
      name:'chauffeurs',
      key:'chauffeur',
    },
    {
      id:5,
      name:'Bus',
      key:'bus',
    },
    {
      id:6,
      name:'Itineraires',
      key:'itineraire',
    },
    {
      id:7,
      name:'Niveaux',
      key:'niveau',
    },
    {
      id:8,
      name:'Paiments',
      key:'paiments',
    },
    {
      id:9,
      name:'Utilisateurs',
      key:'users',
    },
  ];

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('username',usernameRef.current.value)
    formData.append('name',nameRef.current.value)
    formData.append('prenom',prenomRef.current.value)
    formData.append('email',emailRef.current.value)
    formData.append('picture',pictureRef.current.files[0])
    formData.append('password',passwordRef.current.value)
    formData.append('password_confirmation',cpasswordRef.current.value)
    formData.append('user_id',user?.id)
    formData.append('permissions',selectedPermissions)

    console.log(selectedPermissions)

    
    if(!formData.get('password')===formData.get('password_confirmation') || formData.get('password')==='' || formData.get('password_confirmation')===''){
      setError({...error,psw:'verifier le mot de passe'})
      return;
    }
    
    if(!selectedPermissions.length>0){
      setError({...error,permission:'au mois une permission doit etre coché'})
      return;
    }

      try {
      const response=await fetch('http://127.0.0.1:8000/api/register',{
        method:'POST',
        headers:{
          Authorization:`Bearer ${token}`
        },
        body:formData
      })

      if(response.status===403){
        setPopUp(true)
      }
      
      const data=await response.json()
      console.log(data)
      if(data){
        navigate('/user');
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const fetchPermissions=async()=>{
    setLoading(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/permissions')
      if(response.status===403){
        setShowAunotorized(true)
      }
      const data=await response.json()
      setPermissions(data)

    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const handleAllChange = (e) => {
    const checked = e.target.checked;
  
    if (checked) {
      const allPermissionNames = permissions.permissions.map(per => per.name);
      setSelectedPermissions(allPermissionNames);
    } else {
      setSelectedPermissions([]);
    }
  };

  const addPermissions=(e)=>{
    const {value,checked} =e.target
    if (checked) {
      setSelectedPermissions(prev => [...prev, value]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== value));
    }
  }

  

  useEffect(()=>{
    fetchPermissions()
  },[])

  if(loading) return <Spinners/>

  return (
    showAunotorized ? <UnauthorizedPage/>:
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className='w-full bg-white rounded-xl shadow-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <h3 className='text-center mb-3 font-bold'>Ajouter un nouveau Utilisateur</h3>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="username" placeholder='Username' ref={usernameRef} required />
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="name" placeholder='nom' ref={nameRef} required />
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="prenom" placeholder='prenom' ref={prenomRef} required />
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="email" placeholder='Email' ref={emailRef} required />
            <input type="file" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="email" placeholder='Email' ref={pictureRef}  />
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="password" placeholder='Password' ref={passwordRef} required />
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" name="cpassword" placeholder='Confirm Password' ref={cpasswordRef} required />
            <small className='font-medium text-red-500 font-bold'>{error.psw && error.psw} </small>
              <div>
                <small className='font-medium text-red-500 font-bold'>{error.permission && error.permission} </small>
                <div>
                  <input type="checkbox" name="all" id="all" 
                  onChange={handleAllChange} checked={selectedPermissions?.length === permissions?.permissions?.length}
                    className='peer h-5 w-5 cursor-pointer translate-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500'
                  />
                  <label htmlFor="all" className='cursor-pointer ml-1'>Tous les permissions</label>
                </div>
                {
                  names.map(ele=>(
                    <div className='grid md:grid-cols-3 gap-4 p-2 border-b-2' key={ele.id}>
                      <h3 className='font-bold'>{ele.name}</h3>
                      <div className='grid gap-8 md:grid-cols-4 col-span-2'>
                        {
                          permissions?.permissions?.map((per,ind)=>(
                            per.name.split('_')[1]===ele.key && <div key={ind}>
                                <input type='checkbox' value={per.name} 
                                  id={per.name} onChange={addPermissions} 
                                  checked={selectedPermissions.includes(per.name)}
                                  className='peer h-5 w-5 cursor-pointer translate-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500'
                                />
                                <label htmlFor={per.name} className='cursor-pointer ml-1'>{per.name}</label>
                              </div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            
            <div >
                <button type='submit' className='w-[50%] bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors'>Ajouter</button>
            </div>
        </form>
      </div>
      {
        popUp && <PopUp/>
      }
    </div>
  )
}
