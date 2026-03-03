// Forum.tsx
import { Link, useNavigate } from "react-router-dom"
import { MessageCircle, Plus } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"

type PostBD = {
  id: number
  title: string | null
  content: string
  anonymous: boolean
  createdAt: string
  author: { name: string } | null
  comments: { id: number }[]
}

const Forum = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostBD[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/feature/stories')
        const data = await res.json()
        setPosts(Array.isArray(data) ? data : [])
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

  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase">Comunidade</span>
            <h2 className="text-3xl font-bold text-[#09083d] mt-1">Vozes e Noticias</h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              to={`/vozes-noticias/${post.id}`}
              key={post.id}
              className="bg-[#5fa8a8] rounded-2xl p-6 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Título em destaque */}
              <h3 className="text-white font-bold text-lg leading-snug group-hover:underline underline-offset-2 line-clamp-2">
                {post.title || 'Relato da comunidade'}
              </h3>

              {/* Trecho do conteúdo */}
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                {post.content}
              </p>

              <div className="flex items-center justify-between pt-3 border-white/20 border-t text-xs text-white/70 mt-auto">
                <span>
                  {post.anonymous ? 'Anônima' : (post.author?.name || 'Anônima')}
                  {' · '}
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {post.comments.length}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Forum