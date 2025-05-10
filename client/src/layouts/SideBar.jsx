import { Button, Drawer, Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import { CiCreditCard1, CiSettings } from 'react-icons/ci'
import { FaBus, FaHome, FaRoad, FaSchool, FaUser, FaUsers } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { MdPaid } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'
import { TfiStatsUp } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ImStatsBars } from "react-icons/im";

export default function SideBar(props) {
    const {isOpen,setIsOpen}=props
    const {user}=useContext(AppContext)
    const navigate=useNavigate()
    const handleClose=()=>setIsOpen(false)
    const deconnect=()=>{
        sessionStorage.removeItem('login');
        navigate('/')
    }

  return (
    <Drawer open={isOpen} onClose={handleClose} >
        <Sidebar aria-label="Sidebar with multi-level dropdown example"  >
            <Sidebar.Logo href="/dashbord" img="/user.jpeg" imgAlt="Flowbite logo" >
                {user?.name}
            </Sidebar.Logo>
            <Sidebar.Items >
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/dashbord" icon={FaHome}>
                        Tableau de bord
                    </Sidebar.Item>

                    <Sidebar.Collapse icon={TfiStatsUp} label="Statistiques générales">
                        <Sidebar.Item href="/generalStats" icon={ImStatsBars}>Statistiques Détaillés</Sidebar.Item>
                        <Sidebar.Item href="/tuteurs" icon={FaUser}>______</Sidebar.Item>
                        <Sidebar.Item href="/eleves" icon={PiStudent}>______</Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Collapse icon={CiSettings} label="Paramètres">
                        <Sidebar.Item href="/chauffeur" icon={CiCreditCard1}>Chauffeurs</Sidebar.Item>
                        <Sidebar.Item href="/bus" icon={FaBus}>Bus</Sidebar.Item>
                        <Sidebar.Item href="/itineraire" icon={FaRoad}>Itinéraires</Sidebar.Item>
                        <Sidebar.Item href="/niveau" icon={FaSchool}>Niveau</Sidebar.Item>
                        <Sidebar.Item href="/user" icon={FaUsers}>Utilisateurs</Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Item href="/tuteurs" icon={FaUser} >
                        Tuteurs
                    </Sidebar.Item>

                    <Sidebar.Item href="/paiment" icon={MdPaid}>
                        Paiments
                    </Sidebar.Item>

                    <Sidebar.Item href="/eleves" icon={PiStudent}>
                        Elèves
                    </Sidebar.Item>

                    <Button onClick={deconnect}> <IoIosLogOut size={25}/> Déconnexion </Button>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
        </Drawer>
  )
}
