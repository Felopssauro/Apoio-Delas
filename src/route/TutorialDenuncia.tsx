import { useState} from 'react'
import { steps } from '../data/card'
import {CheckCircle, ChevronLeft, ChevronRight, ArrowRight} from 'lucide-react'

const TutorialDenuncia = () => {
    const [active, setActive] = useState(0)
    const current = steps[active]
  return (
    <div>
        <section className='bg-linear-to-r from-[#056881] to-[#A0DCC0] px-6 py-16 text-center '>
            <span className='text-xs font-bold tracking-widest uppercase text-white/70'>
                Guia Prático
            </span>
            <h1 className='text-3xl md:text-5xl font-bold text-white mt-2 leading-tight uppercase'>
                Como fazer uma <span className='text-[#09083D]'>denúncia</span>
            </h1>
            <p className='text-white/80 text-base mt-4 max-w-xl mx-auto leading-relaxed'>
                Um passo a passo claro e seguro para te guiar nesse processo. Você não está sozinha.
            </p>
        </section>

        <section className="px-6 py-12 max-w-5xl mx-auto flex flex-col gap-10">
            {/* Steps nav */}
            <div className='flex items-center justify-center gap-2 flex-wrap'>
                {steps.map((step, i) => (
                    <button key={step.id} onClick={() => setActive(i)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${active === i ? `${step.bg} text-white shadow-md scale-105` : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300'}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs fot-bold ${active === i ? 'bg-white/20' : 'bg-gray-100'} `}>
                            {i < active ? <CheckCircle size={14} /> : step.id}
                        </span>
                    </button>
                ))}
            </div>
            {/* Card principal */}
            <div className='rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className={`${current.bg} px-8 py-6 flex items-center gap-4`}>
                    <div className='bg-white/20 rounded-2xl p-4 text-white'>
                        {current.icon}
                    </div>
                    <span className='text-white/70 text-xs font-bold uppercase tracking-widest'>
                    {current.fase}
                    </span>
                    <h2 className='text-white font-bold text-2xl mt-1'>{current.title}</h2>
                </div>
            </div>

            <div className='px-8 py-8 flex flex-col md:flex-row gap-8'>
                {/* Descrição */}
                <div className=' text-2xl flex-1 flex-col gap-3'>
                    <p className=' text-gray-600 leading-relaxed'>{current.description}</p>
                    <div className='flex flex-col gap-3'>
                        {current.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className={`shrink-0 w-6 h-6 rounded-full ${current.bg} text-white text-xs flex items-center justify-center font-bold mt-0.5`}>
                                    {i + 1}
                                </span>
                                <p className="text-sm text-gray-700 leading-relaxed">{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card lateral */}
                <div className='md:w-64 shrink-0 bg-[#2ecce075] rounded-2xl p-6 flex flex-col gap-3 h-fit'>
                    <span className='text-xs font-bold text-gray-600 uppercase tracking-widest'>Lembre-se</span>
                    <p className='text-sm text-gray-700 leading-relaxed'>
                        Você tem o <strong>direito de denunciar</strong> de forma gratuita e sem advogado. Nenhuma forma de violência é pequena demais para ser relatada.
                    </p>
                    <div className='pt-3 border-t border-gray-500 text-xs text-gray-700'>
                        Ligue <strong className="text-[#056881]">180</strong> — Central da Mulher
                    </div>
                </div>
            </div>

            {/* Navegação */}
            <div className='px-8 pb-8 flex items-center justify-between'>
                <button onClick={() => setActive((p) => Math.max(0, p - 1))} disabled={active === 0} className='flex items-center gap-2 px-5 py-2 rounded-xl bg-[#f1eeee] border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all'>
                    <ChevronLeft size={16}/> Anterior
                </button>

                <span className='text-xs text-gray-400'>{active + 1} de {steps.length}</span>

                <button onClick={() => setActive((p) => Math.min(steps.length - 1, p + 1))} disabled={active === steps.length - 1} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white ${current.bg} hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all`}>
                    Próximo <ChevronRight size={16}/>
                </button>
            </div>
            {/* Contatos úteis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
                { label: 'Central da Mulher', number: '180', desc: 'Denúncias e orientação', color: 'bg-[#056881]' },
                { label: 'Polícia Militar', number: '190', desc: 'Emergências e perigo imediato', color: 'bg-[#FF5F37]' },
                { label: 'SAMU', number: '192', desc: 'Emergências médicas', color: 'bg-[#7b0692]' },
            ].map((c) => (
                <div key={c.number} className={`${c.color} rounded-2xl p-5 text-white flex flex-col gap-1`}>
                <span className="text-3xl font-black">{c.number}</span>
                <span className="font-bold text-sm">{c.label}</span>
                <span className="text-white/70 text-xs">{c.desc}</span>
                </div>
            ))}
            </div>
            {/* Call to Action */}
            <div className="bg-linear-to-r from-[#FF5F37] to-[#FF7552] rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Seus Direitos Estão Garantidos por Lei
                </h2>
                <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                    Você não está sozinha. A Lei Maria da Penha e toda uma rede de proteção estão ao seu lado.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <a href="/preciso-ajuda" className="bg-white text-[#FF5F37] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center">
                    Buscar Ajuda Agora
                        <ArrowRight size={20} />
                    </a>
                    <a href="/mapa" className="bg-[#056881] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#044d63] transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center">
                        Ver Mapa de Serviços
                        <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    </div>
  )
}

export default TutorialDenuncia