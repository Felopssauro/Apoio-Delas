import { useState, useEffect } from 'react'
import { ArrowLeft, Send, Lock, Loader2, Flag, ChevronDown, ChevronUp, CornerDownRight } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type CommentData = {
  id: number
  text: string
  anonymous: boolean
  createdAt: string
  author: { id: number; name: string } | null
  replies: CommentData[]
  reports: { id: number }[]
}

type PostData = {
  id: number
  title: string | null
  content: string
  anonymous: boolean
  createdAt: string
  author: { name: string } | null
  comments: CommentData[]
}

const REPORT_REASONS = ['Ofensivo', 'Assédio', 'Spam', 'Informação falsa', 'Outro']

// Componente de um comentário (recursivo para replies)
const CommentItem = ({
  comment,
  postId,
  token,
  isAuthenticated,
  onNewReply,
}: {
  comment: CommentData
  postId: string
  token: string | null
  isAuthenticated: boolean
  onNewReply: (parentId: number, reply: CommentData) => void
}) => {
  const [showReply, setShowReply] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [replyText, setReplyText] = useState('')
  const [replyAnon, setReplyAnon] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportDetail, setReportDetail] = useState('')
  const [reportFeedback, setReportFeedback] = useState<string | null>(null)

  const handleReply = async () => {
    if (!replyText.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/feature/stories/${postId}/comment/${comment.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: replyText.trim(), anonymous: replyAnon }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      onNewReply(comment.id, data)
      setReplyText('')
      setReplyAnon(false)
      setShowReply(false)
    } catch {
      // silencioso
    } finally {
      setSubmitting(false)
    }
  }

  const handleReport = async () => {
    if (!reportReason) return
    try {
      const res = await fetch(`/api/feature/comments/${comment.id}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason: reportReason, detail: reportDetail }),
      })
      const data = await res.json()
      setReportFeedback(data.message || 'Denúncia enviada. Obrigada!')
      setTimeout(() => { setReportFeedback(null); setReportOpen(false); setReportReason(''); setReportDetail('') }, 3000)
    } catch {
      setReportFeedback('Erro ao enviar denúncia.')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
        <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-gray-400">
            {comment.anonymous ? 'Anônima' : (comment.author?.name || 'Anônima')}
            {' · '}
            {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
          </span>
          <div className="flex items-center gap-2">
            {/* Replies toggle */}
            {comment.replies?.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#056881] transition-colors"
              >
                {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {comment.replies.length} {comment.replies.length === 1 ? 'resposta' : 'respostas'}
              </button>
            )}
            {/* Responder */}
            {isAuthenticated && (
              <button
                onClick={() => setShowReply(!showReply)}
                className="flex items-center gap-1 text-xs text-[#056881] hover:text-[#044f61] font-semibold transition-colors"
              >
                <CornerDownRight size={13} /> Responder
              </button>
            )}
            {/* Denunciar */}
            {isAuthenticated && (
              <button
                onClick={() => setReportOpen(!reportOpen)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                <Flag size={13} /> Denunciar
              </button>
            )}
          </div>
        </div>

        {/* Formulário de denúncia */}
        {reportOpen && (
          <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3">
            {reportFeedback ? (
              <p className="text-xs text-green-600 font-medium">{reportFeedback}</p>
            ) : (
              <>
                <p className="text-xs font-semibold text-gray-600">Motivo da denúncia:</p>
                <div className="flex flex-wrap gap-2">
                  {REPORT_REASONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setReportReason(r)}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${reportReason === r ? 'bg-red-500 text-white border-red-500' : 'border-gray-200 text-gray-500 hover:border-red-300'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {reportReason === 'Outro' && (
                  <input
                    type="text"
                    placeholder="Descreva o motivo..."
                    value={reportDetail}
                    onChange={(e) => setReportDetail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                )}
                <div className="flex justify-end gap-2">
                  <button onClick={() => setReportOpen(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancelar</button>
                  <button
                    onClick={handleReport}
                    disabled={!reportReason}
                    className="text-xs bg-red-500 text-white px-4 py-1.5 rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
                  >
                    Enviar denúncia
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Formulário de reply */}
        {showReply && (
          <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3">
            <textarea
              placeholder="Escreva sua resposta..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#056881]"
            />
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setReplyAnon(!replyAnon)}
                  className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${replyAnon ? 'bg-[#056881]' : 'bg-gray-300'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${replyAnon ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-xs text-gray-500">Anônima</span>
              </label>
              <div className="flex gap-2">
                <button onClick={() => setShowReply(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancelar</button>
                <button
                  onClick={handleReply}
                  disabled={submitting || !replyText.trim()}
                  className="flex items-center gap-1 text-xs bg-[#056881] text-white px-4 py-1.5 rounded-xl font-semibold hover:bg-[#044f61] disabled:opacity-50 transition-colors"
                >
                  {submitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                  Responder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Replies aninhadas */}
      {showReplies && comment.replies?.length > 0 && (
        <div className="ml-6 flex flex-col gap-2 border-l-2 border-[#c5e7f0] pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              token={token}
              isAuthenticated={isAuthenticated}
              onNewReply={onNewReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────

const Post = () => {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated, token } = useAuth()

  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [newComment, setNewComment] = useState('')
  const [commentAnon, setCommentAnon] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [commentFeedback, setCommentFeedback] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/feature/stories/${id}`)
        if (!res.ok) { setNotFound(true); return }
        const data = await res.json()
        setPost(data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/feature/stories/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: newComment.trim(), anonymous: commentAnon }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPost((prev) => prev ? { ...prev, comments: [...prev.comments, { ...data, replies: [] }] } : prev)
      setNewComment('')
      setCommentAnon(false)
      setCommentFeedback('Comentário publicado!')
      setTimeout(() => setCommentFeedback(null), 3000)
    } catch {
      setCommentFeedback('Erro ao publicar comentário.')
      setTimeout(() => setCommentFeedback(null), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  // Adiciona reply ao estado local sem reload
  const handleNewReply = (parentId: number, reply: CommentData) => {
    setPost((prev) => {
      if (!prev) return prev
      const addReply = (comments: CommentData[]): CommentData[] =>
        comments.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...(c.replies || []), { ...reply, replies: [] }] }
            : { ...c, replies: addReply(c.replies || []) }
        )
      return { ...prev, comments: addReply(prev.comments) }
    })
  }

  if (loading) return (
    <section className='flex items-center justify-center py-24'>
      <Loader2 size={32} className='text-[#056881] animate-spin' />
    </section>
  )

  if (notFound || !post) return (
    <section className='flex flex-col items-center justify-center py-24 gap-4'>
      <p className="text-gray-500">Relato não encontrado.</p>
      <Link to="/vozes-noticias" className="text-[#056881] text-sm font-medium hover:underline">
        Voltar para Vozes e Notícias
      </Link>
    </section>
  )

  return (
    <section className='px-6 py-16'>
      <div className='max-w-2xl mx-auto flex flex-col gap-8'>

        <Link to="/vozes-noticias" className="flex items-center gap-2 text-[#056881] text-sm font-medium hover:text-[#FF5F37] transition-colors w-fit">
          <ArrowLeft size={16} />
          Voltar para Vozes e Notícias
        </Link>

        {/* Post */}
        <div className='bg-[#5fa8a8] rounded-2xl p-8 flex flex-col gap-4'>
          <h1 className='text-white font-bold text-2xl leading-snug'>
            {post.title || 'Relato da comunidade'}
          </h1>
          <p className='text-white/90 text-sm leading-relaxed'>{post.content}</p>
          <div className='pt-3 border-t border-white/20 text-xs text-white/70 flex items-center justify-between'>
            <span>
              {post.anonymous ? 'Anônima' : (post.author?.name || 'Anônima')}
              {' · '}
              {new Date(post.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <span>{post.comments.length} comentários</span>
          </div>
        </div>

        {/* Comentários */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-bold text-[#09083D]'>Comentários</h2>
          {post.comments.length === 0 && (
            <p className="text-gray-400 text-sm">Nenhum comentário ainda. Seja a primeira!</p>
          )}
          {post.comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              postId={id!}
              token={token}
              isAuthenticated={isAuthenticated}
              onNewReply={handleNewReply}
            />
          ))}
        </div>

        {/* Formulário novo comentário */}
        {isAuthenticated ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#09083D]">Deixe um comentário</h3>

            {commentFeedback && (
              <div className={`text-sm px-4 py-3 rounded-xl text-center ${commentFeedback.startsWith('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {commentFeedback}
              </div>
            )}

            <textarea
              placeholder="Escreva seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#056881] transition"
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setCommentAnon(!commentAnon)}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-1 ${commentAnon ? 'bg-[#056881]' : 'bg-gray-300'}`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full shadow transition-transform duration-200 ${commentAnon ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-sm text-gray-600">
                  {commentAnon ? 'Comentando como Anônima' : 'Comentando com seu nome'}
                </span>
              </label>

              <button
                onClick={handleAddComment}
                disabled={submitting || !newComment.trim()}
                className="flex items-center gap-2 bg-[#FF5F37] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#e04820] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Publicar
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-3 text-center">
            <Lock size={24} className="text-gray-400" />
            <p className="text-sm font-semibold text-gray-600">Apenas usuárias logadas podem comentar.</p>
            <Link
              to="/login-user"
              className="bg-[#056881] text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-[#044f61] transition-colors"
            >
              Entrar ou criar conta
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Post