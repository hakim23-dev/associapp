import React, { useContext, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'


export default function Login() {
    const [msg, setmsg] = useState({
        errUsername:'',
        errpsw:'',
    })
    const {setToken}=useContext(AppContext)

    const username = useRef('')
    const password = useRef('')
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const payload={
            username:username.current.value,
            password:password.current.value,
        }
        fetch('http://127.0.0.1:8000/api/login',{
            method:'POST',
            body:JSON.stringify(payload),
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
            },
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.username){
                return setmsg({...msg,errUsername:res.username});
            }
            if(res.psw){
                return setmsg({...msg,errpsw:res.psw});
            }
            if(res.msg==='correcte' && res.token){
                sessionStorage.setItem('login',res.token)
                setToken(res.token)
                return navigate('dashbord')
            }
        })

    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connecter</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="username"
                required
                ref={username}
                />
                <small className='font-medium text-red-500'>{msg.errUsername!=='' && msg.errUsername} </small>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
                ref={password}
                />
                <small className='font-medium text-red-500'>{msg.errpsw!=='' && msg.errpsw} </small>
            </div>


            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors" type='submit'>
                Connecter
            </button>
        </form>
    </div>
    </div>
  )
}
