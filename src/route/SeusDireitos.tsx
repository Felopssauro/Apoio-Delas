import { Shield, FileText, Home, Heart, Phone, ArrowRight, AlertCircle, Clock } from 'lucide-react'

const SeusDireitos = () => {
  
  const medidasProtetivas = [
    {
      icon: <Home size={24} />,
      title: 'Afastamento do Agressor',
      description: 'O juiz pode determinar que o agressor saia imediatamente da casa e não volte'
    },
    {
      icon: <Shield size={24} />,
      title: 'Proibição de Aproximação',
      description: 'Distância mínima que o agressor deve manter de você, seus familiares e local de trabalho'
    },
    {
      icon: <Phone size={24} />,
      title: 'Proibição de Contato',
      description: 'O agressor fica proibido de entrar em contato por qualquer meio (telefone, redes sociais, mensagens)'
    },
    {
      icon: <Shield size={24} />,
      title: 'Suspensão de Porte de Armas',
      description: 'Se o agressor possui arma de fogo, ela será apreendida imediatamente'
    },
    {
      icon: <FileText size={24} />,
      title: 'Restrição de Visitas',
      description: 'Pode haver restrições ou acompanhamento nas visitas aos filhos'
    },
    {
      icon: <Heart size={24} />,
      title: 'Prestação de Alimentos',
      description: 'O juiz pode determinar o pagamento de pensão alimentícia provisória'
    }
  ]

  const direitosVitima = [
    {
      categoria: 'Atendimento e Proteção',
      direitos: [
        'Atendimento humanizado e especializado pela polícia e justiça',
        'Proteção policial quando houver risco à sua integridade',
        'Inclusão em programas assistenciais do governo',
        'Encaminhamento a casa-abrigo ou local seguro para você e seus filhos',
        'Acompanhamento por equipe multidisciplinar (assistente social, psicólogo)',
        'Transporte seguro para você e seus dependentes quando necessário'
      ]
    },
    {
      categoria: 'Assistência Jurídica e Apoio',
      direitos: [
        'Assistência judiciária gratuita (Defensoria Pública)',
        'Informações sobre o andamento do processo judicial',
        'Ser notificada sobre prisão ou soltura do agressor',
        'Ser ouvida pela autoridade policial e judicial',
        'Ter um advogado ou defensor público gratuito',
        'Receber cópia do boletim de ocorrência e processos'
      ]
    },
    {
      categoria: 'Trabalho e Saúde',
      direitos: [
        'Manter o emprego por até 6 meses quando necessário se afastar',
        'Mudar de local de trabalho (transferência) quando houver risco',
        'Atendimento de saúde prioritário no SUS',
        'Acompanhamento psicológico gratuito',
        'Prioridade na matrícula dos filhos em creche próxima',
        'Benefícios assistenciais conforme necessidade'
      ]
    },
    {
      categoria: 'Patrimônio e Bens',
      direitos: [
        'Retorno ao lar sem perder direitos sobre os bens',
        'Medidas para impedir que o agressor venda ou destrua bens',
        'Uso exclusivo de bens essenciais (carro, casa)',
        'Ressarcimento de danos materiais causados pelo agressor',
        'Suspensão de procurações outorgadas ao agressor',
        'Prestação de caução provisória por perdas e danos'
      ]
    }
  ]

  const comoSolicitar = [
    {
      passo: '1',
      titulo: 'Registre a Ocorrência',
      descricao: 'Procure uma delegacia (preferencialmente Delegacia da Mulher). Não é necessário ter advogado.'
    },
    {
      passo: '2',
      titulo: 'Solicite as Medidas Protetivas',
      descricao: 'Já na delegacia, peça as medidas protetivas. A polícia encaminhará o pedido ao juiz.'
    },
    {
      passo: '3',
      titulo: 'Aguarde a Decisão',
      descricao: 'O juiz tem até 48 horas para analisar e conceder as medidas. Em casos urgentes, pode ser imediato.'
    },
    {
      passo: '4',
      titulo: 'Receba a Intimação',
      descricao: 'Você será notificada das medidas concedidas. O agressor também será intimado.'
    }
  ]

  return (
    <section className="px-6 py-16 bg-[#F4F8F7]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#FF5F37]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#FF5F37] font-semibold text-sm uppercase tracking-wide">Seus Direitos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#09083D] mb-4">
            Você Tem Direitos
          </h1>
          <p className="text-xl text-[#056881] max-w-3xl mx-auto leading-relaxed">
            A Lei Maria da Penha garante proteção, assistência e justiça. Conheça seus direitos e saiba como acessá-los.
          </p>
        </div>

        {/* Alerta importante */}
        <div className="bg-gradient-to-r from-[#FF5F37] to-[#FF7552] rounded-3xl p-8 text-white shadow-xl mb-12">
          <div className="flex items-start gap-4">
            <AlertCircle size={32} className="shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Importante Saber:</h2>
              <p className="text-lg leading-relaxed mb-2">
                <strong>Você NÃO precisa de advogado para solicitar medidas protetivas.</strong>
              </p>
              <p className="text-white/90 leading-relaxed">
                Basta ir até uma delegacia e fazer o registro da ocorrência. A Defensoria Pública oferece assistência jurídica gratuita se você precisar.
              </p>
            </div>
          </div>
        </div>

        {/* Medidas Protetivas */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#09083D] mb-4">
              Medidas Protetivas de Urgência
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              São decisões judiciais que visam proteger você e interromper o ciclo de violência. Podem ser concedidas em até 48 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {medidasProtetivas.map((medida, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#056881] to-[#5fa8a8] rounded-2xl p-6 text-white hover:scale-105 transition-all">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                  {medida.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{medida.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{medida.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#F4F8F7] rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Clock size={24} className="text-[#056881] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#09083D] mb-2">Prazo para concessão:</h3>
                <p className="text-gray-700 leading-relaxed">
                  O juiz tem <strong>até 48 horas</strong> para analisar o pedido. Em casos de risco iminente, a própria autoridade policial pode conceder as medidas imediatamente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Todos os seus direitos */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-[#09083D] mb-8 text-center">
            Todos os Seus Direitos como Vítima
          </h2>
          
          <div className="space-y-8">
            {direitosVitima.map((categoria, idx) => (
              <div key={idx} className="bg-[#F4F8F7] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#056881] mb-4 flex items-center gap-2">
                  <Shield size={24} />
                  {categoria.categoria}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoria.direitos.map((direito, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-gray-700">
                      <ArrowRight size={16} className="text-[#FF5F37] mt-1 shrink-0" />
                      <span className="text-sm">{direito}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Como solicitar */}
        <div className="bg-gradient-to-br from-[#6A1B9A] to-[#8E24AA] rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Como Solicitar Medidas Protetivas?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comoSolicitar.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="bg-white text-[#6A1B9A] rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                  {item.passo}
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">{item.titulo}</h3>
                <p className="text-white/90 text-sm text-center leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <AlertCircle size={24} />
              Você pode solicitar também:
            </h3>
            <ul className="space-y-2 text-white/90">
              <li>• No Ministério Público</li>
              <li>• Na Defensoria Pública</li>
              <li>• Diretamente no Juizado de Violência Doméstica</li>
              <li>• Por meio de advogado particular (se preferir)</li>
            </ul>
          </div>
        </div>

        {/* Descumprimento */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-[#09083D] mb-6">
            E Se o Agressor Descumprir as Medidas?
          </h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-700 mb-3">Isso é CRIME!</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Descumprir medida protetiva é crime previsto no artigo 24-A da Lei Maria da Penha, com pena de <strong>3 meses a 2 anos de detenção</strong>.
              </p>
            </div>

            <div className="bg-[#F4F8F7] rounded-2xl p-6">
              <h3 className="font-bold text-[#09083D] mb-4">O que fazer:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Phone size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span><strong>Ligue 190 imediatamente</strong> - Polícia Militar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span><strong>Registre nova ocorrência</strong> na delegacia</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span><strong>Comunique ao Ministério Público</strong> e ao juiz</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={20} className="text-[#FF5F37] mt-1 shrink-0" />
                  <span><strong>Guarde provas</strong>: mensagens, fotos, vídeos, testemunhas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Duração das medidas */}
        <div className="bg-gradient-to-r from-[#056881] to-[#5fa8a8] rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Por Quanto Tempo Valem as Medidas Protetivas?
          </h2>
          <div className="space-y-4 text-lg">
            <p className="leading-relaxed">
              As medidas protetivas vigoram <strong>enquanto persistir o risco</strong> à sua integridade física, psicológica, sexual, patrimonial ou moral.
            </p>
            <p className="leading-relaxed">
              Elas são <strong>independentes</strong> de:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• Tipificação penal da violência</li>
              <li>• Ajuizamento de ação penal ou cível</li>
              <li>• Existência de inquérito policial</li>
              <li>• Registro de boletim de ocorrência</li>
            </ul>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-6">
              <p className="font-semibold">
                Ou seja: as medidas continuam valendo até que o juiz entenda que não há mais risco para você.
              </p>
            </div>
          </div>
        </div>

        {/* Rede de apoio */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-[#09083D] mb-8 text-center">
            Onde Buscar Seus Direitos?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F4F8F7] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#056881] mb-4">Delegacias</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Delegacia da Mulher (preferencial)</li>
                <li>• Qualquer delegacia de polícia</li>
                <li>• Delegacia online em alguns estados</li>
              </ul>
            </div>

            <div className="bg-[#F4F8F7] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#056881] mb-4">Justiça</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Juizado de Violência Doméstica</li>
                <li>• Defensoria Pública (gratuito)</li>
                <li>• Ministério Público</li>
              </ul>
            </div>

            <div className="bg-[#F4F8F7] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#056881] mb-4">Saúde e Apoio</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Centros de Referência da Mulher</li>
                <li>• CRAS (Centro de Referência de Assistência Social)</li>
                <li>• Postos de saúde e hospitais</li>
              </ul>
            </div>

            <div className="bg-[#F4F8F7] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#056881] mb-4">Canais de Denúncia</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 180 - Central de Atendimento à Mulher</li>
                <li>• 190 - Polícia Militar (emergência)</li>
                <li>• 197 - Polícia Civil</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#FF5F37] to-[#FF7552] rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Seus Direitos Estão Garantidos por Lei
          </h2>
          <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            Você não está sozinha. A Lei Maria da Penha e toda uma rede de proteção estão ao seu lado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/preciso-ajuda"
              className="bg-white text-[#FF5F37] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
            >
              Buscar Ajuda Agora
              <ArrowRight size={20} />
            </a>
            <a
              href="/mapa"
              className="bg-[#056881] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#044d63] transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
            >
              Ver Mapa de Serviços
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-sm font-semibold mb-2">
              Em caso de emergência, ligue imediatamente:
            </p>
            <p className="text-2xl font-bold">
              190 (Polícia Militar) ou 180 (Central da Mulher)
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SeusDireitos
