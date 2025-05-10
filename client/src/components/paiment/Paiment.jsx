import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { BiPrinter, BiSolidEdit } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Spinners from '../utils/Spinner';
import NavigateButton from '../utils/NavigateButton';

export default function Paiment() {
  const [paiments, setPaiments] = useState([])
  const [allPaiments, setAllPaiments] = useState([])
  const [loading, setLoading] = useState([])
  const [item, setItem] = useState(10)

  const fetchTuteurPaiment=async()=>{
    setLoading(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/tuteur/paiments');
      if(!response.ok){
        throw new Error;
      }
      const data=await response.json()
      setPaiments(data)
      setAllPaiments(data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const handleSearch=(e)=>{
    const value=e.target.value;
    const result=allPaiments.filter(ele=>ele.tuteur['cin'].toLowerCase().includes(value.toLowerCase()))
    setPaiments(value==='' ? allPaiments:result)
    
  }

  useEffect(()=>{
    fetchTuteurPaiment()
  },[])

  if(loading) return <Spinners/>



  return (
    <div className='p-5'>
      <NavigateButton destination={'addTuteur'} nom='tuteur'/>
      <div className='flex justify-between mt-3'>
          <div>
            <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search :</label>
            <input type="text" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='Chercher par CIN'/>
          </div>
        <div>
          <label htmlFor="show" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show :</label>
          <select name="show" id="show" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e=>setItem(Number(e.target.value))} >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div className='overflow-x-auto mt-4'>
        <Table >
          <Table.Head >
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer' ># </Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer' >C.I.N</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Nom</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Prenom</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Numéro de Téléphone</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Adresse</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Montant</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Data de paiment</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Statut</Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black'>Controle</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {
              paiments.slice(0,item).map((ele,ind)=>(
                <Table.Row key={ind}>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.id}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.tuteur['cin']}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.tuteur['nom']}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.tuteur['prenom']}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.tuteur['telephone']}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.tuteur['adresse']}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.montant}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.date_paiment}</Table.Cell>  
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.statut}</Table.Cell>  
                  <Table.Cell className='flex bg-slate-50'>
                    <Link to={`/print/${ele.id}`}><BiPrinter size={25}/></Link>
                  </Table.Cell>  
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
