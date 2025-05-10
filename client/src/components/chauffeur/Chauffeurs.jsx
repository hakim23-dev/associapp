import {  Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import NavigateButton from '../utils/NavigateButton'
import {AppContext} from '../../context/AppContext'
import UnauthorizedPage from '../utils/UnauthorizedPage'
import PopUp from '../utils/PopUp.jsx'

export default function Chauffeurs() {
    const [cheuffeurs, setChauffeurs] = useState([])
    const [allCheuffeurs, setAllChauffeurs] = useState([])
    const [loading, setLoading] = useState(false)
    const [unautorized, setUnautorized] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [item, setItem] = useState(10)
    const [success, setSuccess] = useState('')
    const navigate=useNavigate()
    const {token}=useContext(AppContext)

    const fetchChauffeur=async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/allChauffeur',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response.status===403){
                setUnautorized(true)
            }
            const chauffeurs= await response.json()
            setChauffeurs(chauffeurs)
            setAllChauffeurs(chauffeurs)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleSearch=(e)=>{
        const value=e.target.value;
        const result=allCheuffeurs.filter(ele=>ele.cin.toLowerCase().includes(value.toLowerCase()))
        setChauffeurs(value==='' ? allCheuffeurs:result )
    }

    const handleDelete=async (id)=>{
        const x=confirm('etes vous sure tu veux supprimé ce chauffeur')
        if(x){
            try {
                const response=await fetch(`http://127.0.0.1:8000/api/chauffeur/delete/${id}`,{
                    method:'DELETE',
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
    
                if(!response.ok){
                    setPopUp(true)
                }
                const data=await response.json();
                if(data){
                    setSuccess('chauffeur est bien supprimé')
                    location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    

    useEffect(()=>{
        fetchChauffeur()
    },[])

    if(loading) return <Spinners/>

  return (
    unautorized ? <UnauthorizedPage/> :
    <section style={{padding:'32px'}}>
        <NavigateButton destination='addChauffeur' nom='Chauffeur' />
        <div className='flex justify-between'>
            <div>
                <button onClick={()=>navigate('/deletedChauffeur')} className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2'>Afficher les éléments supprimé</button>
                <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search :</label>
                <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='Chercher par CIN'/>
            </div>
            <div className='max-w-sm'>
                <label htmlFor="show" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show :</label>
                <select name="show" id="show" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e=>setItem(Number(e.target.value))}>
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
            <Table >
                <TableHead>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>CIN</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Permis</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Nom</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Prénom</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Adresse</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Tel</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Email</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</TableHeadCell>
                </TableHead>
                <TableBody>
                    {
                        cheuffeurs?.slice(0,item).map((ele,ind)=>(
                            <TableRow key={ind} className={`${ele.deleted==='oui' && 'text-red-700'}`} >
                                <TableCell className='font-semibold bg-slate-50'>{ele.cin}</TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.permis}</TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.nom}</TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.prenom}</TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.adresse}</TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.telephone}</TableCell>
                                <TableCell className='font-semibold bg-slate-50'>{ele.email}</TableCell>
                                <TableCell className='flex font-semibold bg-slate-50'>
                                    <Link to={`/updateChauffeur/${ele.id}`}><BiSolidEdit size={20}/></Link>
                                    <BiTrash size={20} onClick={()=>handleDelete(ele.id)} className='cursor-pointer'/>
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
