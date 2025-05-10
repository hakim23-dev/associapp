import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaTrashRestore } from 'react-icons/fa'
import Spinners from '../utils/Spinner'
import { useNavigate } from 'react-router-dom'

export default function DeletedTuteurs() {
    const [tuteurs, setTuteurs] = useState([])
    const [loading, setLoaindg] = useState(false)
    const navigate=useNavigate()

    const fetchTuteur=async ()=>{
        setLoaindg(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedTuteur')
            if(!response.ok){
                throw new Error
            }
            const data=await response.json()
            setTuteurs(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoaindg(false)
        }
    }

    const handleRestore=async(id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/tuteur/restore/${id}`)
            if(!response.ok){
                throw new Error
            }
            const data=await response.json()
            if(data){
                navigate('/tuteurs')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchTuteur()
    },[])

    if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <h2 className='text-center font-bold text-xl'>les Tuteurs supprimés</h2>
        <div className="overflow-x-auto mt-4">
            <Table striped hoverable>
            <Table.Head>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                C.I.N 
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                Prénom 
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                Nom      </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                Tel. 
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                Email          
                </Table.HeadCell>
                <Table.HeadCell  className='bg-red-600 font-bold text-sm text-black cursor-pointer'>
                Adresse
                </Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {tuteurs?.map((ele,ind)=>(
                <Table.Row key={ind} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.cin} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.nom} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.telephone} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.email} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.adresse} </Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50 flex'>
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
