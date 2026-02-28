import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import OutBtn from './components/OutBtn'

function App() {
  

  return (
    <div className='min-h-screen bg-[#F4F8F7] relative'>
      <Header/>
      <OutBtn/>
      <Outlet/>

    </div>
  )
}

export default App
