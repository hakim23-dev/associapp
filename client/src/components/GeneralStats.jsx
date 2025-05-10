import React, { useContext, useEffect, useState } from 'react'
import Spinners from './utils/Spinner';
import { HiOutlineDownload } from "react-icons/hi";
import {AppContext} from '../context/AppContext'
import { Card } from 'flowbite-react';

export default function GeneralStats() {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState([])
  const {token}=useContext(AppContext)

  const fetchStats=async ()=>{
    setLoading(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/stats',{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      if(!response.ok){
        throw new Error('un erreur est produit')
      }
      const data=await response.json();
      setStats(data);
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }


  const handleDownload=async()=>{
    setLoading(true)
    try {
      const response=await fetch('http://localhost:8000/api/backup/download');
      if(!response.ok){
        alert("erreur lor de backup")
        return
      }
      const blob=await response.blob();
      const url=window.URL.createObjectURL(blob);
      let a=document.createElement('a');
      a.href=url
      const fileName=`backup_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.zip`;
      a.download=fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchStats()
  },[])

  if(loading) return <Spinners/>

  return (
    <section className='p-5'>
        <button onClick={handleDownload} className='mb-3 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:text-white focus:bg-blue-800 focus:border-blue-800 active:border-blue-800 active:text-white active:bg-blue-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'> <HiOutlineDownload size={25} />Télécharger le backup</button>
        <div className='space-y-3'>
          <Card>
            <h3 className='font-bold text-xl'>Revenu Par moi</h3>
            {
              stats?.revenuPerdate?.map((ele,ind)=>(
                <div key={ind}>
                  <p>mois : <span className='font-bold'>{ele.mois}</span> </p>
                  <p>monatnt : <span className="font-bold">{ele.total}</span> </p>
                </div>
              ))
            }
          </Card>
          <Card>
            <h3 className='font-bold text-xl'>Nombre d'itineraire : {stats?.route_num} </h3>
            {
              stats?.elevePerIti?.map((ele,ind)=>(
                <div key={ind}>
                  <p>nom d'itineraire : <span className="font-bold">{ele.nom} </span></p>
                  <p>nombre des éléves : <span className="font-bold">{ele.eleves_count}</span> </p>
                </div>
              ))
            }
          </Card>
          <Card>
            <h3 className='font-bold text-xl'>Nombre des bus : {stats?.bus_num} </h3>
            {
              stats?.elevePerBus?.map((ele,ind)=>(
                <div key={ind}>
                  <p>nom d'itineraire : <span className="font-bold">{ele.immatriculation}</span> </p>
                  <p>nombre des éléves : <span className="font-bold">{ele.eleves_count}</span> </p>
                </div>
              ))
            }
          </Card>
          <Card>
            <h3 className='font-bold text-xl'>Nombre des chauffeurs : {stats?.chauffeur_num} </h3>
            {
              stats?.elevePerCh?.map((ele,ind)=>(
                <div key={ind}>
                  <p>nom de cauffeur : <span className="font-bold">{ele.nom} {ele.prenom}</span> </p>
                  <p>nombre des éléves : <span className="font-bold">{ele.eleves_count}</span> </p>
                </div>
              ))
            }
          </Card>
          
          <Card>
            <h3 className='font-bold text-xl'>Nombre des Tuteurs : {stats?.tuteur_num} </h3>
            {
              stats?.topTuteurPayement?.map((ele,ind)=>(
                <div key={ind}>
                  <p>nom de cauffeur : {ele.nom} {ele.prenom} </p>
                  <p>nombre des éléves : {ele.paiments_sum_montant} </p>
                </div>
              ))
            }
          </Card>

          <Card>
            <h3 className='font-bold text-xl'>Nombre des Tuteurs en retard : {stats?.PaimentRetard.length} </h3>
            {
              stats?.PaimentRetard?.map((ele,ind)=>(
                <div key={ind}>
                  <p>nom de tuteur : {ele.nom} {ele.prenom} </p>
                  <p>nom de tuteur : {ele.telephone} </p>
                  <p>nombre des éléves : {ele.limit} </p>
                </div>
              ))
            }
          </Card>
          
        </div>
    </section>
  )
}
