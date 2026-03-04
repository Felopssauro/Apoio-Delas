import { useState } from 'react'
import { AlertCircle, Heart, Share2, ArrowRight, Gift, Siren, TriangleAlert } from 'lucide-react'

const CicloViolencia = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)

  const phases = [
    {
      id: 1,
      title: 'Fase 1',
      subtitle: 'Aumento da Tensão',
      color: 'from-[#4A148C] to-[#7B1FA2]',
      bgColor: 'bg-gradient-to-br from-[#4A148C] to-[#7B1FA2]',
      icon: <TriangleAlert />,
      description: 'Nesse primeiro momento, o agressor mostra-se tenso e irritado por coisas insignificantes, chegando a ter acessos de raiva.',
      details: [
        'O agressor humilha a vítima e faz ameaças',
        'Destrói objetos e demonstra ciúmes excessivos',
        'A mulher tenta acalmar o agressor e evita "provocá-lo"',
        'Sentimentos: tristeza, angústia, ansiedade, medo e desilusão',
        'A vítima tende a negar que isso está acontecendo',
        'Muitas vezes acha que fez algo errado ou que "ele teve um dia ruim"',
        'Essa tensão pode durar dias ou até anos'
      ],
      warning: 'A vítima começa a se isolar de amigos e familiares, acreditando que pode controlar a situação.'
    },
    {
      id: 2,
      title: 'Fase 2',
      subtitle: 'Ato de Violência',
      color: 'from-[#C62828] to-[#E53935]',
      bgColor: 'bg-gradient-to-br from-[#C62828] to-[#E53935]',
      icon: <Siren/>,
      description: 'A tensão acumulada explode e se materializa em violência física, psicológica, sexual, moral ou patrimonial.',
      details: [
        'O agressor perde completamente o controle',
        'Ocorrem agressões verbais, físicas, psicológicas ou sexuais',
        'A mulher sente paralisia e impossibilidade de reação',
        'Sintomas: insônia, perda de peso, fadiga constante, ansiedade severa',
        'Sentimentos: medo intenso, ódio, solidão, vergonha, confusão e dor',
        'É quando a vítima pode buscar ajuda, denunciar ou se esconder',
        'Geralmente há um distanciamento temporário do agressor'
      ],
      warning: 'Este é o momento mais perigoso. A vítima reconhece que está sendo agredida e pode tomar decisões importantes.'
    },
    {
      id: 3,
      title: 'Fase 3',
      subtitle: 'Arrependimento (Lua de Mel)',
      color: 'from-[#6A1B9A] to-[#AB47BC]',
      bgColor: 'bg-gradient-to-br from-[#6A1B9A] to-[#AB47BC]',
      icon: <Gift/>,
      description: 'O agressor se mostra arrependido, torna-se amável e promete mudanças para conseguir a reconciliação.',
      details: [
        'O agressor pede perdão e promete que "nunca mais vai acontecer"',
        'Traz presentes, flores e demonstra afeto excessivo',
        'Culpa fatores externos: estresse, álcool, problemas no trabalho',
        'A vítima acredita que ele vai mudar e dá mais uma chance',
        'Surge esperança de que o relacionamento pode melhorar',
        'A mulher se sente responsável por ajudá-lo',
        'Mistura de medo, confusão, culpa e ilusão'
      ],
      warning: 'Esta fase é enganosa. Com o tempo, a tensão sempre volta e o ciclo recomeça, geralmente de forma mais intensa.'
    }
  ]

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ciclo da Violência',
        text: 'Conheça as fases do ciclo da violência e ajude outras mulheres a identificarem situações de abuso.',
        url: window.location.href,
      })
    }
  }

  return (
    <section className="px-4 md:px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#FF5F37]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#FF5F37] font-semibold text-sm uppercase tracking-wide">Educação e Prevenção</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#09083D] mb-4">
            É Preciso Quebrar Esse Ciclo
          </h1>
          <p className="text-base md:text-xl text-[#056881] max-w-3xl mx-auto leading-relaxed">
            E a Lei Maria da Penha está ao lado das mulheres para isso.
          </p>
        </div>

        {/* Contextualização */}
        <div className="bg-white rounded-3xl p-6 md:p-14 shadow-lg mb-16">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Muitas mulheres que enfrentam situações de violência permanecem em silêncio devido a sentimentos como <strong className="text-[#FF5F37]">vergonha, medo e constrangimento</strong>. Enquanto isso, os agressores costumam sustentar a imagem de companheiros exemplares e pais dedicados, o que torna ainda mais difícil que a vítima revele o que está acontecendo.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Por isso, é <strong className="text-[#056881]">inadmissível afirmar que a mulher continua em uma relação abusiva porque gosta de sofrer agressões</strong>. Quando a vítima se cala diante da violência, o agressor deixa de ser responsabilizado por suas atitudes.
          </p>
        </div>

        {/* Círculo Interativo */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">

          {/* Círculo + Labels — sem posicionamento absoluto nos labels no mobile */}
          <div className="w-full max-w-sm">

            {/* Labels acima do círculo — visíveis sempre */}
            <div className="flex justify-between mb-4 px-2">
              {/* Fase 1 — topo centro */}
              <div className="flex-1 flex justify-center">
                <div className="text-center cursor-pointer flex flex-col items-center" onClick={() => setSelectedPhase(1)}>
                  <TriangleAlert className="text-[#4A148C] mb-1" size={20} />
                  <p className="font-bold text-[#4A148C] text-xs">FASE 1</p>
                  <p className="text-xs text-gray-500 hidden sm:block">Aumento da Tensão</p>
                </div>
              </div>
            </div>

            {/* SVG círculo */}
            <div className="relative w-full aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="85" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="100" cy="100" r="85" fill="none" stroke="url(#gradient1)" strokeWidth="24"
                  strokeDasharray="178 356" strokeDashoffset="0"
                  className="cursor-pointer" onClick={() => setSelectedPhase(selectedPhase === 1 ? null : 1)} />
                <circle cx="100" cy="100" r="85" fill="none" stroke="url(#gradient2)" strokeWidth="24"
                  strokeDasharray="178 356" strokeDashoffset="-178"
                  className="cursor-pointer" onClick={() => setSelectedPhase(selectedPhase === 2 ? null : 2)} />
                <circle cx="100" cy="100" r="85" fill="none" stroke="url(#gradient3)" strokeWidth="24"
                  strokeDasharray="178 356" strokeDashoffset="-356"
                  className="cursor-pointer" onClick={() => setSelectedPhase(selectedPhase === 3 ? null : 3)} />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A148C" />
                    <stop offset="100%" stopColor="#7B1FA2" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C62828" />
                    <stop offset="100%" stopColor="#E53935" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6A1B9A" />
                    <stop offset="100%" stopColor="#AB47BC" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white rounded-full w-28 h-28 flex items-center justify-center shadow-xl">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Clique nas</p>
                    <p className="text-sm font-bold text-[#09083D]">FASES</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Labels abaixo do círculo */}
            <div className="flex justify-between mt-4 px-2">
              <div className="text-center cursor-pointer flex flex-col items-center" onClick={() => setSelectedPhase(3)}>
                <Gift className="text-[#6A1B9A] mb-1" size={20} />
                <p className="font-bold text-[#6A1B9A] text-xs">FASE 3</p>
                <p className="text-xs text-gray-500 hidden sm:block">Arrependimento</p>
              </div>
              <div className="text-center cursor-pointer flex flex-col items-center" onClick={() => setSelectedPhase(2)}>
                <Siren className="text-[#C62828] mb-1" size={20} />
                <p className="font-bold text-[#C62828] text-xs">FASE 2</p>
                <p className="text-xs text-gray-500 hidden sm:block">Ato de Violência</p>
              </div>
            </div>
          </div>

          {/* Card de informação */}
          <div className="w-full lg:w-1/2">
            {selectedPhase ? (
              <div className={`${phases[selectedPhase - 1].bgColor} rounded-3xl p-6 md:p-8 text-white shadow-2xl transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{phases[selectedPhase - 1].icon}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{phases[selectedPhase - 1].title}</h3>
                    <p className="text-white/90 text-base md:text-lg">{phases[selectedPhase - 1].subtitle}</p>
                  </div>
                </div>
                <p className="text-base md:text-lg mb-6 leading-relaxed">{phases[selectedPhase - 1].description}</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-4">
                  <h4 className="font-bold text-base md:text-lg mb-3">Características:</h4>
                  <ul className="space-y-2">
                    {phases[selectedPhase - 1].details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight size={16} className="mt-1 shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <div className="flex gap-2">
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{phases[selectedPhase - 1].warning}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-linear-to-r from-[#056881] to-[#A0DCC0] rounded-3xl p-6 md:p-8 text-white shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Entenda o Ciclo</h3>
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  O ciclo da violência foi identificado pela psicóloga Lenore Walker em 1979. Ele se repete constantemente e, <strong>com o tempo, os intervalos entre as fases ficam menores</strong>.
                </p>
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  As agressões passam a acontecer sem obedecer à ordem das fases. Em alguns casos, o ciclo termina com o <strong className="text-[#FF5F37]">feminicídio</strong>, que é o assassinato da vítima.
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
                  <p className="font-semibold text-center text-sm md:text-base">👆 Clique em uma das fases para saber mais</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cards informativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          <div className="bg-linear-to-br from-[#FF5F37] to-[#FF7552] rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <div className="bg-white/20 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Não Se Cale</h3>
            <p className="text-sm md:text-lg leading-relaxed mb-4">
              Quando a vítima se cala, o agressor não enfrenta consequências. Ao mesmo tempo, uma sociedade marcada pelo machismo dificulta que a mulher reconheça que está vivendo um ciclo de violência.
            </p>
            <p className="font-semibold text-base md:text-xl">A culpa NUNCA é da vítima.</p>
          </div>

          <div className="bg-linear-to-br from-[#056881] to-[#5fa8a8] rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <div className="bg-white/20 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
              <Heart size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Saia do Ciclo</h3>
            <p className="text-sm md:text-lg leading-relaxed">
              Com o tempo, a violência se intensifica: as fases se aproximam e deixam de seguir um padrão. Em casos extremos, o ciclo pode resultar em feminicídio, o assassinato da vítima.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#09083D] mb-6">
            Ajude Outras Mulheres
          </h2>
          <p className="text-sm md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Compartilhe este conteúdo para que mais mulheres possam reconhecer as fases do ciclo da violência e buscar ajuda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-[#FF5F37] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg hover:bg-[#e04820] transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <Share2 size={20} />
              Compartilhe Este Ciclo
            </button>
            <a
              href="/preciso-ajuda"
              className="flex items-center justify-center gap-2 bg-[#056881] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg hover:bg-[#044d63] transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Preciso de Ajuda
              <ArrowRight size={20} />
            </a>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col gap-2">
            <p className="text-sm text-gray-600"><strong>Ligue 180</strong> — Central de Atendimento à Mulher</p>
            <p className="text-sm text-gray-600"><strong>Ligue 190</strong> — Polícia Militar (emergência)</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CicloViolencia