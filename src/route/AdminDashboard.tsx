// AdminDashboard.tsx
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, History, Flag, ShieldOff, Ban, CheckCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Story = {
  id: number
  title: string | null
  content: string
  anonymous: boolean
  createdAt: string
  author: { name: string; email: string } | null
}

type Report = {
  id: number
  reason: string
  detail: string | null
  createdAt: string
  status: string
  comment: {
    id: number
    text: string
    author: { id: number; name: string; email: string } | null
    post: { id: number; title: string | null }
  }
  reporter: { name: string; email: string }
}

type HistoryStory = {
  id: number
  title: string | null
  content: string
  anonymous: boolean
  createdAt: string
  author: { name: string; email: string } | null
}

type Tab = 'relatos' | 'denuncias' | 'historico'

const AdminDashboard = () => {
  const { token } = useAuth()
  const [tab, setTab] = useState<Tab>('relatos')
  const [stories, setStories] = useState<Story[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [history, setHistory] = useState<HistoryStory[]>([])
  const [loading, setLoading] = useState(true)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [reportsLoading, setReportsLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 3000)
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/feature/admin/pending-stories', { headers })
        const data = await res.json()
        setStories(Array.isArray(data) ? data : [])
      } catch {
        showFeedback('error', 'Erro ao carregar relatos.')
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [token])

  useEffect(() => {
    if (tab === 'denuncias') {
      setReportsLoading(true)
      fetch('/api/feature/admin/reports', { headers })
        .then((r) => r.json())
        .then((data) => setReports(Array.isArray(data) ? data : []))
        .catch(() => showFeedback('error', 'Erro ao carregar denúncias.'))
        .finally(() => setReportsLoading(false))
    }
    if (tab === 'historico') {
      setHistoryLoading(true)
      fetch('/api/feature/admin/history', { headers })
        .then((r) => r.json())
        .then((data) => setHistory(Array.isArray(data) ? data : []))
        .catch(() => showFeedback('error', 'Erro ao carregar histórico.'))
        .finally(() => setHistoryLoading(false))
    }
  }, [tab, token])

  const reviewStory = async (story: Story, approve: boolean) => {
    try {
      const res = await fetch(`/api/feature/admin/stories/${story.id}`, {
        method: 'PATCH', headers, body: JSON.stringify({ approve }),
      })
      if (!res.ok) throw new Error()
      setStories((prev) => prev.filter((s) => s.id !== story.id))
      showFeedback('success', approve ? 'Relato aprovado!' : 'Relato recusado.')
    } catch {
      showFeedback('error', 'Erro ao processar relato.')
    }
  }

  const resolveReport = async (reportId: number, action: 'suspender' | 'banir' | 'ignorar') => {
    try {
      const res = await fetch(`/api/feature/admin/reports/${reportId}`, {
        method: 'PATCH', headers, body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error()
      setReports((prev) => prev.filter((r) => r.id !== reportId))
      const msgs = { suspender: 'Usuária suspensa.', banir: 'Usuária banida.', ignorar: 'Denúncia ignorada.' }
      showFeedback('success', msgs[action])
    } catch {
      showFeedback('error', 'Erro ao processar denúncia.')
    }
  }

  return (
    <div className='px-4 py-10'>
      <div className='max-w-3xl mx-auto flex flex-col gap-6'>

        {feedback && (
          <div className={`px-4 py-3 rounded-2xl text-sm text-center font-medium ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Abas */}
        <div className='flex bg-[#0d1b4b]/10 rounded-2xl p-1 gap-1'>
          <button
            onClick={() => setTab('relatos')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${tab === 'relatos' ? 'bg-[#0d1b4b] text-white shadow' : 'text-[#0d1b4b]'}`}
          >
            <Clock size={13} /> Relatos ({stories.length})
          </button>
          <button
            onClick={() => setTab('denuncias')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${tab === 'denuncias' ? 'bg-[#0d1b4b] text-white shadow' : 'text-[#0d1b4b]'}`}
          >
            <Flag size={13} /> Denúncias {reports.length > 0 && `(${reports.length})`}
          </button>
          <button
            onClick={() => setTab('historico')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${tab === 'historico' ? 'bg-[#0d1b4b] text-white shadow' : 'text-[#0d1b4b]'}`}
          >
            <History size={13} /> Histórico
          </button>
        </div>

        {/* Relatos pendentes */}
        {tab === 'relatos' && (
          <div className='flex flex-col gap-4'>
            {loading && <p className='text-gray-400 text-sm text-center'>Carregando...</p>}
            {!loading && stories.length === 0 && <p className='text-gray-400 text-sm text-center'>Nenhum relato pendente.</p>}
            {stories.map((s) => (
              <div key={s.id} className='bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm'>
                <div className='flex items-center justify-between flex-wrap gap-2'>
                  <span className='text-xs font-mono text-gray-400'>REL-{String(s.id).padStart(3, '0')}</span>
                  <span className='text-xs text-gray-400'>
                    {s.anonymous ? 'Anônima' : (s.author?.name || s.author?.email || 'Desconhecida')}
                    {' · '}{new Date(s.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                {s.title && <h3 className='font-bold text-[#09083D] text-sm'>{s.title}</h3>}
                <p className='text-sm text-gray-700 leading-relaxed'>{s.content}</p>
                <div className='flex gap-2 justify-end'>
                  <button onClick={() => reviewStory(s, false)} className='flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors'>
                    <XCircle size={14} /> Recusar
                  </button>
                  <button onClick={() => reviewStory(s, true)} className='flex items-center gap-1 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-semibold hover:bg-green-100 transition-colors'>
                    <CheckCircle size={14} /> Aprovar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Denúncias */}
        {tab === 'denuncias' && (
          <div className='flex flex-col gap-4'>
            {reportsLoading && <p className='text-gray-400 text-sm text-center'>Carregando denúncias...</p>}
            {!reportsLoading && reports.length === 0 && (
              <p className='text-gray-400 text-sm text-center'>Nenhuma denúncia pendente.</p>
            )}
            {reports.map((r) => (
              <div key={r.id} className='bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm'>
                {/* Contexto */}
                <div className='flex flex-col gap-1'>
                  <span className='text-xs text-gray-400 font-semibold'>
                    Comentário no relato: <span className='text-[#056881]'>{r.comment.post.title || `#${r.comment.post.id}`}</span>
                  </span>
                  <div className='bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 italic'>
                    "{r.comment.text}"
                  </div>
                  <span className='text-xs text-gray-400'>
                    Autora do comentário: <span className='font-semibold'>{r.comment.author?.name || r.comment.author?.email || 'Anônima'}</span>
                  </span>
                </div>

                {/* Motivo */}
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-semibold'>
                    {r.reason}
                  </span>
                  {r.detail && <span className='text-xs text-gray-500'>— {r.detail}</span>}
                  <span className='text-xs text-gray-400 ml-auto'>
                    Denunciado por: {r.reporter.name || r.reporter.email}
                    {' · '}{new Date(r.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {/* Ações */}
                <div className='flex gap-2 justify-end flex-wrap'>
                  <button
                    onClick={() => resolveReport(r.id, 'ignorar')}
                    className='flex items-center gap-1 px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-semibold hover:bg-gray-100 transition-colors'
                  >
                    <CheckCheck size={14} /> Falso positivo
                  </button>
                  <button
                    onClick={() => resolveReport(r.id, 'suspender')}
                    className='flex items-center gap-1 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-semibold hover:bg-orange-100 transition-colors'
                  >
                    <ShieldOff size={14} /> Suspender usuária
                  </button>
                  <button
                    onClick={() => resolveReport(r.id, 'banir')}
                    className='flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors'
                  >
                    <Ban size={14} /> Banir usuária
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Histórico */}
        {tab === 'historico' && (
          <div className='flex flex-col gap-4'>
            {historyLoading && <p className='text-gray-400 text-sm text-center'>Carregando histórico...</p>}
            {!historyLoading && history.length === 0 && (
              <p className='text-gray-400 text-sm text-center'>Nenhum relato aprovado ainda.</p>
            )}
            {history.map((item) => (
              <div key={item.id} className='bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-2 shadow-sm'>
                <div className='flex items-center justify-between flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs font-mono text-gray-400'>REL-{String(item.id).padStart(3, '0')}</span>
                    <span className='text-xs px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700'>aprovado</span>
                  </div>
                  <span className='text-xs text-gray-400'>
                    {item.anonymous ? 'Anônima' : (item.author?.name || item.author?.email || 'Desconhecida')}
                    {' · '}{new Date(item.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                {item.title && <p className='text-sm font-semibold text-[#09083D]'>{item.title}</p>}
                <p className='text-sm text-gray-600 leading-relaxed line-clamp-2'>{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard