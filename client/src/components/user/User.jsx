import React, { useContext, useEffect, useState } from 'react'
import {  Popover, Table } from 'flowbite-react';
import Spinners from '../utils/Spinner';
import { BiSolidEdit, BiTrash } from 'react-icons/bi';
import {AppContext} from '../../context/AppContext'
import NavigateButton from '../utils/NavigateButton';
import UnauthorizedPage from '../utils/UnauthorizedPage';
import { Link, useNavigate } from 'react-router-dom';

export default function User() {
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState(10)
    const {user,token}=useContext(AppContext)
    const [showAunotorized,setShowAunotorized]=useState(false)
    const [popUp,setPopUp]=useState(false)
    const navigate=useNavigate()

    const fetchUsers=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/users',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });

            if(response.status===403){
                setShowAunotorized(true)
            }

            const users=await response.json()
            setUsers(users)
            setAllUsers(users)
            
            
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleDelete= async(id)=>{
        const confirmation=confirm('are you sure want to delete this user')
        if(confirmation){
            try {
                const response=await fetch(`http://127.0.0.1:8000/api/delete/user/${id}`,{
                    method:'DELETE',
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                })

                if(response.status===403){
                    setPopUp(true)
                }
                const data=await response.json()
                if(data){
                    location.reload();
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSearch=(e)=>{
        const value=e.target.value
        const result=allUsers.filter(ele=>ele.username.toLowerCase().includes(value.toLowerCase()))
        setUsers(value===''?allUsers:result)
    }


    useEffect(()=>{
        fetchUsers()
    },[])

    if(loading) return <Spinners/>

  return (
    showAunotorized ? <UnauthorizedPage/> :
    <section className='p-5'>
        {
            <NavigateButton destination='addUser' nom='utilisateur' />
        }
        
        <div className='flex justify-between mb-4'>
            <div>
                <button  className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2' onClick={()=>navigate('/deletedUser')}>Afficher les éléments supprimé</button>
                <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search :</label>
                <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='Chercher par Username'/>
            </div>
            <div>
                <label htmlFor="show" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show :</label>
                <select name="show" id="show" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e=>setItem(Number(e.target.value))}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
        <div className='overflow-x-auto mt-4'>
            <Table>
                <Table.Head>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>User Name</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>First Name</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Last Name</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Email</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Subscription Date</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Last Login</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>les permissions</Table.HeadCell>
                    <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {
                        users?.slice(0,item).map((ele,ind)=>(
                            <Table.Row key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.username}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.name}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.email}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{new Date(ele.created_at).toLocaleString('fr-FR',{
                                    day:'2-digit',
                                    month:'2-digit',
                                    year:'numeric',
                                    hour:'numeric',
                                    minute:'numeric',
                                })}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.last_login}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.permissions?.map((ele,ind)=>(
                                    <span key={ind}>{ele.name} </span>
                                ))}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>
                                    {
                                        user?.id!==ele?.id && <div className='flex gap-2'>
                                            <BiTrash size={25} className='cursor-pointer' onClick={()=>handleDelete(ele.id)}/>
                                            <Link to={`/updatePermissions/${ele.id}`}><BiSolidEdit size={25} className='cursor-pointer' /></Link> 
                                        </div>
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
        {
            popUp && <Popover/>
        }
    </section>
  )
}
