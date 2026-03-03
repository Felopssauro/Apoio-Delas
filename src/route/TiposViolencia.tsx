import { useState } from 'react'
import { Heart, Brain, Shield, Wallet, MessageSquare, AlertCircle, ArrowRight, Phone } from 'lucide-react'

const TiposViolencia = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null)

  const violenceTypes = [
{
  id: 1,
  title: 'Violência Física',
  icon: <Heart size={40} />,
  color: 'from-[#C62828] to-[#E53935]',
  bgColor: 'bg-gradient-to-br from-[#C62828] to-[#E53935]',
  definition: 'É qualquer conduta que ofenda a integridade ou saúde corporal da mulher.',
  examples: [
    'Empurrões, chutes, tapas e socos',
    'Puxões de cabelo e mordidas',
    'Queimaduras, cortes e estrangulamento',
    'Lesões com armas ou objetos',
    'Atirar objetos com intenção de machucar',
    'Apertar, sacudir ou ferir de qualquer forma'
  ],
  warning: 'Nem sempre deixa marcas visíveis, mas TODA agressão física é crime. Não precisa haver lesão aparente para ser considerada violência.',
  law: 'Art. 7º, I - Lei Maria da Penha'
},
{
  id: 2,
  title: 'Violência Psicológica',
  icon: <Brain size={40} />,
  color: 'from-[#6A1B9A] to-[#8E24AA]',
  bgColor: 'bg-gradient-to-br from-[#6A1B9A] to-[#8E24AA]',
  definition: 'Qualquer conduta que cause dano emocional, diminuição da autoestima, que prejudique o desenvolvimento ou que busque controlar ações e decisões.',
  examples: [
    'Ameaças, constrangimento e humilhação',
    'Manipulação afetiva e chantagem emocional',
    'Isolamento de amigos e familiares',
    'Vigilância constante e perseguição',
    'Insultos, ridicularização e desvalorização',
    'Controlar onde vai, com quem fala, o que veste',
    'Violação de intimidade e privacidade'
  ],
  warning: 'A violência psicológica geralmente antecede as agressões físicas e cria um ambiente de medo que dificulta a busca por ajuda.',
  law: 'Art. 7º, II - Lei Maria da Penha | Art. 147-B - Código Penal'
},
{
  id: 3,
  title: 'Violência Sexual',
  icon: <Shield size={40} />,
  color: 'from-[#D84315] to-[#FF5722]',
  bgColor: 'bg-gradient-to-br from-[#D84315] to-[#FF5722]',
  definition: 'Qualquer conduta que force a mulher a presenciar, manter ou participar de relação sexual não desejada, mediante intimidação, ameaça, coação ou uso da força.',
  examples: [
    'Estupro (inclusive entre cônjuges)',
    'Forçar atos sexuais desconfortáveis ou humilhantes',
    'Impedir o uso de métodos contraceptivos',
    'Forçar matrimônio, gravidez ou aborto',
    'Induzir à prostituição ou comercialização sexual',
    'Limitar ou anular direitos sexuais e reprodutivos',
    'Registrar ou divulgar imagens íntimas sem consentimento'
  ],
  warning: 'A violência sexual é invisibilizada por mitos que normalizam o abuso dentro de relações afetivas. Sexo sem consentimento é SEMPRE violência.',
  law: 'Art. 7º, III - Lei Maria da Penha | Art. 213 e 215-A - Código Penal'
},
{
  id: 4,
  title: 'Violência Patrimonial',
  icon: <Wallet size={40} />,
  color: 'from-[#F57C00] to-[#FF9800]',
  bgColor: 'bg-gradient-to-br from-[#F57C00] to-[#FF9800]',
  definition: 'Qualquer conduta que configure retenção, subtração ou destruição de objetos, documentos, bens, valores ou recursos econômicos.',
  examples: [
    'Reter documentos pessoais (RG, CPF, carteira de trabalho)',
    'Destruir ou estragar objetos pessoais e de trabalho',
    'Controlar o dinheiro e impedir acesso a recursos',
    'Reter salário ou benefícios',
    'Contrair dívidas em nome da vítima',
    'Impedir que trabalhe ou estude',
    'Quebrar celular, computador ou móveis',
    'Rasgar roupas e pertences'
  ],
  warning: 'Esse tipo de violência amplia a dependência financeira e dificulta a ruptura do ciclo de abuso.',
  law: 'Art. 7º, IV - Lei Maria da Penha'
},
{
  id: 5,
  title: 'Violência Moral',
  icon: <MessageSquare size={40} />,
  color: 'from-[#1976D2] to-[#2196F3]',
  bgColor: 'bg-gradient-to-br from-[#1976D2] to-[#2196F3]',
  definition: 'Qualquer conduta que configure calúnia, difamação ou injúria.',
  examples: [
    'Calúnia: acusar falsamente de ter cometido um crime',
    'Difamação: falar mal da reputação para outras pessoas',
    'Injúria: xingar e ofender a honra',
    'Espalhar boatos e mentiras',
    'Expor a vida privada sem consentimento',
    'Desmoralizar publicamente ou nas redes sociais',
    'Fazer comentários humilhantes diante de outras pessoas'
  ],
  warning: 'A violência moral muitas vezes caminha junto com a psicológica. O objetivo é desqualificar, humilhar e fragilizar redes de apoio.',
  law: 'Art. 7º, V - Lei Maria da Penha | Arts. 138, 139 e 140 - Código Penal'
}
  ]

  return (
    <section className="px-6 py-16 bg-[#F4F8F7]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#FF5F37]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#FF5F37] font-semibold text-sm uppercase tracking-wide">Lei Maria da Penha</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#09083D] mb-4">
            Tipos de Violência
          </h1>
          <p className="text-xl text-[#056881] max-w-3xl mx-auto leading-relaxed">
            A Lei Maria da Penha estabelece cinco tipos de violência doméstica e familiar contra a mulher
          </p>
        </div>

        {/* Cards de tipos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {violenceTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              className={`${type.bgColor} rounded-3xl p-8 text-white shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mb-6">
                {type.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                {type.definition}
              </p>
              <button className="text-white font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                {selectedType === type.id ? 'Ver menos' : 'Saiba mais'}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Detalhes do tipo selecionado */}
        {selectedType && (
          <div className={`${violenceTypes[selectedType - 1].bgColor} rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-16 animate-fadeIn`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center">
                {violenceTypes[selectedType - 1].icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{violenceTypes[selectedType - 1].title}</h2>
                <p className="text-white/80 text-sm">{violenceTypes[selectedType - 1].law}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Definição Legal:</h3>
              <p className="text-lg leading-relaxed">{violenceTypes[selectedType - 1].definition}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Exemplos de como acontece:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {violenceTypes[selectedType - 1].examples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight size={16} className="mt-1 shrink-0" />
                    <span className="text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
              <div className="flex gap-3">
                <AlertCircle size={24} className="shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Atenção:</h3>
                  <p className="text-sm leading-relaxed">{violenceTypes[selectedType - 1].warning}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerta importante */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-[#FF5F37]/10 rounded-2xl w-16 h-16 flex items-center justify-center shrink-0">
              <AlertCircle size={32} className="text-[#FF5F37]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#09083D] mb-4">
                Importante Saber
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Essas formas de agressão são complexas, perversas, não ocorrem isoladas umas das outras e têm graves consequências para a mulher. Muitas vezes, vários tipos de violência acontecem ao mesmo tempo.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-[#FF5F37]">Qualquer uma delas constitui violação dos direitos humanos e DEVE ser denunciada.</strong>
                </p>
                <p className="leading-relaxed">
                  A violência doméstica pode se apresentar de diferentes formas, e todas configuram violação dos direitos humanos. Não existe "violência menor" ou que deva ser tolerada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Violência digital */}
        <div className="bg-gradient-to-br from-[#4A148C] to-[#7B1FA2] rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6">Violência Digital: Uma Realidade Atual</h2>
          <p className="text-lg leading-relaxed mb-6">
            Com o avanço da tecnologia, surgiu uma nova forma de violência que merece atenção especial:
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Inclui:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-1 shrink-0" />
                <span>Compartilhamento de fotos e vídeos íntimos sem autorização</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-1 shrink-0" />
                <span>Perseguição, ameaças e assédio online</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-1 shrink-0" />
                <span>Criação de perfis falsos para difamar</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-1 shrink-0" />
                <span>Controle e monitoramento de redes sociais e celular</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-1 shrink-0" />
                <span>Exposição de dados pessoais e informações privadas</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
            <p className="text-sm font-semibold">
              💡 A violência digital pode ser enquadrada como violência psicológica, moral ou sexual, dependendo do caso.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#056881] to-[#5fa8a8] rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Reconheceu Algum Tipo de Violência?
          </h2>
          <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            Você não está sozinha. Existem recursos e pessoas prontas para ajudar você a sair dessa situação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/preciso-ajuda"
              className="bg-[#FF5F37] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e04820] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Buscar Ajuda Agora
              <ArrowRight size={20} />
            </a>
            <a
              href="/ciclo-violencia"
              className="bg-white text-[#056881] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-md"
            >
              Entender o Ciclo da Violência
            </a>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Phone size={24} />
              <h3 className="text-xl font-bold">Emergência</h3>
            </div>
            <p className="text-lg mb-2">
              <strong>Ligue 180</strong> - Central de Atendimento à Mulher
            </p>
            <p className="text-sm">
              Funciona 24 horas, todos os dias. Ligação gratuita de qualquer telefone.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TiposViolencia
