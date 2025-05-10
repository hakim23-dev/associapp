import {   Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { data, Link, useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import NavigateButton from '../utils/NavigateButton'
import UnauthorizedPage from '../utils/UnauthorizedPage'
import {AppContext} from '../../context/AppContext'
import PopUp from '../utils/PopUp.jsx'

export default function Bus() {
    const [bus, setBus] = useState([])
    const [allBus, setAllBus] = useState([])
    const [item, setitem] = useState(10)
    const [loading, setLoading] = useState(false)
    const [showUnautorized, setShowUnautorized] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [success, setSuccess] = useState('')
    const navigate=useNavigate();
    const {token}=useContext(AppContext)

    const fetchAllBus=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/allBus',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status===403){
                setShowUnautorized(true)
            }
            const bus=await response.json()
            console.log(data)
            setBus(bus)
            setAllBus(bus)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleDelete=async (id)=>{
        const confirmation=confirm('vous pouvez supprimé ce Bus')
        if(confirmation){
            try {
                const response=await fetch(`http://127.0.0.1:8000/api/bus/delete/${id}`,{
                    method:'DELETE',
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.status===403){
                    setPopUp(true)
                }
                const bus=await response.json()
                if(bus){
                    setSuccess('bus est bien supprimé')
                    location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSearch=(e)=>{
        const value=e.target.value
        const result=allBus.filter(ele=>ele.immatriculation.toLowerCase().includes(value.toLowerCase()))
        setBus(value==='' ? allBus:result)
    }

    

    useEffect(()=>{
        fetchAllBus()
    },[])

    if(loading) return <Spinners/>

  return (
    showUnautorized ? <UnauthorizedPage/> :
    <section className='p-5'>
        <NavigateButton destination='addBus' nom='Bus' />
        <div className='flex justify-between mb-4'>
            <div>
                <button onClick={()=>navigate('/deletedBus')} className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2'>Afficher les éléments supprimé</button>
                <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search :</label>
                <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='Chercher par Immatriculation'/>
            </div>
            <div>
                <label htmlFor="show" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show :</label>
                <select name="show" id="show" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e=>setitem(e.target.value)}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
        <div className='overflow-x-auto mt-4'>
            {
                success && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Supression</span> bus est bien supprimé.
                </div>
            }
            <Table striped hoverable>
                <TableHead>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Immatriculation</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Capacite</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Marque</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Modele</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</TableHeadCell>
                </TableHead>
                <TableBody>
                {

                    bus?.slice(0, item)?.map((ele, ind) => (
                        <TableRow key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                            <TableCell className='font-semibold bg-slate-50'>{ele.immatriculation}</TableCell>
                            <TableCell className='font-semibold bg-slate-50'>{ele.capacite}</TableCell>
                            <TableCell className='font-semibold bg-slate-50'>{ele.marque}</TableCell>
                            <TableCell className='font-semibold bg-slate-50'>{ele.modele}</TableCell>
                            <TableCell className='flex bg-slate-50'>
                                <Link to={`/updateBus/${ele.id}`}><BiSolidEdit size={20} /></Link>
                                <Link to={`/bus`} onClick={() => handleDelete(ele.id)}><BiTrash size={20} /></Link>
                            </TableCell>
                            
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        </div>
        {
            popUp && <PopUp/>
        }
    </section>
  )
}
