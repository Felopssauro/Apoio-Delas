// Forum.tsx
import { Link, useNavigate } from "react-router-dom"
import { MessageCircle, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect, useRef } from "react"

type PostBD = {
  id: number
  title: string | null
  content: string
  anonymous: boolean
  createdAt: string
  author: { name: string } | null
  comments: { id: number }[]
}

const Relatos = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostBD[]>([])
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/feature/stories')
        const data = await res.json()
        setPosts(Array.isArray(data) ? data.slice(0, 10) : [])
      } catch {
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleCompartilhar = () => {
    if (isAuthenticated) {
      navigate('/user-dashboard')
    } else {
      navigate('/login-user')
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const card = carouselRef.current.querySelector('a')
    const cardWidth = card ? card.offsetWidth + 24 : 320 // 24 = gap-6
    carouselRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase">Comunidade</span>
            <Link to={`/vozes-noticias`}>
              <h2 className="text-3xl font-bold text-[#09083d] mt-1">Vozes e Notícias</h2>
            </Link>
            <p className="text-gray-500 text-sm mt-1">Relatos e experiências compartilhadas pela comunidade</p>
          </div>
          <button
            onClick={handleCompartilhar}
            className="flex items-center gap-2 bg-[#FF5F37] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#e04820] transition-all shadow-sm hover:shadow-md"
          >
            <Plus size={16} />
            Compartilhar Relato
          </button>
        </div>

        {/* Aviso não logada */}
        {!isAuthenticated && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 text-sm px-5 py-3 rounded-2xl">
            Faça login para compartilhar seu relato ou comentar nas histórias da comunidade.{' '}
            <Link to="/login-user" className="font-semibold underline underline-offset-2 hover:text-amber-900">
              Entrar
            </Link>
          </div>
        )}

        {loading && <p className="text-gray-400 text-sm text-center py-10">Carregando relatos...</p>}
        {!loading && posts.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-10">Nenhum relato publicado ainda.</p>
        )}

        {/* Carrossel */}
        {!loading && posts.length > 0 && (
          <div className="relative">

            {/* Botão esquerda */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} className="text-[#056881]" />
            </button>

            {/* Trilha do carrossel */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {posts.map((post) => (
                <Link
                  to={`/vozes-noticias/${post.id}`}
                  key={post.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex-shrink-0 w-72"
                >
                  {/* Aspas decorativas */}
                  <span className="text-4xl font-black text-[#056881]/20 leading-none select-none">"</span>

                  {/* Trecho do conteúdo */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1 italic">
                    {post.content}
                  </p>

                  {/* Título */}
                  <p className="text-[#09083D] font-bold text-sm group-hover:text-[#056881] transition-colors line-clamp-1">
                    {post.title || 'Relato da comunidade'}
                  </p>

                  {/* Continuar lendo */}
                  <span className="text-[#056881] text-xs font-semibold group-hover:underline underline-offset-2">
                    continuar lendo &rsaquo;
                  </span>

                  {/* Rodapé */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400 mt-auto">
                    <span>
                      {post.anonymous ? 'Anônima' : (post.author?.name || 'Anônima')}
                      {' · '}
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={13} />
                      {post.comments.length}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Botão direita */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight size={20} className="text-[#056881]" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Relatos