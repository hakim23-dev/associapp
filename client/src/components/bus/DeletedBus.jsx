import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { FaTrashRestore } from 'react-icons/fa'
import Spinners from '../utils/Spinner'
import { useNavigate } from 'react-router-dom'

export default function DeletedBus() {
    const [bus, setBus] = useState([])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const navigate=useNavigate()

    const fetchBus=async()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedBus');
            if(!response.ok){
                throw new Error
            }
            const data=await response.json()
            setBus(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleRestore=async (id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/bus/restore/${id}`);
            if(!response.ok){
                throw new Error
            }
            const data=await response.json()
            if(data){
                setMsg('le bus est restauré')
                setTimeout(()=>{
                    navigate('/bus')
                },2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchBus()
    },[])

    if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <h2 className='text-center font-bold text-xl'>Les Bus supprimé</h2>
        <div className='overflow-x-auto mt-4'>
            {
                msg && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">restoré</span> {msg}
                </div>
            }
            <Table striped hoverable>
                <Table.Head>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Immatriculation</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Capacite</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Marque</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Modele</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                {

                    bus?.map((ele, ind) => (
                        <Table.Row key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                            <Table.Cell className='font-semibold bg-slate-50'>{ele.immatriculation}</Table.Cell>
                            <Table.Cell className='font-semibold bg-slate-50'>{ele.capacite}</Table.Cell>
                            <Table.Cell className='font-semibold bg-slate-50'>{ele.marque}</Table.Cell>
                            <Table.Cell className='font-semibold bg-slate-50'>{ele.modele}</Table.Cell>
                            <Table.Cell className='flex bg-slate-50'>
                                <FaTrashRestore size={20} onClick={()=>handleRestore(ele.id)} className='cursor-pointer'/>
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
