import { Alert,  Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import NavigateButton from '../utils/NavigateButton'
import {AppContext} from '../../context/AppContext'
import UnauthorizedPage from '../utils/UnauthorizedPage'
import PopUp from '../utils/PopUp.jsx'

export default function Itineraires() {
    const [itineraires,setItineraires]=useState([])
    const [allItineraires,setAllItineraires]=useState([])
    const [item,setItem]=useState(10)
    const [loading,setLoading]=useState(false)
    const [unautorized,setUnautorized]=useState(false)
    const [popUp,setPopUp]=useState(false)
    const [success,setSuccess]=useState('')
    const navigate=useNavigate()
    const {token}=useContext(AppContext)

    const fetchAllitineraire=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/allIt',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`,
                }
                })
            if(response.status===304) {
                setUnautorized(true)
            }
            const data=await response.json()
            setItineraires(data)
            setAllItineraires(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleDelete= async(id)=>{
        const x=confirm('are you sure to delete the item')
        if(x){
            try {
                const response=await fetch(`http://127.0.0.1:8000/api/itineraire/delete/${id}`,{
                method:'DELETE',
                headers:{
                    Authorization:`Bearer ${token}`,
                }
                })
                if(response.status==403) {
                    setPopUp(true)
                }
                const data=await response.json()
                if(data){
                    setSuccess("l'itineraire est supprimé")
                    location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSearch=(e)=>{
        const value=e.target.value;
        const result=allItineraires.filter(ele=>ele.nom.toLowerCase().includes(value.toLowerCase()))
        setItineraires(value==='' ? allItineraires:result)
    }

    

    useEffect(()=>{
        fetchAllitineraire()
    },[])

    if(loading) return <Spinners/>

  return (
    unautorized ? <UnauthorizedPage/> :
    <section className='p-5'>
        <NavigateButton destination='addItin' nom='Itinéraire' />
        <div className='flex justify-between mt-3'>
            <div>
                <button onClick={()=>navigate('/deletedItineraire')} className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2'>Afficher les éléments supprimé</button>
                <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search :</label>
                <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder="Chercher par Intituler de L'Itinéraire"/>
            </div>
            <div>
                <label htmlFor="show" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show :</label>
                <select name="show" id="show" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={e=>setItem(Number(e.target.value))}>
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
                    <span className="font-medium">Supression</span> {success}
                    </div>
            }

            <Table striped hoverable>
                <TableHead>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Intituler de L'Itinéraire</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Point de départ</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Point d'arrivée</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Distance (km)</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</TableHeadCell>
                </TableHead>
                <TableBody>
                    {
                        itineraires?.slice(0,item)?.map((ele,ind)=>(
                            <TableRow key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                                <TableCell className='font-semibold bg-slate-50'>{ele.nom} </TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.point_depart} </TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.point_arrivee} </TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.distance} </TableCell>
                                <TableCell className='font-semibold bg-slate-50 flex'>
                                    <Link to={`/updateItineraire/${ele.id}`}><BiSolidEdit size={20}/></Link>
                                    <BiTrash size={20} className='cursor-pointer' onClick={()=>handleDelete(ele.id)}/>
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
