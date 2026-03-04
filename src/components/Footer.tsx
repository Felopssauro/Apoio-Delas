import { Link } from "react-router-dom"

const Footer = () => {
    
  return (
    <footer className='bg-linear-to-r from-[#056881] to-[#a0dcc0] mt-auto text-[#16139c]'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-blue-700'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-2xl font-bold text-[#c2cad8]'>Apoio Delas</h3>
                </div>
            </div>
        

        <div className='pt-6 text-center md:text-left'>
            <p className='text-sm text-[#0c0933] font-bold'>
                &copy; {new Date().getFullYear()}
                <Link to={`/q-somos`}>
                     <strong className="text-[#130b79] uppercase text-xl font-bungee"> Nebula</strong>.
                </Link>
                Todos os direitos reservados.
            </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer