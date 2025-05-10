import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaTrashRestore } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'

export default function DeletedChauffeurs() {
    const [chauffeur, setChauffeur] = useState([])
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

    const fetchChauffeur=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedChauffeur')
            if(!response.ok){
                throw new Error
            }
            const data=await response.json()
            setChauffeur(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleRestore= async (id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/chauffeur/restore/${id}`)
            if(!response.ok){
                throw new Error
            }
            const data=await response.json()
            if(data){
                setMsg('le chauffeur est bien restauré')
                setTimeout(()=>{
                    navigate('/chauffeur')
                },2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchChauffeur()
    },[])

    if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <h2 className='text-center font-bold text-xl'>Les chauffeurs supprimé</h2>
        <div className='overflow-x-auto mt-4'>
            {
                msg && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">restoré</span> {msg}
                </div>
            }
            <Table>
                <Table.Head>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>CIN</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Permis</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Nom</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Prénom</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Adresse</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Tel</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Email</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {
                        chauffeur?.map((ele,ind)=>(
                            <Table.Row key={ind} className={`${ele.deleted==='oui' && 'text-red-700'}`} >
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.cin}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.permis}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.nom}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.adresse}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.telephone}</Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.email}</Table.Cell>
                                <Table.Cell className='flex font-semibold bg-slate-50'>
                                    <FaTrashRestore size={20} className='cursor-pointer' onClick={()=>handleRestore(ele.id)}/>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    </section>
  )
}
