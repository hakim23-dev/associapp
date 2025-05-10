import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner'
import { PiPrinter } from 'react-icons/pi'
import {useReactToPrint} from 'react-to-print' 

export default function Print() {
    const [paiment, setPaiment] = useState({})
    const [loading, setLoading] = useState(false)
    const contentRef=useRef(null)
    const {id}=useParams()

    const fetchPaiment=async ()=>{
        setLoading(true)
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/paiment/${id}`)
            if(!response.ok){
                throw new Error
            }

            const data=await response.json();
            setPaiment(data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handlePrint=useReactToPrint({
        contentRef,
        documentTitle:'Paiment',
    })

    useEffect(()=>{
        fetchPaiment()
    },[])

    if(loading) return <Spinners/>

    

  return (
    <section>
        <div className='bg-slate-100 flex flex-col justify-center items-center gap-5' ref={contentRef}>
            <div className='bg-white rounded-xl shadow-lg px-24 py-10'>
            <h2 className='text-center text-2xl mb-3'>جمعية أولاد امحمد للتنمية القروية</h2>
            <p className='text-center text-xl mb-3'>Reçu d'adhésion</p>
            <hr className='w-[42rem] h-1 mx-auto bg-gray-800 border-0 rounded-sm md:my-1 dark:bg-gray-700'/>
            <div className='flex flex-col gap-3'>
                <p ><span className='font-bold'>N° Reçu :</span> {paiment?.id?.toString().padStart(3,0)}/{new Date().getFullYear()} </p>
                <p><span className='font-bold'>Date : </span>{paiment?.date_paiment}</p>
                <p><span className='font-bold'>Nom complet du bénéficiaire:  </span>{paiment?.tuteur?.prenom} {paiment?.tuteur?.nom}</p>
                <p><span className='font-bold'>Numéro de téléphone:</span> {paiment?.tuteur?.telephone} </p>
                <p><span className='font-bold'>Adresse:</span> {paiment?.tuteur?.adresse} </p>
                <p><span className='font-bold'>Montant de l'adhésion payé pour la saison:</span> {paiment?.montant} </p>
                <div>
                    <h3 className='font-semibold'>Les éléves :</h3>
                    <ul className='pl-5'>
                        {
                            paiment?.tuteur?.eleves?.map((ele,ind)=>(
                                <li key={ind} className='underline'>{ele?.nom}  {ele?.prenom}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='flex justify-end '>
                    <p className='font-bold'>Signature :</p>
                </div>
            </div>
            </div>
            <hr className='w-full h-1 mx-auto bg-gray-800 border-0 rounded-sm  dark:bg-gray-700' style={{borderTop:'5px dotted #f1f5f9'}}/>
            <div className='bg-white rounded-xl shadow-lg px-24 py-10'>
                <h2 className='text-center text-2xl mb-3'>جمعية أولاد امحمد للتنمية القروية</h2>
                <p className='text-center text-xl mb-3'>Reçu d'adhésion</p>
                <hr className='w-[42rem] h-1 mx-auto bg-gray-800 border-0 rounded-sm md:my-1 dark:bg-gray-700'/>
                <div className='flex flex-col gap-3'>
                    <p ><span className='font-bold'>N° Reçu :</span> {paiment?.id?.toString().padStart(3,0)}/{new Date().getFullYear()} </p>
                    <p><span className='font-bold'>Date : </span>{paiment?.date_paiment}</p>
                    <p><span className='font-bold'>Nom complet du bénéficiaire:  </span>{paiment?.tuteur?.prenom} {paiment?.tuteur?.nom}</p>
                    <p><span className='font-bold'>Numéro de téléphone:</span> {paiment?.tuteur?.telephone} </p>
                    <p><span className='font-bold'>Adresse:</span> {paiment?.tuteur?.adresse} </p>
                    <p><span className='font-bold'>Montant de l'adhésion payé pour la saison:</span> {paiment?.montant} </p>
                    <div>
                        <h3 className='font-semibold'>Les éléves :</h3>
                        <ul className='pl-5'>
                            {
                                paiment?.tuteur?.eleves?.map((ele,ind)=>(
                                    <li key={ind} className='underline'>{ele?.nom}  {ele?.prenom}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='flex justify-end '>
                        <p className='font-bold'>Signature :</p>
                    </div>
                </div>
            </div>
        </div>
        <hr className='w-full h-1 mx-auto bg-gray-800 border-0 rounded-sm md:my-1 dark:bg-gray-700' style={{borderTop:'5px dotted #f1f5f9'}}/>
        <div className='mt-5 flex justify-center'>
            <button onClick={handlePrint}><PiPrinter size={50}/></button>
        </div>
    </section>
  )
}
