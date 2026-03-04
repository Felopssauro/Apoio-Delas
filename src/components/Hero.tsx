import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Users, Megaphone, AlertCircle, Shield, MapPin } from "lucide-react"

const quickLinks = [
  { icon: <Users size={18} />, label: 'Grupos de Apoio', path: '/g-apoio' },
  { icon: <MapPin size={18} />, label: 'Ver Mapa de Instituições', path: '/mapa' },
  { icon: <Megaphone size={18} />, label: 'Como Denunciar', path: '/tutorial-denuncia' },
]

const Hero = () => {
  const navigate = useNavigate()
 const [displayText, setDisplayText] = useState('')
  const [displayHighLight, setDisplayHighLight] = useState('')
  const [isTyping, setIstyping] = useState(true)

  const fullText = 'Apoio '
  const highLightText = 'DELAS'
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
    <main
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://img.freepik.com/vetores-gratis/senhoras-de-diferentes-nacionalidades-abracando-o-apartamento_1284-58728.jpg?t=st=1772658482~exp=1772662082~hmac=2790a5e3911c68b4debade69c28837f2d1325905c6ca89f9cdfd436e262a2a93&w=1480')`,
      }}
    >
      {/* Overlay — mais forte no mobile para cobrir a imagem */}
      <div className="absolute inset-0 bg-[#0568815b] md:bg-linear-to-r md:from-[#056881]/90 md:via-[#056881]/65 md:to-transparent pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-16 py-20 flex flex-col items-center md:items-start gap-5 text-center md:text-left">

        {/* Badge */}
        <span className="bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase backdrop-blur-sm">
          Plataforma de Apoio Integral
        </span>

        {/* Título */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          {displayText}
          <span className="text-[#3d0e69]">{displayHighLight}</span>
          {isTyping && <span className="animate-pulse text-white">|</span>}
        </h1>

        {/* Subtítulo */}
        <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-md">
          Plataforma de Apoio Integral a Mulheres Vítimas de Violência
        </p>

        {/* Botões principais */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate('/preciso-ajuda')}
            className="flex items-center justify-center gap-2 bg-[#FF5F37] hover:bg-[#e04820] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <AlertCircle size={18} />
            Preciso Denunciar - Ajuda Urgente
          </button>
          <button
            onClick={() => navigate('/testes')}
            className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Shield size={18} />
            Fazer Testes de Identificação
          </button>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px bg-white/25" />
          <span className="text-white/40 text-xs tracking-widest uppercase shrink-0">acesso rápido</span>
          <div className="flex-1 h-px bg-white/25" />
        </div>

        {/* Pills de acesso rápido */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {quickLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2 bg-white/10 hover:bg-[#FF5F37] border border-white/20 text-white px-4 py-2 rounded-full font-medium text-xs md:text-sm transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

      </div>
    </main>
  )
}

export default Hero