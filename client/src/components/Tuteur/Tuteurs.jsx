import {  Table } from 'flowbite-react'
import React, { useContext, useEffect,  useState } from 'react'
import { FaStickyNote } from 'react-icons/fa'
import {BiSolidEdit, BiTrash} from 'react-icons/bi'
import {  Link, useNavigate } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import NavigateButton from '../utils/NavigateButton'
import {AppContext} from '../../context/AppContext'
import UnauthorizedPage from '../utils/UnauthorizedPage'
import PopUp from '../utils/PopUp'

export default function Tuteurs() {
  const [tuteurs, setTuteurs] = useState([])
  const [allTuteurs, setAllTuteurs] = useState([])
  const [loading, setLoading] = useState(false)
  const [authorization, setAuthorization] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [numItems, setNumItems] = useState(10)
  const [msg, setMsg] = useState('')
  const navigate=useNavigate()
  const {token}=useContext(AppContext)

  const fetchTuteurs=async ()=>{
    setLoading(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/allTuteur',{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.status===304){
        setAuthorization(true)
      }

      const data=await response.json()
      setTuteurs(data)
      setAllTuteurs(data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const handleSearch=(e)=>{
    const value=e.target.value;
    const result=allTuteurs.filter(ele=>ele.cin.toLowerCase().includes(value.toLowerCase()))
    setTuteurs(value==='' ? allTuteurs:result)
  }

  const handleDelete=async(id)=>{
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/tuteur/delete/${id}`,{
        method:'DELETE',
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      if(response.status===304){
        setPopUp(true)
      }

      const data=await response.json();
      console.log(data)
      if(data){
        location.reload()
        setMsg('le tuteur est supprimé');
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchTuteurs()
  },[])

  


  if(loading) return <Spinners/>

  return (
    authorization ? <UnauthorizedPage/> :
    <section className='' style={{padding:'32px'}}>
      <NavigateButton destination={'addTuteur'} nom='tuteur'/>
      <div className='flex justify-between'>
        <div>
          <button onClick={()=>navigate('/deletedTuteur')} className='block bg-black text-white p-2 rounded-sm hover:bg-slate-800 mb-2'>Afficher les éléments supprimé</button>
          <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search : </label>
          <input type="search" name="search" id="search" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' onChange={handleSearch} placeholder='chercher par CIN'/>
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
        {
          msg && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Supression</span> {msg}
          </div>
        }
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell  className='bg-green-500 font-bold text-sm text-black cursor-pointer'>
              C.I.N 
            </Table.HeadCell>
            <Table.HeadCell  className='bg-green-500 font-bold text-sm text-black cursor-pointer'>
              Prénom 
            </Table.HeadCell>
            <Table.HeadCell  className='bg-green-500 font-bold text-sm text-black cursor-pointer'>
              Nom      </Table.HeadCell>
            <Table.HeadCell  className='bg-green-500 font-bold text-sm text-black cursor-pointer'>
              Tel. 
            </Table.HeadCell>
            <Table.HeadCell  className='bg-green-500 font-bold text-sm text-black cursor-pointer'>
              Email          
              </Table.HeadCell>
            <Table.HeadCell  className='bg-green-500 font-bold text-sm text-black cursor-pointer'>
              Adresse
            </Table.HeadCell>
            <Table.HeadCell className='bg-green-500 font-bold text-sm text-black cursor-pointer'>Controle</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {tuteurs?.slice(0,numItems).map((ele,ind)=>(
              <Table.Row key={ind} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='font-semibold bg-slate-50'>{ele.cin} </Table.Cell>
                <Table.Cell className='font-semibold bg-slate-50'>{ele.prenom} </Table.Cell>
                <Table.Cell className='font-semibold bg-slate-50'>{ele.nom} </Table.Cell>
                <Table.Cell className='font-semibold bg-slate-50'>{ele.telephone} </Table.Cell>
                <Table.Cell className='font-semibold bg-slate-50'>{ele.email} </Table.Cell>
                <Table.Cell className='font-semibold bg-slate-50'>{ele.adresse} </Table.Cell>
                <Table.Cell className='font-semibold bg-slate-50 flex'>
                  <Link to={`/addEleves/${ele.id}`}><FaStickyNote size={20}/></Link>
                  <Link to={`/updateTuteur/${ele.id}`}><BiSolidEdit size={20}/></Link>
                  <BiTrash size={20} onClick={()=>handleDelete(ele.id)} className='cursor-pointer'/>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {
        popUp && <PopUp/>
      }
    </section>
  )
}
