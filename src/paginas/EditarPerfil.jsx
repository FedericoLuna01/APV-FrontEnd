import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {nombre, email} = perfil;
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Los campos de Email y Nombre son Obligatorios',
                error: true
            })
            return;
        } 

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }

    const {msg} = alerta
  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center ">Modifica tus 
            <span className="text-indigo-600 font-bold"> Datos Personales</span>
        </p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input 
                        type="text" 
                        value={perfil.nombre || ''}
                        onChange={ e => setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}
                        placeholder="Ingresa tu nombre..." 
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        name="nombre"
                        id="nombre"
                        />
                    </div>
                    <div className="my-3 mt-5">
                        <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                        <input 
                        type="text" 
                        value={perfil.web || ''}
                        onChange={ e => setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}
                        placeholder="Ingresa su sitio web..." 
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        name="web"
                        id="web"
                        />
                    </div>
                    <div className="my-3 mt-5">
                        <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Telefono</label>
                        <input 
                        type="text" 
                        value={perfil.telefono || ''}
                        onChange={ e => setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}
                        placeholder="Ingresa su telefono o celular..." 
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        name="telefono"
                        id="telefono"
                        />
                    </div>
                    <div className="my-3 mt-5">
                        <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                        <input 
                        type="text" 
                        value={perfil.email || ''}
                        onChange={ e => setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })}
                        placeholder="Ingresa su email..." 
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        name="email"
                        id="email"
                        />
                    </div>
                    {msg && <Alerta 
                        alerta={alerta}
                    />}
                    <input 
                    type="submit" 
                    value="Guardar cambios" 
                    className="bg-indigo-700 px-10 py-3 text-white font-bold rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer" 
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil