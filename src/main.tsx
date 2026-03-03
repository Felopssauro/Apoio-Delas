import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Home from './route/Home.tsx'
import Mapa from './route/Mapa.tsx'
import NeedHelp from './route/NeedHelp.tsx'
import Forum from './route/Forum.tsx'
import Post from './route/Post.tsx'
import CicloViolencia from './route/CicloViolencia.tsx'
import LoginUser from './route/LoginUser.tsx'
import LoginAdmin from './route/LoginAdmin.tsx'
import LayoutSite from './Layouts/LayoutSite.tsx'
import  LayoutUser from './Layouts/LayoutUser.tsx'
import LayoutAdmin from './Layouts/LayoutAdmin.tsx'
import UserDashboard from './route/UserDashboard.tsx'
import Us from './route/Us.tsx'

const router = createBrowserRouter([
  // site publico
  {
    element: <LayoutSite/>,
    children: [
       {
        path: "/",
        element: <Home/>
      },
      {
        path: "/q-somos",
        element: <Us/>
      },
      {
        path: "/mapa",
        element: <Mapa/>
      },
      {
        path: "/testes",
        element:  <Mapa/>
      },
      {
        path:"/preciso-ajuda",
        element: <NeedHelp/>
      },
      {
        path:"/vozes-noticias",
        element: <Forum/>
      },
      {
        path:"/vozes-noticias/:id",
        element: <Post/>
      },
      {
        path: "/ciclo-violencia",
        element: <CicloViolencia/>
      }
    ]
  },

  //Login User
  {
    path: "/login-user",
    element: <LoginUser/>,
  },

  //  ÁREA DO USUÁRIO
  {
    element: <LayoutUser/>,
    children: [
      { path: "/user-dashboard",
        element: <UserDashboard/>
      }
    ]
  },

  //  LOGIN ADMIN (SEM HEADER)
  {
    path: "/login-admin",
    element: <LoginAdmin />
  },

  // ÁREA DO ADMIN
  {
    element:<LayoutAdmin/>,
    children: [
      { path: "/admin-dashboard"

      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
