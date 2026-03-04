import { Scale, Book, Shield, Heart, ArrowRight, ExternalLink } from 'lucide-react'

const LeiMariaDaPenha = () => {
  
  const sections = [
    {
      icon: <Book size={32} />,
      title: 'O que é a Lei Maria da Penha?',
      content: [
        'A Lei nº 11.340/2006, conhecida como Lei Maria da Penha, é uma legislação brasileira que cria mecanismos para coibir e prevenir a violência doméstica e familiar contra a mulher.',
        'Considerada pela ONU uma das três melhores legislações do mundo no enfrentamento à violência contra mulheres, a lei representa uma mudança de paradigma fundamental na sociedade brasileira.'
      ]
    },
    {
      icon: <Heart size={32} />,
      title: 'Por que "Maria da Penha"?',
      content: [
        'A lei leva o nome de Maria da Penha Maia Fernandes, farmacêutica que foi vítima de duas tentativas de homicídio pelo próprio marido em 1983.',
        'Na primeira tentativa, levou um tiro que a deixou paraplégica. Na segunda, o agressor tentou eletrocutá-la no banho.',
        'Foram necessários 19 anos e 6 meses para que o agressor fosse preso. O caso chegou à Comissão Interamericana de Direitos Humanos da OEA, que condenou o Brasil por negligência.',
        'Em homenagem à sua luta e coragem, a lei sancionada em 7 de agosto de 2006 recebeu seu nome.'
      ]
    }
  ]

  const innovations = [
    {
      title: 'Define Violência Doméstica',
      description: 'Estabelece claramente o que é violência doméstica e familiar e seus 5 tipos'
    },
    {
      title: 'Medidas Protetivas de Urgência',
      description: 'Cria mecanismos ágeis de proteção que podem ser concedidos em até 48 horas'
    },
    {
      title: 'Juizados Especializados',
      description: 'Prevê a criação de Juizados de Violência Doméstica e Familiar contra a Mulher'
    },
    {
      title: 'Rede de Atendimento',
      description: 'Articula polícia, justiça, saúde e assistência social para atendimento integral'
    },
    {
      title: 'Prisão Preventiva',
      description: 'Permite a prisão preventiva do agressor quando há risco à vítima'
    },
    {
      title: 'Proibição de Penas Alternativas',
      description: 'Proíbe penas de cesta básica e impõe punições mais rigorosas'
    }
  ]

  return (
    <section className="px-6 py-16 bg-[#F4F8F7]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#FF5F37]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#FF5F37] font-semibold text-sm uppercase tracking-wide">Lei nº 11.340/2006</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#09083D] mb-4">
            Lei Maria da Penha
          </h1>
          <p className="text-xl text-[#056881] max-w-3xl mx-auto leading-relaxed">
            Uma das três melhores legislações do mundo no combate à violência contra mulheres
          </p>
        </div>

        {/* Seções informativas */}
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#056881] text-white rounded-2xl w-16 h-16 flex items-center justify-center shrink-0">
                {section.icon}
              </div>
              <h2 className="text-3xl font-bold text-[#09083D]">{section.title}</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-lg leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Principais inovações */}
        <div className="bg-linear-to-br from-[#056881] to-[#5fa8a8] rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Principais Inovações da Lei</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovations.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/90 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* O que a lei garante */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-[#09083D] mb-8 text-center">
            O Que a Lei Garante?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#056881] mb-4">Para a Vítima:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Shield size={20} className="text-[#056881] mt-1 shrink-0" />
                  <span>Proteção imediata através de medidas protetivas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield size={20} className="text-[#056881] mt-1 shrink-0" />
                  <span>Atendimento humanizado e especializado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield size={20} className="text-[#056881] mt-1 shrink-0" />
                  <span>Assistência psicológica, social e jurídica gratuita</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield size={20} className="text-[#056881] mt-1 shrink-0" />
                  <span>Afastamento do agressor do lar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield size={20} className="text-[#056881] mt-1 shrink-0" />
                  <span>Inclusão em programas assistenciais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield size={20} className="text-[#056881] mt-1 shrink-0" />
                  <span>Manutenção do vínculo empregatício por até 6 meses</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#FF5F37] mb-4">Para o Agressor:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Scale size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span>Prisão preventiva quando há risco à vítima</span>
                </li>
                <li className="flex items-start gap-2">
                  <Scale size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span>Proibição de se aproximar da vítima e familiares</span>
                </li>
                <li className="flex items-start gap-2">
                  <Scale size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span>Suspensão do porte de armas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Scale size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span>Comparecimento obrigatório a programas de recuperação</span>
                </li>
                <li className="flex items-start gap-2">
                  <Scale size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span>Penas mais severas (de 3 meses a 3 anos de prisão)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Scale size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span>Crime de descumprimento de medida protetiva</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Abrangência */}
        <div className="bg-linear-to-br from-[#056881] to-[#5fa8a8] rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6">A Quem a Lei se Aplica?</h2>
          <div className="space-y-6 text-lg">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-bold mb-3">A lei protege mulheres em situações de:</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Relacionamento conjugal (casamento ou união estável)</li>
                <li>• Relacionamento íntimo de afeto (namoro, incluindo quando terminado)</li>
                <li>• Convivência familiar (pais, irmãos, filhos)</li>
                <li>• Ambiente doméstico (mesmo sem vínculo familiar ou afetivo)</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-bold mb-3">Importante:</h3>
              <ul className="space-y-2 text-white/90">
                <li>• A lei se aplica independentemente da orientação sexual</li>
                <li>• Não é necessário morar junto para a lei ser aplicada</li>
                <li>• Aplica-se também a mulheres trans (decisão de tribunais)</li>
                <li>• A violência pode ter ocorrido uma única vez ou ser recorrente</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Links úteis */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-[#09083D] mb-8 text-center">
            Leia a Lei Completa
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#056881] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#044d63] transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
            >
              Lei 11.340/2006 - Texto Oficial
              <ExternalLink size={20} />
            </a>
            <a
              href="https://www.institutomariadapenha.org.br/lei-11340/lei-maria-da-penha-na-integra-e-comentada.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5F37] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e04820] transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
            >
              Lei Comentada
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-linear-to-r from-[#056881] to-[#5fa8a8] rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            A Lei Está do Seu Lado
          </h2>
          <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            Conheça seus direitos e saiba como a Lei Maria da Penha pode proteger você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/seus-direitos"
              className="bg-white text-[#056881] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-md flex items-center gap-2 justify-center"
            >
              Conheça Seus Direitos
              <ArrowRight size={20} />
            </a>
            <a
              href="/preciso-ajuda"
              className="bg-[#FF5F37] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e04820] transition-all shadow-md flex items-center gap-2 justify-center"
            >
              Buscar Ajuda
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default LeiMariaDaPenha
