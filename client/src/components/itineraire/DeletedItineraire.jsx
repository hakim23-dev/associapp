import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaTrashRestore } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'

export default function DeletedItineraire() {
    const [itineraires,setItineraires]=useState([])
    const [loading,setLoading]=useState(false)
    const [msg,setMsg]=useState('')
    const navigate=useNavigate()

    const fetchItineraire=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedIt')
            if(!response.ok) {
                throw new Error
            }
            const data=await response.json()
            setItineraires(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handlerestore= async(id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/itineraire/restore/${id}`)
            if(!response.ok) {
                throw new Error
            }
            const data=await response.json()
            if(data){
                setMsg('l\'Itineraire est bien restauré')
                setTimeout(()=>{
                    navigate('/itineraire')
                },2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchItineraire()
    },[])

    if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <h2  className='text-center text-xl font-bold'>les Itineraires supprimé</h2>
        <div className='overflow-x-auto mt-4'>
            {
                    msg && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">restoré</span> {msg}
                    </div>
            }

            <Table striped hoverable>
                <Table.Head>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Intituler de L'Itinéraire</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Point de départ</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Point d'arrivée</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Distance (km)</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {
                        itineraires?.map((ele,ind)=>(
                            <Table.Row key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.nom} </Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.point_depart} </Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.point_arrivee} </Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.distance} </Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50 flex'>
                                    <FaTrashRestore size={20} className='cursor-pointer' onClick={()=>handlerestore(ele.id)}/>
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
