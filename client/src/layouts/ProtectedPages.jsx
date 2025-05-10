import React, {   useContext, useState } from 'react'

import {  Dropdown, Navbar } from 'flowbite-react'
import { Navigate, Outlet, useNavigate,Link } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'



import {  FaKey } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import SideBar from './SideBar';
import { AppContext } from '../context/AppContext';
import GoBack from '../components/utils/GoBack';
import {GrUpdate} from 'react-icons/gr'

export default function ProtectedPages() {
    const isAuthenticated=!!sessionStorage.getItem('login')
    const [isOpen, setIsOpen] = useState(false)
    const {user}=useContext(AppContext)
    const navigate=useNavigate()

    const deconnect=()=>{
        sessionStorage.removeItem('login');
        navigate('/')
    }

  return (
    isAuthenticated ? <div>
        <Navbar fluid rounded  className='shadow'>
            <div className='flex gap-2 items-center'>
                <GiHamburgerMenu size={40} onClick={()=>setIsOpen(true)} className='cursor-pointer' />
                <GoBack/>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Dropdown label={`${user?.name}`} dismissOnClick={false}  >
                    <Dropdown.Item icon={FaUser}><Link to={'userProfile'}>Profile</Link>  </Dropdown.Item>
                    <Dropdown.Item icon={FaKey}><Link to={'updatePsw'}>Changer le mot de passe</Link> </Dropdown.Item>
                    <Dropdown.Item icon={IoIosLogOut} onClick={deconnect}>Deconnexion</Dropdown.Item>
                    <Dropdown.Item icon={GrUpdate} ><Link to={'updateProfile'}>Modifier le profile</Link></Dropdown.Item>
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
        <SideBar  isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet/>
    </div>
    : <Navigate to={'/'} replace/>
  )
}
