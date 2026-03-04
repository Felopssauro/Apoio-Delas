import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
 const [displayText, setDisplayText] = useState('')
  const [displayHighLight, setDisplayHighLight] = useState('')
  const [isTyping, setIstyping] = useState(true)

  const fullText = 'Um espaço seguro para sua '
  const highLightText = 'VOZ'
  const typeingSpeed = 200 // milissegundos

  useEffect(() => {
    let currentIndex = 0
    let highlightIndex = 0
    let stage = 'typing-full' // 'typing-full' ou 'typing-highlight'
    let timeOutId: ReturnType<typeof setTimeout>

    const animate = () => {
      if (stage === 'typing-full') {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex + 1))
          currentIndex++
          timeOutId = setTimeout(animate, typeingSpeed)
        } else {
          // Terminou o texto principal, começa o highlight
          stage = 'typing-highlight'
          highlightIndex = 0
          timeOutId = setTimeout(animate, typeingSpeed)
        }
      } else if (stage === 'typing-highlight') {
        if (highlightIndex < highLightText.length) {
          setDisplayHighLight(highLightText.substring(0, highlightIndex + 1))
          highlightIndex++
          timeOutId = setTimeout(animate, typeingSpeed)
        } else {
          // Tudo pronto
          setIstyping(false)
        }
      }
    }

    animate()
    
    return () => clearTimeout(timeOutId)
  }, [])


  const handleNavigate = (path: string) => {
    navigate(path)
  }
  return (
    <main className='min-h-screen bg-linear-to-r  from-[#056881] to-[#A0DCC0] text-center flex justify-center flex-col items-center'>
        <div className='max-w-140 mb-5 px-6 md:px-0'>
          <h1 className='mb-4 text-[#09083D] text-3xl md:text-5xl lg:text-6xl '>
              {displayText}
              <span className='font-bold text-[#7b0692]'>{displayHighLight}</span>
              {isTyping && <span className="animate-pulse">|</span>}
          </h1>
          <p className='mt-6 leading-relaxed text-base md:text-lg text-[#09083D]'>
            Plataforma de Apoio Integral a Mulheres Vitimas de Violencia
          </p>
        </div>

        <div onClick={() => handleNavigate(`/q-somos`)} className='flex gap-3 justify-center flex-col items-center max-w-sm w-full px-6 md:px-0'>
          <button className='bg-[#3262ff9f] text-white px-3 py-4 border-none rounded-lg text-base font-semibold cursor-pointer no-underline flex justify-center gap-2 items-center w-full transition-all duration-150 hover:bg-[#FF5B32]'>
            Quero Entender
          </button>
         
            <button onClick={() => handleNavigate(`/mapa`)} className='bg-[#3262ff9f] text-white px-3 py-4 border-none rounded-lg text-base font-semibold cursor-pointer no-underline flex justify-center gap-2 items-center w-full transition-colors duration-300 hover:bg-[#FF5B32]'>
             Ver Mapa
            </button>
          
        </div>
    </main>
  )
}

export default Hero