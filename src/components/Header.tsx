import { useState } from "react"
import {X, Menu, User} from 'lucide-react'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const handleNavigate = (path: string) => {
    navigate(path)
  } 
  
  return (
    <header className="bg-linear-to-r from-[#056881] to-[#a0dcc0]">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 text-[#050d74]">
        <div className="flex items-center gap-3">
          <NavLink to={`/`}>
            <h2 className="font-bungee">Apoio Delas</h2>
          </NavLink>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-10 text-sm font-medium font-bungee">
            <NavLink to={`/preciso-ajuda`} className={({isActive}) => isActive ? 'text-[#FF5F37]' : 'hover:text-[#FF5F37]'}>Preciso de Ajuda</NavLink>
            <NavLink to={`/vozes-noticias`} className={({isActive}) => isActive ? 'text-[#FF5F37]' : 'hover:text-[#FF5F37]'}>Vozes e Noticias</NavLink>
            <NavLink to={`/tutorial-denuncia`} className={({isActive}) => isActive ? 'text-[#FF5F37]' : 'hover:text-[#FF5F37]'}>Como Denunciar</NavLink>
          </nav>
            <NavLink to={`/doacoes`}>
            <button className="bg-linear-to-r from-[#FF5F37] to-[#FF7552] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2">
            Doar
            </button>
            </NavLink>
          {isAuthenticated ? (
            <button onClick={() => handleNavigate(`/user-dashboard`)} className="bg-linear-to-r from-[#FF5F37] to-[#FF7552] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <User size={18}/> Meus Relatos
            </button>
          ) : (
            <button onClick={() => handleNavigate(`/login-user`)} className="bg-linear-to-r from-[#FF5F37] to-[#FF7552] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              Entrar
            </button>
          )}
        </div>

        {/* Inicio mobile */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ?  <X/> : <Menu/>}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden px-4 md:px-16 pb-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <NavLink to={`/preciso-ajuda`} className={({isActive}) => isActive ? 'text-[#FF5F37]' : 'hover:text-[#FF5F37]'}>Preciso de Ajuda</NavLink>
            <NavLink to={`/vozes-noticias`} className={({isActive}) => isActive ? 'text-[#FF5F37]' : 'hover:text-[#FF5F37]'}>Vozes e Noticias</NavLink>
            <NavLink to={`/tutorial-denuncia`} className={({isActive}) => isActive ? 'text-[#FF5F37]' : 'hover:text-[#FF5F37]'}>Como Denunciar</NavLink>
          </nav>
            <NavLink to={`/doacoes`}>
            <button className="w-full bg-linear-to-r from-[#FF5F37] to-[#FF7552] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
            Doar
            </button>
            </NavLink>
          {isAuthenticated ? (
            <button onClick={() => handleNavigate(`/user-dashboard`)} className="w-full bg-[#f7a670] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#f1740e] transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              <User size={18}/> Meus Relatos
            </button>
          ) : (
            <button onClick={() => handleNavigate(`/login-user`)} className="w-full bg-[#f7a670] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#f1740e] transition-all duration-200 shadow-sm hover:shadow-md">
              Entrar
            </button>
          )}
        </div>
      )}
    </header>
  )
}

export default Header