import { Card } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { BiMoney} from 'react-icons/bi'
import { FaBus } from 'react-icons/fa'
import Spinners from './utils/Spinner'
import { PiStudent } from 'react-icons/pi'
import { RiFilePaperFill } from 'react-icons/ri'
import {AppContext} from '../context/AppContext';
import {Line,Bar} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

import UnauthorizedPage from './utils/UnauthorizedPage'

export default function Dashbord() {
  const [loading,setLoadin]=useState(false)
  const [dashboadData, setdashboardData] = useState({})
  const [graphData, setGraphData] = useState(null)
  const [authorization, setAuthorization] = useState(false)
  const {token}=useContext(AppContext);
  

  const fetchDashboardData=async()=>{
    setLoadin(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/dashboard',{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      if(response.status===403){
        setAuthorization(true)
      }

      const data=await response.json()
      setdashboardData(data);
      setGraphData(data?.stats?.month_paiment[0]['month_paiment'])
    } catch (error) {
      console.log(error)
    }finally{
      setLoadin(false)
    }
  }



  const options={
    responsive:true,
    plugins:{
      legend:{
        position:'bottom'
      },
      title:{
        display:true,
        text:'graphe des revenus pour ce mois'
      }
    }
  }

  const data={
    labels:[
      `${new Intl.DateTimeFormat('fr-FR',{year:'numeric',month:'long'}).format(new Date())}`
    ],
    datasets:[
      {
        label:`les revenues`,
        data:[graphData],
        borderColor:'rgba(75,192,192)',
        backgroundColor:'rgba(255,99,132,0.2)'
      }
    ]
  }

  useEffect(()=>{
    //fetchTuteurPaiment()
    fetchDashboardData()
  },[])

  if(loading){
    return <Spinners/>
  }  


  return (
    authorization ?<UnauthorizedPage/> :
    <section className='flex  flex-col gap-y-4 p-6'>
      <h1 className='font-bold text-5xl text-center' >Dashboard</h1>
      <div className='grid grid-cols-4 gap-4'>
        <Card className=' bg-blue-500' >
          <BiMoney size={35} />
          <p className='font-bold'>revenus Totale :</p>
          <p className='font-bold'> {dashboadData?.stats?.abonnement_total[0]['abonnement_total']} DH</p>
        </Card>
        <Card className='bg-lime-500'>
          <FaBus size={35}/>
          <p className='font-bold'>les voitures : {dashboadData?.stats?.bus}</p>
          <p className='font-bold'>les conducteurs :  {dashboadData?.stats?.chauffeurs}</p>
        </Card>
        <Card className='bg-red-500'>
          <RiFilePaperFill size={35}/>
          <p className='font-bold'>Abonnements :</p>
          <p className='font-bold'>{dashboadData?.stats?.paiment}</p>
        </Card>
        <Card className='bg-yellow-100'>
          <PiStudent size={35}/>
          <p className='font-bold'>les éléves : {dashboadData?.stats?.students}</p>
          <p className='font-bold'>les éléves feminins : <span className='bg-rose-100 text-slate-800 text-md font-medium me-2 px-2.5 py-0.5 rounded-sm '>{dashboadData?.stats?.girls}</span>  </p>
          <p className='font-bold'>les éléves masculins : <span className='bg-blue-300 text-slate-800 text-md font-medium me-2 px-2.5 py-0.5 rounded-sm '>{dashboadData?.stats?.boys}</span>  </p>
          <p className='font-bold'>les éléves exonérés : <span className='bg-green-100 text-slate-800 text-md font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300'>{dashboadData?.stats?.student_exonere[0]['student_exonere']}</span>  </p>
        </Card>
      </div>
      <div>
          <Bar options={options} data={data} height={100}/>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <Card className='col-span-2 bg-slate-500 text-white'>
          <h3 className='font-bold'>Abonnement de ce mois</h3>
          <hr />
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {dashboadData?.mont_abonnement?.map((ele,ind)=>(
            <li key={ind} className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium  dark:text-white">{ele?.nom} {ele?.prenom}</p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">{ele?.email} </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold  dark:text-white">{ele?.montant} DH</div>
              </div>
            </li>
          ))}
          </ul>
        </Card>
        <Card className='col-span-2 bg-slate-500 text-white'>
          <h3 className='font-bold'>Dernier abonnement</h3>
          <hr />
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {dashboadData?.last_abonnement?.map((ele,ind)=>(
            <li key={ind} className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium  dark:text-white">{ele?.tuteur?.nom} {ele?.tuteur?.prenom}</p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">{ele?.tuteur?.email} </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold  dark:text-white">{ele?.montant} DH</div>
              </div>
            </li>
          ))}
          </ul>
        </Card>
        
      </div>
      
    </section>
  )
}
