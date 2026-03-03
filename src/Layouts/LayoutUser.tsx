import { Outlet, useNavigate } from "react-router-dom"
import HeaderAdmin from "../components/HeaderAdmin"
import Footer from "../components/Footer"
import OutBtn from "../components/OutBtn"
import { useAuth } from "../context/AuthContext"

const LayoutUser = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogOut = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-[#F4F8F7] relative'>
      <HeaderAdmin
        username={user?.name || 'Usuário'}
        role="Usuário"
        onLogOut={handleLogOut}
      />
      <Outlet/>
      <Footer/>
      <OutBtn/>
    </div>
  )
}

export default LayoutUser