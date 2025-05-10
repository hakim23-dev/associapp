import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinners from '../utils/Spinner'

export default function EleveProfile() {
  const [eleve, setEleve] = useState({})
  const [loading, setLoading] = useState(false)
  const {id}=useParams()

    const fetchOneEleve=async()=>{
      setLoading(true)
      try {
          const response=await fetch(`http://127.0.0.1:8000/api/eleve/${id}`)
          if(!response.ok){
              throw new Error
          }
          const eleve=await response.json()
          console.log(eleve)
          setEleve(eleve)
      } catch (error) {
          console.log(error)
      }finally {
          setLoading(false)
      }
  }

  useEffect(()=>{
    fetchOneEleve()
  },[])

  if(loading) return <Spinners/>

  return (
    <section className='w-full h-screen  px-10 pt-10 bg-gray-100/25'>
      <div className='relative mt-16 mb-32 max-w-sm mx-auto' >
        <div className='rounded overflow-hidden shadow-md bg-white'>
          <div className='absolute -mt-20 w-full flex justify-center'>
            <img src={eleve?.picture || '/user.jpeg'} alt="elece picture" className='rounded-full object-cover h-36 w-36 shadow-md'/>
          </div>
          <div className='px-6 mt-16'>
            <dl>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Nom comptet de Tuteur</p>
                <p className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">{eleve?.tuteur?.nom} {eleve?.tuteur?.prenom}</p>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Tel de Tuteur</p>
                <p className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">{eleve?.tuteur?.telephone}</p>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">Adresse de Tuteur</p>
                <p className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">{eleve?.tuteur?.adresse}</p>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Nom complet
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.nom} {eleve?.eleve?.prenom}
                  </dd>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Adresse 
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.adresse}
                  </dd>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Email
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.email ?eleve?.eleve?.email :'undéfiné'}
                  </dd>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Telephone
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.telephone ?eleve?.eleve?.telephone :'undéfiné'}
                  </dd>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Adresse
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.date_naissance}
                  </dd>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      genre
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.sexe}
                  </dd>
              </div>
              <div className="py-3 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                      Orphelin
                  </dt>
                  <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                    {eleve?.eleve?.orphelin}
                  </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
