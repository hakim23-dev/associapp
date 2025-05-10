import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Spinners from "../utils/Spinner";

export default function UpdatePermissions() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const { token } = useContext(AppContext);
    const navigate=useNavigate()

    const names = [
        {
            id: 1,
            name: "tableau de bord",
            key: "dashbord",
        },
        {
            id: 2,
            name: "tuteurs",
            key: "tuteur",
        },
        {
            id: 3,
            name: "eleves",
            key: "eleve",
        },
        {
            id: 4,
            name: "chauffeurs",
            key: "chauffeur",
        },
        {
            id: 5,
            name: "Bus",
            key: "bus",
        },
        {
            id: 6,
            name: "Itineraires",
            key: "itineraire",
        },
        {
            id: 7,
            name: "Niveaux",
            key: "niveau",
        },
        {
            id: 8,
            name: "Paiments",
            key: "paiments",
        },
        {
            id: 9,
            name: "Utilisateurs",
            key: "users",
        },
    ];

    const fetchUer = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/getUser/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization:`Bearer ${token}`,
                        accept:'application/json',
                        'content-type':'application/json'
                    },
                }
            );
            if (!response.ok) {
                throw new Error("un erreur est produit");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/permissions"
            );
            if (!response.ok) {
                throw new Error("un erreur est produit");
            }
            const data = await response.json();
            
            return data
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [userRes, permissionsRes] = await Promise.all([
                fetchUer(),
                fetchPermissions(),
            ]);
            setPermissions(permissionsRes);
            setUser(userRes);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAllChange=(e)=>{
        const checked=e.target.checked
        if(checked){
            const allPermissions=permissions?.permissions.map(per=>per.name);
            setSelectedPermissions(allPermissions)
        }else {
            setSelectedPermissions([])
        }
    }

    const handleAddPermissions=(e)=>{
        const {value,checked}=e.target
        if(checked){
            setSelectedPermissions(prev=>[...prev,value])
        }else {
            setSelectedPermissions(prev=>prev.filter(ele=>ele!==value))
        }
    }

    const handleSubmit=async()=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/updatePermissions/${id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization:`Bearer ${token}`,
                        accept:'application/json',
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(selectedPermissions)
                });
                if(!response.ok){
                    throw new Error('un erreur est produit');
                }
                const data=await response.json()
                if(data){
                    navigate(-1)
                }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Spinners />;

    return (
        <section className="p-5">
            <div className="mb-4 space-y-4">
                <h2 className="text-center font-bold text-2xl">Les informations de l'utilisateur</h2>
                <div className="flex gap-4">
                    <p className="font-bold">Nom</p>
                    <p>{user?.name} </p>
                </div>
                <div className="flex gap-4">
                    <p className="font-bold">Prenom :</p>
                    <p>{user?.prenom}</p>
                </div>
                <div className="flex gap-4">
                    <p className="font-bold">Username :</p>
                    <p>{user?.username}</p>
                </div>
                <div className="flex gap-4">
                    <p className="font-bold">Email :</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p className="mb-2">Les Permissions de l'utilisateur :</p>
                    {
                        user?.permissions?.map((ele,ind)=>(
                            <span key={ind} className="p-1 bg-purple-500 border rounded text-white font-semibold">{ele.name} </span>
                        ))
                    }
                </div>
            </div>
            <div>
                <h2 className="text-center font-bold text-2xl">Modifier les permissions de l'utilisateur</h2>
                <div className="border-b-2 p-2">
                    <label htmlFor="all" className="flex items-center cursor-pointer relative">
                        <input  type="checkbox" name="all" id="all" onChange={handleAllChange} className='peer h-5 w-5 cursor-pointer translate-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500'/>
                        <span className="font-bold">Tous Les permissions</span>
                    </label>
                </div>
                <div className="space-y-4">
                    {
                        names.map((ele)=>(
                            <div key={ele.id} className="grid grid-cols-3 gap-4 border-b-2 p-2">
                                <h3 className="font-bold">{ele.name} </h3>
                                <div className="col-span-2 grid grid-cols-4 gap-4">
                                    {
                                        permissions?.permissions?.map((per,ind)=>(
                                            per.name.split('_')[1]===ele.key && <label htmlFor={ind} key={ind} className="flex items-center cursor-pointer relative">
                                                <input type='checkbox' value={per.name} 
                                                id={ind} onChange={handleAddPermissions} 
                                                checked={selectedPermissions.includes(per.name)}
                                                className='peer h-5 w-5 cursor-pointer translate-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500'
                                                />
                                                {per.name}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-3 text-center">
                <button className='w-[50%] bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors' onClick={handleSubmit}>Modifier</button>
            </div>
        </section>
    );
}
