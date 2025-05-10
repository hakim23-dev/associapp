import Login from './components/Login'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Dashbord from './components/Dashbord'
import Tuteurs from './components/Tuteur/Tuteurs'
import Eleves from './components/eleves/Eleves'
import AddTuteur from './components/Tuteur/AddTuteur'
import AddEleve from './components/eleves/AddEleve'
import UpdateTuteur from './components/Tuteur/UpdateTuteur'
import UpdateEleve from './components/eleves/UpdateEleve'
import Chauffeurs from './components/chauffeur/Chauffeurs'
import UpdateChauffeur from './components/chauffeur/UpdateChauffeur'
import AddChauffeur from './components/chauffeur/AddChauffeur'
import Bus from './components/bus/Bus'
import UpdateBus from './components/bus/UpdateBus'
import AddBus from './components/bus/AddBus'
import Itineraires from './components/itineraire/Itineraires'
import AddItineraire from './components/itineraire/AddItineraire'
import UpdateIrineraire from './components/itineraire/UpdateIrineraire'
import Niveaux from './components/niveau/Niveaux'
import AddNiveau from './components/niveau/AddNiveau'
import UpdateNiveau from './components/niveau/UpdateNiveau'
import ProtectedPages from './layouts/ProtectedPages'
import User from './components/user/User'
import AddUser from './components/user/AddUser'
import Paiment from './components/paiment/Paiment'
import Print from './components/print/Print'
import EleveProfile from './components/eleves/EleveProfile'
import UserProfile from './components/user/UserProfile'
import UpdatePsw from './components/user/UpdatePsw'
import DeletedChauffeurs from './components/chauffeur/DeletedChauffeurs'
import DeletedBus from './components/bus/DeletedBus'
import DeletedItineraire from './components/itineraire/DeletedItineraire'
import DeletedNiveau from './components/niveau/DeletedNiveau'
import DeletedTuteurs from './components/Tuteur/DeletedTuteurs'
import DeletedEleve from './components/eleves/DeletedEleve'
import GeneralStats from './components/GeneralStats'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePermissions from './components/user/UpdatePermissions'
import DeletedUser from './components/user/DeletedUser'

function App() {

  const route=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Login/>} />
        <Route   element={<ProtectedPages/>} >
          <Route path='dashbord' element={<Dashbord/>} />
          <Route path='generalStats' element={<GeneralStats/>} />

          <Route path='tuteurs' element={<Tuteurs/>} />
          <Route path='Deletedtuteur' element={<DeletedTuteurs/>} />
          <Route path='addTuteur' element={<AddTuteur/>} />
          <Route path='updateTuteur/:id' element={<UpdateTuteur/>} />

          <Route path='eleves' element={<Eleves/>} />
          <Route path='deletedEleves' element={<DeletedEleve/>} />
          <Route path='addEleves/:id' element={<AddEleve/>} />
          <Route path='updateEleve/:id' element={<UpdateEleve/>} />
          <Route path='eleveProfile/:id' element={<EleveProfile/>} />

          <Route path='chauffeur' element={<Chauffeurs/>} />
          <Route path='deletedChauffeur' element={<DeletedChauffeurs/>} />
          <Route path='addChauffeur' element={<AddChauffeur/>} />
          <Route path='updateChauffeur/:id' element={<UpdateChauffeur/>} />

          <Route path='bus' element={<Bus/>} />
          <Route path='deletedBus' element={<DeletedBus/>} />
          <Route path='addBus' element={<AddBus/>} />
          <Route path='updateBus/:id' element={<UpdateBus/>} />

          <Route path='itineraire' element={<Itineraires/>} />
          <Route path='deletedItineraire' element={<DeletedItineraire/>} />
          <Route path='addItin' element={<AddItineraire/>} />
          <Route path='updateItineraire/:id' element={<UpdateIrineraire/>} />

          <Route path='niveau' element={<Niveaux/>} />
          <Route path='deletedNiveau' element={<DeletedNiveau/>} />
          <Route path='addNiveau' element={<AddNiveau/>} />
          <Route path='updateNiveau/:id' element={<UpdateNiveau/>} />

          <Route path='user' element={<User/>} />
          <Route path='adduser' element={<AddUser/>} />
          <Route path='userProfile' element={<UserProfile/>} />
          <Route path='updatePsw' element={<UpdatePsw/>} />
          <Route path='updateProfile' element={<UpdateProfile/>} />
          <Route path='updatePermissions/:id' element={<UpdatePermissions/>} />
          <Route path='deletedUser' element={<DeletedUser/>} />

          <Route path='paiment' element={<Paiment/>} />
          <Route path='print/:id' element={<Print/>} />

          <Route path='*' element={<Dashbord/>} />
        </Route>
      </Route>
    )
  )

  

  return (
    <RouterProvider router={route}/>
  )
}

export default App
