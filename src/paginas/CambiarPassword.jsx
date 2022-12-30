import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        passActual: '',
        passNueva: ''
    })

    const {guardarPassword} =  useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }

        if(password.passActual.length < 6) {
            setAlerta({
                msg: "La nueva contraseña debe tener minimo 6 caracteres",
                error: true
            })
            return;
        }

        const respuesta = await guardarPassword(password)

        setAlerta(respuesta)
    }

    const {msg} = alerta;

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center ">Modifica tu <span className="text-indigo-600 font-bold"> Password</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                        <input 
                        type="password" 
                        name="passActual"
                        placeholder="Ingrese su contraseña actual..."
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        onChange={e => setPassword({
                            ...password,
                            [e.target.name]: e.target.value
                        })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nueva Contraseña</label>
                        <input 
                        type="password" 
                        name="passNueva"
                        placeholder="Ingrese su nueva contraseña..."
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        onChange={e => setPassword({
                            ...password,
                            [e.target.name]: e.target.value
                        })}
                        />
                    </div>
                    {msg && <Alerta 
                        alerta={alerta}
                    />}
                    <input 
                    type="submit" 
                    value="Actualizar contraseña" 
                    className="bg-indigo-700 px-10 py-3 text-white font-bold rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer" 
                    />
                </form>
            </div>
        </div> 
    </>
  )
}

export default CambiarPassword