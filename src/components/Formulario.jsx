import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const {guardarPaciente, paciente} = usePacientes();

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }

    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        // validar form
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: "Todos los campos deben estar completos",
                error: true
            })
            return;
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})

        setAlerta({
            msg: 'Guardado Correctamente'
        })

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId(null)
    }

    const {msg} = alerta
  return (
    <>
        <h2 className="font-black text-3xl text-center ">Administrador de pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">Añade tus Pacientes y
              <span className="font-bold text-indigo-600 text-xl"> Administralos</span>
            </p>
        <form 
            action=""
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md "
            onSubmit={handleSubmit}
        >
            
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="uppercase font-bold text-gray-700"
                >Nombre Mascota</label>
                <input 
                    type="text" 
                    id="nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre de su mascota..." 
                    className="w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="uppercase font-bold text-gray-700"
                >Nombre Propietario</label>
                <input 
                    type="text" 
                    id="propietario"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                    placeholder="Ingrese el nombre del propietario..." 
                    className="w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="uppercase font-bold text-gray-700"
                >Mail</label>
                <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ingrese el email..." 
                    className="w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="uppercase font-bold text-gray-700"
                >Fecha de Alta</label>
                <input 
                    type="date" 
                    id="fecha"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    className="w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="uppercase font-bold text-gray-700"
                >Sintomas</label>
                <textarea 
                    id="sintomas"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                    placeholder="Ingrese los sintomas..."
                    className="w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            {msg && <Alerta  
            alerta = {alerta}
            />}
            <input 
                type="submit" 
                value={id ? "Guardar Cambios" : "Agregar Paciente"}
                className={`${msg ? "mt-5" : "mt-0"} bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md`}
            />
        </form>
        
    </>
  )
}

export default Formulario