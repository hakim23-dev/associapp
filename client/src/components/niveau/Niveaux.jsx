import React, { useContext, useEffect, useState } from 'react'
import {   Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import { BiSolidEdit, BiTrash } from 'react-icons/bi'
import NavigateButton from '../utils/NavigateButton'
import { AppContext } from '../../context/AppContext'
import UnauthorizedPage from '../utils/UnauthorizedPage'
import PopUp from '../utils/PopUp'

export default function Niveaux() {
    const [niveau, setNiveau] = useState([])
    const [allNiveau, setAllNiveau] = useState([])
    const [loading, setLoading] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [item, setItem] = useState(10)
    const [msg, setMsg] = useState('')
    const navigate=useNavigate()
    const {token}=useContext(AppContext)

    const fetchNiveau=async()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/allNiveau',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status===403) {
                setUnauthorized(true)
            }
            const data=await response.json()
            setNiveau(data)
            setAllNiveau(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleDelete=async(id)=>{
        const confir=confirm('are you sur want to delete the item')
        if(confir){
            try {
                const response=await fetch(`http://127.0.0.1:8000/api/niveau/delete/${id}`,{
                    method:'DELETE',
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                if(response.status===403) {
                    setPopUp(true)
                }
                const data=await response.json()
                if(data){
                    setMsg('niveau est bien supprimé')
                    location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSearch=(e)=>{
        const value=e.target.value
        const result=allNiveau.filter(ele=>ele.label.toLowerCase().includes(value.toLowerCase()));
        setNiveau(value===''?allNiveau:result)
    }

    

    useEffect(()=>{
        fetchNiveau()
    },[])

     if(loading) return <Spinners/>

  return (
    unauthorized ?<UnauthorizedPage/> :
    <section className='p-5'>
        <NavigateButton destination='addNiveau' nom='Niveau' />
        <div className='flex justify-between mt-3'>
            <div>
                <button onClick={()=>navigate('/deletedNiveau')} className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2'>Afficher les éléments supprimé</button>
                <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search :</label>
                <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='Chercher par Niveau'/>
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
            {
                msg!=='' && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Supression</span> {msg}
                </div>
            }
            <Table striped hoverable>
                <TableHead>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Niveau</TableHeadCell>
                    <TableHeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</TableHeadCell>
                </TableHead>
                <TableBody>
                    {
                        niveau?.slice(0,item).map((ele,ind)=>(
                            <TableRow key={ind} className={ele.deleted === 'oui' ? 'text-red-700' : ''}>
                                <TableCell className='font-semibold bg-slate-50'>{ele.label} </TableCell>
                                <TableCell className='font-semibold bg-slate-50 flex'> 
                                    <Link to={`/updateNiveau/${ele.id}`}><BiSolidEdit size={20}/></Link>
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
