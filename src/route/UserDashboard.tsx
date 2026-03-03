import { Plus, Edit2, MessageCircle, Trash2, X, Send, Loader2, CornerDownRight } from 'lucide-react'
import { statusColor, type Status } from '../data/card'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

type CommentItem = {
  id: number
  text: string
  anonymous: boolean
  createdAt: string
  author: { id: number; name: string } | null
  replies: CommentItem[]
}

type Relato = {
  id: string
  codigo: string
  titulo: string
  texto: string
  date: string
  status: string
  anonymous: boolean
  comments: CommentItem[]
}

type Modal =
  | { type: 'create' }
  | { type: 'edit'; relato: Relato }
  | { type: 'comments'; relato: Relato }
  | { type: 'delete'; relato: Relato }

const UserDashboard = () => {
  const { token } = useAuth()
  const [relatos, setRelatos] = useState<Relato[]>([])
  const [modal, setModal] = useState<Modal | null>(null)
  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // Reply state no modal de comentários
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replyAnon, setReplyAnon] = useState(false)
  const [replySubmitting, setReplySubmitting] = useState(false)

  const closeModal = () => {
    setModal(null)
    setTitulo('')
    setTexto('')
    setAnonymous(false)
    setReplyingTo(null)
    setReplyText('')
  }

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 3500)
  }

  useEffect(() => {
    const fetchRelatos = async () => {
      try {
        const res = await fetch('/api/feature/my-stories', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error()
        const mapped: Relato[] = data.map((p: any) => ({
          id: String(p.id),
          codigo: `REL-${String(p.id).padStart(3, '0')}`,
          titulo: p.title ?? '',
          texto: p.content ?? '',
          date: new Date(p.createdAt ?? Date.now()).toLocaleDateString('pt-BR'),
          status: p.published ? 'Aprovado' : 'Pendente',
          anonymous: p.anonymous ?? false,
          comments: mapComments(p.comments ?? []),
        }))
        setRelatos(mapped)
      } catch {
        showFeedback('error', 'Erro ao carregar seus relatos.')
      } finally {
        setLoading(false)
      }
    }
    fetchRelatos()
  }, [token])

  const mapComments = (raw: any[]): CommentItem[] =>
    raw.map((c: any) => ({
      id: c.id,
      text: c.text,
      anonymous: c.anonymous ?? false,
      createdAt: c.createdAt,
      author: c.author ?? null,
      replies: mapComments(c.replies ?? []),
    }))

  const handleCreate = async () => {
    if (!titulo.trim() || !texto.trim()) return
    try {
      const res = await fetch('/api/feature/send-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: titulo.trim(), story: texto.trim(), anonymous }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erro ao enviar relato.')
      const novo: Relato = {
        id: String(data.post.id),
        codigo: `REL-${String(data.post.id).padStart(3, '0')}`,
        titulo: data.post.title ?? titulo.trim(),
        texto: data.post.content,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'Pendente',
        anonymous,
        comments: [],
      }
      setRelatos((prev) => [novo, ...prev])
      showFeedback('success', 'Relato enviado! Aguarde a aprovação.')
      closeModal()
    } catch (err: any) {
      showFeedback('error', err.message)
    }
  }

  const handleEdit = async (relato: Relato) => {
    if (!titulo.trim() || !texto.trim()) return
    try {
      const res = await fetch(`/api/feature/my-stories/${relato.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: titulo.trim(), content: texto.trim() }),
      })
      if (!res.ok) throw new Error('Erro ao editar relato.')
      setRelatos((prev) =>
        prev.map((r) =>
          r.id === relato.id ? { ...r, titulo: titulo.trim(), texto: texto.trim(), status: 'Pendente' } : r
        )
      )
      showFeedback('success', 'Relato atualizado! Aguarde nova aprovação.')
      closeModal()
    } catch (err: any) {
      showFeedback('error', err.message)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/feature/my-stories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      setRelatos((prev) => prev.filter((r) => r.id !== id))
      showFeedback('success', 'Relato excluído.')
      closeModal()
    } catch {
      showFeedback('error', 'Erro ao excluir relato.')
      closeModal()
    }
  }

  const handleReply = async (postId: string, parentId: number) => {
    if (!replyText.trim()) return
    setReplySubmitting(true)
    try {
      const res = await fetch(`/api/feature/stories/${postId}/comment/${parentId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: replyText.trim(), anonymous: replyAnon }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()

      // Adiciona reply ao estado local
      setRelatos((prev) =>
        prev.map((r) => {
          if (r.id !== postId) return r
          const addReply = (comments: CommentItem[]): CommentItem[] =>
            comments.map((c) =>
              c.id === parentId
                ? { ...c, replies: [...c.replies, { ...data, replies: [] }] }
                : { ...c, replies: addReply(c.replies) }
            )
          return { ...r, comments: addReply(r.comments) }
        })
      )
      // Atualiza o relato no modal
      if (modal?.type === 'comments') {
        setModal((prev) => {
          if (!prev || prev.type !== 'comments') return prev
          const addReply = (comments: CommentItem[]): CommentItem[] =>
            comments.map((c) =>
              c.id === parentId
                ? { ...c, replies: [...c.replies, { ...data, replies: [] }] }
                : { ...c, replies: addReply(c.replies) }
            )
          return { ...prev, relato: { ...prev.relato, comments: addReply(prev.relato.comments) } }
        })
      }
      setReplyText('')
      setReplyAnon(false)
      setReplyingTo(null)
    } catch {
      showFeedback('error', 'Erro ao responder comentário.')
    } finally {
      setReplySubmitting(false)
    }
  }

  const renderComments = (comments: CommentItem[], postId: string, depth = 0) =>
    comments.map((c) => (
      <div key={c.id} className={depth > 0 ? 'ml-4 border-l-2 border-[#c5e7f0] pl-3' : ''}>
        <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1 mb-2">
          <p className="text-sm text-gray-700">{c.text}</p>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="text-xs text-gray-400">
              {c.anonymous ? 'Anônima' : (c.author?.name || 'Anônima')}
              {' · '}{new Date(c.createdAt).toLocaleDateString('pt-BR')}
            </span>
            {depth === 0 && (
              <button
                onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                className="flex items-center gap-1 text-xs text-[#056881] hover:text-[#044f61] font-semibold"
              >
                <CornerDownRight size={12} /> Responder
              </button>
            )}
          </div>

          {/* Formulário de reply */}
          {replyingTo === c.id && (
            <div className="mt-2 flex flex-col gap-2 border-t border-gray-200 pt-2">
              <textarea
                placeholder="Escreva sua resposta..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#056881]"
              />
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-500 select-none">
                  <div
                    onClick={() => setReplyAnon(!replyAnon)}
                    className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${replyAnon ? 'bg-[#056881]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${replyAnon ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  Anônima
                </label>
                <div className="flex gap-2">
                  <button onClick={() => { setReplyingTo(null); setReplyText('') }} className="text-xs text-gray-400">Cancelar</button>
                  <button
                    onClick={() => handleReply(postId, c.id)}
                    disabled={replySubmitting || !replyText.trim()}
                    className="flex items-center gap-1 text-xs bg-[#056881] text-white px-3 py-1.5 rounded-xl font-semibold disabled:opacity-50"
                  >
                    {replySubmitting ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />}
                    Responder
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {c.replies?.length > 0 && renderComments(c.replies, postId, depth + 1)}
      </div>
    ))

  return (
    <div className='px-4 py-10'>
      <div className='max-w-3xl mx-auto flex flex-col gap-6'>

        {feedback && (
          <div className={`px-4 py-3 rounded-2xl text-sm text-center font-medium ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {feedback.msg}
          </div>
        )}

        <button
          onClick={() => { setModal({ type: 'create' }); setTitulo(''); setTexto(''); setAnonymous(false) }}
          className='self-start flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm'
        >
          <Plus size={18} /> Novo Relato
        </button>

        <div className='bg-[#c5e7f04b] rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4'>
          <h2 className='text-lg font-bold text-[#09083D]'>Meus Relatos</h2>

          {loading && <p className="text-gray-400 text-sm">Carregando...</p>}
          {!loading && relatos.length === 0 && <p className="text-gray-400 text-sm">Nenhum relato ainda.</p>}

          {relatos.map((relato) => (
            <div key={relato.id} className="border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm bg-white">
              <div className='flex items-center justify-between flex-wrap gap-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-sm font-bold text-gray-500'>#{relato.codigo}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor[relato.status as Status]}`}>
                    {relato.status}
                  </span>
                </div>
                <span className='text-xs text-gray-400 bg-[#e0f4f7] px-3 py-1 rounded-full'>{relato.date}</span>
              </div>

              {relato.titulo && <h3 className="text-base font-bold text-[#09083D]">{relato.titulo}</h3>}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{relato.texto}</p>
              <p className="text-xs text-gray-400">
                Publicado como: <span className="font-semibold">{relato.anonymous ? 'Anônima' : 'Seu nome de usuário'}</span>
              </p>
              {relato.status === 'Pendente' && (
                <p className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg w-fit">
                  Aguardando aprovação do administrador
                </p>
              )}

              <div className='flex gap-2 justify-end flex-wrap'>
                <button
                  onClick={() => { setModal({ type: 'edit', relato }); setTitulo(relato.titulo); setTexto(relato.texto) }}
                  className="flex items-center gap-1 px-4 py-2 bg-[#d4eef5] text-[#056881] rounded-xl text-xs font-semibold hover:bg-[#b8e3ee] transition-colors"
                >
                  <Edit2 size={14} /> Editar
                </button>
                <button
                  onClick={() => setModal({ type: 'comments', relato })}
                  className="flex items-center gap-1 px-4 py-2 bg-[#e8f5e9] text-green-700 rounded-xl text-xs font-semibold hover:bg-[#c8e6c9] transition-colors"
                >
                  <MessageCircle size={14} /> Comentários ({relato.comments.length})
                </button>
                <button
                  onClick={() => setModal({ type: 'delete', relato })}
                  className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAIS */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          {(modal.type === 'create' || modal.type === 'edit') && (
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#09083D]">{modal.type === 'create' ? 'Novo Relato' : 'Editar Relato'}</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              {modal.type === 'edit' && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-xl">
                  Ao editar, seu relato voltará para análise e ficará fora do ar até ser aprovado novamente.
                </div>
              )}
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título do relato..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#056881]"
              />
              <textarea
                rows={6}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva seu relato..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#056881]"
              />
              {modal.type === 'create' && (
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setAnonymous(!anonymous)}
                    className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-1 ${anonymous ? 'bg-[#056881]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-3.5 h-3.5 bg-white rounded-full shadow transition-transform duration-200 ${anonymous ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#09083D]">Publicar como Anônima</span>
                    <span className="text-xs text-gray-400">
                      {anonymous ? 'Seu apelido não será exibido.' : 'Seu apelido aparecerá no relato.'}
                    </span>
                  </div>
                </label>
              )}
              <div className="flex justify-end gap-2">
                <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancelar</button>
                <button
                  onClick={() => modal.type === 'create' ? handleCreate() : handleEdit(modal.relato)}
                  disabled={!titulo.trim() || !texto.trim()}
                  className="px-6 py-2 bg-[#056881] text-white rounded-xl text-sm font-semibold hover:bg-[#044f61] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modal.type === 'create' ? 'Publicar' : 'Salvar e aguardar aprovação'}
                </button>
              </div>
            </div>
          )}

          {/* Comentários */}
          {modal.type === 'comments' && (
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4 shadow-xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#09083D]">
                  Comentários — {modal.relato.titulo || modal.relato.codigo}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>

              {modal.relato.status !== 'Aprovado' && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-xl">
                  Seu relato ainda está pendente — os comentários aparecerão após a aprovação.
                </div>
              )}

              {modal.relato.comments.length === 0
                ? <p className="text-gray-400 text-sm">Nenhum comentário ainda.</p>
                : renderComments(modal.relato.comments, modal.relato.id)
              }
            </div>
          )}

          {modal.type === 'delete' && (
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl text-center">
              <div className="flex justify-end">
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <Trash2 size={40} className="text-red-400 mx-auto" />
              <h3 className="font-bold text-[#09083D]">Excluir relato?</h3>
              <p className="text-sm text-gray-500">Esta ação não pode ser desfeita. O relato será removido do fórum.</p>
              <div className="flex gap-2 justify-center">
                <button onClick={closeModal} className="px-5 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50">Cancelar</button>
                <button
                  onClick={() => handleDelete(modal.relato.id)}
                  className="px-5 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserDashboard