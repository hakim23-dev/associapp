import { createContext, useEffect, useState } from "react";

export const AppContext=createContext()

import React from 'react'

export default function AppProvider({children}) {
    const [token, setToken] = useState(sessionStorage.getItem('login'))
    const [user, setUser] = useState(null)
    const [userPicture, setUserPicture] = useState(null)

    const getUser=async ()=>{
        try {
            const ressponse=await fetch('http://127.0.0.1:8000/api/user',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await ressponse.json()
            setUser(data.user)
            setUserPicture(data.userPicture);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(token){
            getUser()
        }
    },[token])

  return (
    <AppContext.Provider value={{token,setToken,user,userPicture}}>
        {children}
    </AppContext.Provider>
  )
}
