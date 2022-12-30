import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = () => {

    const {cerrarSesion} = useAuth();
  return (
    <header className="py-10 bg-indigo-600 px-5">
        <div className="container mx-auto flex flex-col justify-between items-center lg:flex-row ">
            <h1 className="font-black text-indigo-200 text-2xl text-center">Administrador de Pacientes de 
                <span className="text-white"> Veterinaria</span>
            </h1>
            <nav className="flex gap-4 items-center flex-col sm:flex-row mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-m uppercase font-bold">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-m uppercase font-bold">Perfil</Link>
                <button 
                    type="button" 
                    className="text-white text-m uppercase font-bold"
                    onClick={cerrarSesion}
                    >Cerrar Sesión
                </button>
            </nav>
        </div>
    </header>
  )
}

export default Header