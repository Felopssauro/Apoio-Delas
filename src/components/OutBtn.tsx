const OutBtn = () => {
const handleOut = () => {
  window.location.replace('https://www.youtube.com/watch?v=aLC5lPOz6vY&t=310s')
}
  return (
    <button className='fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-[#FF5F37] text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition' onClick={handleOut}>
        Saída Rápida
    </button>
  )
}

export default OutBtn