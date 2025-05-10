import {  Table, TableBody } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { BiSolidEdit } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import { FaEye } from "react-icons/fa";
import {AppContext} from '../../context/AppContext'
import UnauthorizedPage from '../utils/UnauthorizedPage'

export default function Eleves() {
  const [eleves, setEleves] = useState([])
  const [allEleves, setAllEleves] = useState([])
  const [numItems, setNumItems] = useState(10)
  const [loading, setLoading] = useState(false)
  const [unautorized, setUnautorized] = useState(false)
  const navigate=useNavigate()
  const {token}=useContext(AppContext)

  const fetchEleves=async()=>{
    setLoading(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/eleves',{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(response.status===403){
        setUnautorized(true)
      }
      const eleves=await response.json()
      setEleves(eleves)
      setAllEleves(eleves)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const handleSearch=(e)=>{
    const value=e.target.value;
    const result=allEleves.filter(ele=>ele.prenom.toLowerCase().includes(value.toLowerCase()))
    setEleves(value==='' ? allEleves:result)
  }

  useEffect(()=>{
    fetchEleves()
  },[])

  if(loading) return <Spinners/>
  
  return (
    unautorized ? <UnauthorizedPage/> :
    <section style={{padding:'32px'}}>
      <div className={'flex justify-between'} >
        <div>
          <button onClick={()=>navigate('/deletedEleves')} className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2'>Afficher les éléments supprimé</button>
          <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search:</label>
          <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='Chercher par prenom'/>
        </div>
        <div className='max-w-sm'>
          <label htmlFor="show" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show :</label>
          <select name="show" id="show" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e=>setNumItems(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <Table.Head>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Prenom</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Nom</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Sexe</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Date de Naissance</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Orpheline</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Tel.</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Email</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Adresse</Table.HeadCell>
              <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
          </Table.Head>
          <TableBody>
            {
              eleves.slice(0,numItems).map((ele,ind)=>(
                <Table.Row key={ind}>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.nom}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.sexe}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.date_naissance}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.orphelin}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.telephone}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.email}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50'>{ele.adresse}</Table.Cell>
                  <Table.Cell className='font-semibold bg-slate-50 flex gap-3'>
                    <Link to={`/updateEleve/${ele.id}`}><BiSolidEdit size={20}/></Link>
                    <Link to={`/eleveProfile/${ele.id}`}><FaEye size={20} /> </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
