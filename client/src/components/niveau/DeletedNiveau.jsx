import React, { useEffect, useState } from 'react'
import Spinners from '../utils/Spinner'
import { FaTrashRestore } from 'react-icons/fa'
import { Table } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

export default function DeletedNiveau() {
    const [niveau, setNiveau] = useState([])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const navigate=useNavigate()

    const fetchNiveau=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedNiveau');
            if(!response.ok){
                throw new Error
            }

            const data=await response.json()
            setNiveau(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleRestore= async (id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/niveau/restore/${id}`);
            if(!response.ok){
                throw new Error
            }

            const data=await response.json()
            if(data){
                setMsg('Niveau est bien restoré')
                setTimeout(()=>{
                    navigate('/niveau');
                },2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchNiveau()
    },[])

    if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <h2 className='font-bold text-center text-xl'>Les Niveaux supprimés</h2>
        <div className='overflow-x-auto mt-4'>
            {
                    msg && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">restoré</span> {msg}
                    </div>
            }
            <Table striped hoverable>
                <Table.Head>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Niveau</Table.HeadCell>
                    <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {
                        niveau?.map((ele,ind)=>(
                            <Table.Row key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                                <Table.Cell className='font-semibold bg-slate-50'>{ele.label} </Table.Cell>
                                <Table.Cell className='font-semibold bg-slate-50 flex'> 
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
