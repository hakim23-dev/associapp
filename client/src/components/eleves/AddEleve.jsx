import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Spinner from '../utils/Spinner'
import PopUp from '../utils/PopUp'

export default function AddEleve() {

  const [affectationError, setAffectationError] = useState({
    cheuffeur:'',
    bus:'',
    itini:'',
  })
  const [tuteur, setTuteur] = useState({})
  const [niveau, setNiveau] = useState([])
  const [bus, setBus] = useState([])
  const [chauffeur, setchauffeur] = useState([])
  const [itineraire, setItineraire] = useState([])
  const [orphelin, setOrphelin] = useState('non')
  const [sexe, setSexe] = useState()
  const [loading, setLoading] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const {user,token}=useContext(AppContext)
  //paiment status
  const [paimentStatu, setPaimentStatu] = useState('')
  const {id}=useParams()

  const navigate=useNavigate();

  const nomRef=useRef('')
  const prenomnRef=useRef('')
  const birthayRef=useRef('')
  const telRef=useRef('')
  const emailRef=useRef('')
  const adresseRef=useRef('')
  const niveauRef=useRef('')
  const fileRef=useRef('')
  const imageRef=useRef('')
  const limitRef=useRef('')

  // Affectation
  const chauffeurRef=useRef()
  const busRef=useRef()
  const itineraireRef=useRef()

  const fetchTuteur=async ()=>{
    setLoading(true)
      try {
          const response=await fetch(`http://127.0.0.1:8000/api/oneTuteur/${id}`,{
            method:'GET',
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          if(!response.ok){
              throw new Error('un erreur est produit');
          }
          const fetchedTuteur=await response.json()
          return fetchedTuteur
      } catch (error) {
          console.log(error)
      }finally {
        setLoading(false)
      }
  }

  const fetchAllNiveau= async()=>{
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/allNiveau`,{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(!response.ok){
          throw new Error('un erreur est produit');
      }
      const data=await response.json()
      return data
  } catch (error) {
      console.log(error)
  }
  }

  const fetchBus= async()=>{
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/allBus`,{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(!response.ok){
          throw new Error('un erreur est produit');
      }
      const data=await response.json()
      return data;
  } catch (error) {
      console.log(error)
  }
  }

  const fetchAllChauffeur= async()=>{
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/allChauffeur`,{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(!response.ok){
          throw new Error('un erreur est produit');
      }
      const data=await response.json()
      return data
  } catch (error) {
      console.log(error)
  }
  }

  const fetchAllItineraire= async()=>{
    try {
      const response=await fetch(`http://127.0.0.1:8000/api/allIt`,{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(!response.ok){
          throw new Error('un erreur est produit');
      }
      const data=await response.json()
      return data
  } catch (error) {
      console.log(error)
  }
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('nom', nomRef.current.value);
    formData.append('prenom', prenomnRef.current.value);
    formData.append('birthday', birthayRef.current.value);
    formData.append('adresse', adresseRef.current.value);
    formData.append('tel', telRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('file', fileRef.current.files[0]); 
    formData.append('image', imageRef.current.files[0] ); 
    formData.append('sexe', sexe);
    formData.append('tuteurId', id ? Number(id) : 0);
    formData.append('userId', user?.id);
    formData.append('chauffeurId',Number(chauffeurRef.current.value));
    formData.append('busId',Number(busRef.current.value));
    formData.append('itineraireId',Number(itineraireRef.current.value));
    formData.append('orphelin', orphelin); 
    formData.append('niveau',  Number(niveauRef.current.value));
    formData.append('statu',paimentStatu);
    formData.append('limit_date',limitRef.current.value || null);

    /* for(let [key,val] of formData){
      console.log(`key=>${key}, value=>${val}`)
    } */
    if( isNaN(formData.get('chauffeurId'))){
      setAffectationError({...affectationError,cheuffeur:'tu dois choisir un chauffeur'})
      return;
    }else if(isNaN(formData.get('busId'))){
      setAffectationError({...affectationError,bus:'tu dois choisir un bus'})
      return;
    }else if(isNaN(formData.get('itineraireId'))){
      setAffectationError({...affectationError,itini:'tu dois choisir un itineraire'})
      return;
    }


    try {
      const response=await fetch('http://127.0.0.1:8000/api/eleve/store',{
        method:'POST',
        body:formData,
        headers:{
          Authorization:`Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      if(response.status===304){
        setPopUp(true)
      }
      const data=await response.json();
      console.log(data);
      if(data){
        navigate(`/print/${user.id}`)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const fetchdata=async()=>{
    try {
      const [
        tuteursRes,
        niveauxRes,
        chauffeursRes,
        itinerairesRes,
        busRes
      ]=await Promise.all([
        fetchTuteur(),
        fetchAllNiveau(),
        fetchAllChauffeur(),
        fetchAllItineraire(), 
        fetchBus(),
      ]);
      setTuteur(tuteursRes)
      setchauffeur(chauffeursRes)
      setNiveau(niveauxRes)
      setItineraire(itinerairesRes)
      setBus(busRes)

    } catch (error) {
      console.log('erreur',error.message)
    }
  }

  useEffect(()=>{
    fetchdata()
  },[])

  if(loading) return <Spinner/>

  return (
    <section className='p-5 grid grid-cols-1'>
      <div className='border border-green-800 rounded-sm p-2 mb-4' >
        <h2 className='font-bold text-center'>Tuteur information</h2>
        <div className='flex gap-4'>
          <input type="text" className='cursor-not-allowed w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' defaultValue={tuteur?.cin} readOnly/>
          <input type="text" className='cursor-not-allowed w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' defaultValue={tuteur?.nom} readOnly/>
          <input type="text" className='cursor-not-allowed w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' defaultValue={tuteur?.prenom} readOnly/>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='border border-green-800 rounded-sm p-2 mb-4 grid grid-cols-2 gap-4'>
          <h2 className='font-bold text-center col-span-2'>student information</h2>
          <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="nom"  placeholder='Nom' ref={nomRef}/>
          <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="prenom"  placeholder='Prenom' ref={prenomnRef}/>
          <input type="date" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="birthday"  placeholder='date de Naissance' ref={birthayRef}/>
          <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="tel"  placeholder='Tel.' ref={telRef}/>
          <input type="email" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="email"  placeholder='Email' ref={emailRef}/>
          <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' name="adresse"  placeholder='Adresse' ref={adresseRef}/>

          {/* file select */}
          <div>
            <label htmlFor="">Acte de naissance :</label>
            <input type="file" name="acet_anissance" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow' ref={fileRef}  accept='image/*'/>
          </div>

          <div>
            <label htmlFor="">Photo d'éleve :</label>
            <input type="file" name="image" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow' ref={imageRef}  accept='image/*'/>
          </div>

          <div className=' flex w-full flex-row rounded-xl bg-white shadow gap-4 px-4 py-2'>
            <p>Orphelin :</p>
            <div>
              <input type="radio" name="orphelin" id="o" className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all' value={'oui'} onChange={(e)=>setOrphelin(e.target.value)}/>
              <label htmlFor="o" className='ml-2 text-slate-600 cursor-pointer text-sm'>Oui</label>
            </div>
            <div>
              <input type="radio" name="orphelin" id="n" className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all' checked={orphelin==='non'} value={'non'} onChange={(e)=>setOrphelin(e.target.value)}/>
              <label htmlFor="n" className='ml-2 text-slate-600 cursor-pointer text-sm'>Non</label>
            </div>
          </div>
          
          
          {/* niveau select */}
          <select ref={niveauRef} className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' >
            <option>Niveau</option>
            {
              niveau?.map((ele,ind)=>(
                <option value={ele.id} key={ind}>{ele.label} </option>
              ))
            }
          </select>

          {/* sexe select */}
          <div className=' flex w-full flex-row rounded-xl bg-white shadow gap-4 px-4 py-2'>
            <p>Sexe :</p>
            <div>
              <input type="radio" name="sexe" id="m" className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all' value={'maculin'} onChange={(e)=>setSexe(e.target.value)}/>
              <label htmlFor="m" className='ml-2 text-slate-600 cursor-pointer text-sm'>Masculin</label>
            </div>
            <div>
              <input type="radio" name="sexe" id="f" className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all'  value={'feminin'} onChange={(e)=>setSexe(e.target.value)}/>
              <label htmlFor="f" className='ml-2 text-slate-600 cursor-pointer text-sm'>Féminin</label>
            </div>
          </div>
        </div>
        

        <div className='border border-green-800 rounded-sm p-2 mb-4 grid grid-cols-3 gap-4'>
          <h2 className='font-bold text-center  col-span-3'>Affectation</h2>
          {/* ch */}
          <div>
            <select name="" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' ref={chauffeurRef} required>
              <option>Chauffeur</option>
              {
                chauffeur?.map((ele,ind)=>(
                  <option value={ele.id} key={ind}>{ele.nom} </option>
                ))
              }
            </select>
              {affectationError.cheuffeur && <small className='font-semibold text-red-600'>{affectationError.cheuffeur}</small>}  
          </div>
          <div>
            <select name="" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' ref={busRef} required>
              <option>Bus</option>
              {
                bus?.map((ele,ind)=>(
                  <option value={ele.id} key={ind}>{ele.marque} | {ele.immatriculation} </option>
                ))
              }
            </select>
              {affectationError.bus && <small className='font-semibold text-red-600'>{affectationError.bus}</small>}
          </div>
          <div>
            <select name="" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' ref={itineraireRef} required>
              <option>Itinéraire</option>
              {
                itineraire?.map((ele,ind)=>(
                  <option value={ele.id} key={ind}>{ele.nom} </option>
                ))
              }
            </select>
              {affectationError.itini && <small className='font-semibold text-red-600'>{affectationError.itini}</small>}
          </div>
        </div>

        <div className='border border-green-800 rounded-sm p-2 mb-4'>
          <h2 className='font-bold text-center  col-span-3'>Paiment</h2>
          <label htmlFor="p" className='ml-2 text-slate-600 cursor-pointer text-sm hover:bg-slate-300  block py-[2px] '>
            <input type="radio" name="paiment" id="p" className='mr-1 peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all' value={'paye'} onChange={e=>setPaimentStatu(e.target.value)}/>
            Payé
          </label>
          
          <label htmlFor="c" className='ml-2 text-slate-600 cursor-pointer text-sm hover:bg-slate-300 block py-[2px]'>
            <input type="radio" name="paiment" id="c" className='mr-1 peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all' value={'en cours'} onChange={e=>setPaimentStatu(e.target.value)}/>
            En cours
          </label>
          {
            paimentStatu==="en cours" && <div>
              <label htmlFor="limit" className='ml-2 text-slate-600 cursor-pointer text-sm'>Date Limite :</label>
              <input type="date" id="limit" ref={limitRef} className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow'/>
            </div>
          }
        </div>

        <div className='flex justify-center'>
          <button type='submit' className="w-1/12 bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">Sauvegarder</button>
        </div>
      </form>
      {
        popUp && <PopUp/>
      }
    </section>
  )
}
