import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Spinners from '../utils/Spinner';
import { Table } from 'flowbite-react';
import { FaTrashRestore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function DeletedUser() {
    const {token}=useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const [user, setUsers] = useState([])
    const navigate=useNavigate();

    const fetchUser= async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedUser',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(!response.ok){
                throw new Error("un erreur est produit")
            }
            const data=await response.json()
            setUsers(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleRestore=async (id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/restore/user/${id}`,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(!response.ok){
                throw new Error("un erreur est produit")
            }
            const data=await response.json()
            if(data){
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    if(loading) return <Spinners/>
  return (
    <section className='p-5'>
        <h2 className='text-center font-bold text-xl'>les Tuteurs supprimés</h2>
        <div className="overflow-x-auto mt-4">
            <Table striped hoverable>
            <Table.Head>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                    Username 
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                    Nom 
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                    Prenom      
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                    Email 
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                    date de création
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                    dernier connexion
                </Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {user?.map((ele,ind)=>(
                <Table.Row key={ind} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.username} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.name} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.email} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{new Date(ele.created_at).toLocaleString('fr-FR',{
                        day:'2-digit',
                        month:'2-digit',
                        year:'numeric',
                        hour:'numeric',
                        minute:'numeric',
                    })}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.last_login}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>
                        <FaTrashRestore size={20} onClick={()=>handleRestore(ele.id)} className='cursor-pointer'/>
                    </Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
            </Table>
        </div>
    </section>
  )
}
