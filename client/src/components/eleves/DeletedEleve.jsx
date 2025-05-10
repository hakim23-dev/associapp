import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Spinners from '../utils/Spinner'

export default function DeletedEleve() {
    const [eleves, setEleves] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchEeleves=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/deletedEleve');
            if(!response.ok){
                throw new Error;
            }
            const data=await response.json()
            setEleves(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchEeleves()
    },[])

    if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <h2 className='text-center font-bold text-xl'>Les éléves Supprimés</h2>
        <div className="overflow-x-auto mt-4">
        <Table>
            <Table.Head>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Prenom</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Nom</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Sexe</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Date de Naissance</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Orpheline</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Tel.</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Email</Table.HeadCell>
                <Table.HeadCell className='bg-red-600 font-bold text-sm text-black cursor-pointer'>Adresse</Table.HeadCell>
            </Table.Head>
            <Table.Body>
            {
                eleves?.map((ele,ind)=>(
                <Table.Row key={ind}>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.nom}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.sexe}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.date_naissance}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.orphelin}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.telephone}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.email}</Table.Cell>
                    <Table.Cell className='font-semibold bg-slate-50'>{ele.adresse}</Table.Cell>
                </Table.Row>
                ))
            }
            </Table.Body>
        </Table>
        </div>
    </section>
  )
}
