import {Users, ClipboardList, Megaphone, BookOpen, Scale, Shield, ShieldCheck, HeartHandshake, Heart, Lightbulb, Target} from "lucide-react"
import { Link } from "react-router-dom"

 type Card = {
    icon: React.ReactNode,
    title:string,
    text:string,
    btn: React.ReactNode,
}
type LinkItem =
  | { label: string; href: string; external: true }
  | { label: string; to: string; external: false }

 type CardLink = {
    icon: React.ReactNode,
    title: string,
    text: string,
    links: LinkItem[]
 }

 type Post = {
  id: string
  title: string,
  relato: string,
  author: string,
  date: string,
  comments: number
 }

 export type Comment = {
  id: string,
  author: string,
  text: string,
  date: string
 }

 export type Status = 'Pendente' | 'Aprovado' | 'Recusado'
 export type Relato = {
  id: string,
  codigo: string,
  texto: string,
  date: string,
  status: string,
  comments: {author: string; text: string; date: string}[]
 }

export const cardsData: Card[] = [
    {
    icon: <Users size={48} className="text-white" />,
    title: 'Grupos de Apoio',
    text: 'Conexão com grupos para compartilhar experiências e fortalecer a rede de suporte',
    btn: <Link to={`/testes`}>Acessar</Link>,
   
  },
  {
    icon: <ClipboardList size={48} className="text-white" />,
    title: 'Testes',
    text: 'Descubra se você sabe identificar ou se está passando por algum tipo de violência',
    btn: <Link to={`/testes`}>Acessar</Link>,
   
  },
  {
    icon: <Megaphone size={48} className="text-white" />,
    title: 'Como Denunciar',
    text: 'Conheça e entenda o passo a passo de como prosseguir com uma denúncia',
    btn: <Link to={`/testes`}>Acessar</Link>,
  },
] 

export const cardsTypes: Card[] = [
  {
    icon: <BookOpen size={28}/>,
    title: "Tipos de Violencia",
    text: "Entenda as diferentes formas de violência — física, psicológica, sexual, patrimonial e moral — e como identificá-las no dia a dia.",
    btn: <Link to={`/tipos-violencia`}>Acessar</Link>,
  },
    {
    icon: <Scale size={28}/>,
    title: "Lei",
    text: "Conheça as leis que que protegem você, como a Lei Maria da Penha, e saiba quais são seus direitos garantidos pela legislação brasileira",
    btn:<Link to={`/lei-maria-da-penha`}>Acessar</Link>,
  },
    {
    icon: <Shield size={28}/>,
    title: "Seus Direitos",
    text: "Você tem direito à proteção, assistência e justiça. Descubra como acessar os serviços públicos e medidas protetivas disponíveis.",
    btn: <Link to={`/seus-direitos`}>Acessar</Link>,
  }
]

export const cardsLink: CardLink[] = [
  {
    icon: <ShieldCheck  size={40} className="text-[#09083D]" />,
    title: "Quero Denunciar",
    text: "Você será redirecionada para a delegacia digital. Caso tenha dúvidas sobre como denunciar.",
    links: [
      {label: 'Acessar Delegacia Digital', href: 'https://www.delegaciadigital.sp.gov.br', external: true},
      {label: 'Ver nosso tutorial', to: '/tutorial-denuncia', external: false }
    ]
  },
  {
    icon: <HeartHandshake size={40} className="text-[#09083D]" />,
    title: 'Quero Apoio Psicológico',
    text: 'Você será redirecionada para plataformas que disponibilizam ajuda psicológica.',
    links: [
      { label: 'Acesse pelo link', href: 'https://www.justiceiras.org.br/', external: true },
    ],
  },
  {
    icon: <Scale size={40} className="text-[#09083D]" />,
    title: 'Quero Apoio Jurídico',
    text: 'Você será redirecionada para plataformas que disponibilizam orientação jurídica.',
    links: [
      { label: 'Acesse pelo link', href: 'https://www.mapadoacolhimento.org/atendimento/', external: true },
    ],
  }
]

export const posts: Post[] = [
  {
    id: '1',
    title: 'Encontrei força para sair',
    relato: 'Durante anos achei que não tinha saída, mas com apoio de amigas e de uma rede de suporte consegui dar o primeiro passo...',
    author: 'Anônima',
    date: '28/02/2026',
    comments: 6,
  },
  {
    id: '2',
    title: 'A importância de falar sobre isso',
    relato: 'Quebrar o silêncio foi a parte mais difícil. Compartilho aqui minha experiência para que outras mulheres se sintam menos sozinhas...',
    author: 'Maria S.',
    date: '25/02/2026',
    comments: 3,
  },
  {
    id: '3',
    title: 'Como identifiquei a violência psicológica',
    relato: 'Por muito tempo não reconheci como violência. As palavras machucam tanto quanto ações físicas e demorei para perceber...',
    author: 'Anônima',
    date: '20/02/2026',
    comments: 8,
  },
  {
    id: '4',
    title: 'Recomeçando aos 40',
    relato: 'Achei que era tarde demais para recomeçar, mas descobri que nunca é tarde para buscar uma vida livre e segura...',
    author: 'Ana R.',
    date: '18/02/2026',
    comments: 11,
  },
  {
    id: '5',
    title: 'Rede de apoio fez a diferença',
    relato: 'Não precisei enfrentar sozinha. Grupos de apoio me mostraram que existem pessoas prontas para ajudar em cada etapa...',
    author: 'Anônima',
    date: '15/02/2026',
    comments: 5,
  },
  { 
    id: '6',
    title: 'Para quem ainda tem medo',
    relato: 'Se você está lendo isso com medo, saiba que eu também estava. Aqui conto o que me ajudou a dar coragem e buscar ajuda...',
    author: 'Julia M.',
    date: '10/02/2026',
    comments: 14,
  },
]

// comentarios mockados

export const commentsByPost: Record<string, Comment[]> = {
   '1': [
    { id: 'c1', author: 'Anônima', text: 'Obrigada por compartilhar. Me identifiquei muito com sua história.', date: '28/02/2026' },
    { id: 'c2', author: 'Carla M.', text: 'Você é muito corajosa! Sua história me deu força.', date: '28/02/2026' },
  ],
  '2': [
    { id: 'c3', author: 'Anônima', text: 'Falar sobre isso realmente ajuda. Muito obrigada.', date: '25/02/2026' },
  ],
}

export const statusColor: Record<Status, string> = {
  Pendente: 'bg-yellow-100 text-yellow-700',
  Aprovado: 'bg-green-100 text-green-700',
  Recusado: 'bg-red-100 text-red-700',
}

export const mocksRelatos: Relato[] = [
{
  id: '1',
  codigo: 'REL-468',
  texto: 'Gostaria de compartilhar minha história de superação. Depois de anos em um relacionamento abusivo, consegui sair com ajuda de uma rede de apoio. Hoje estou reconstruindo minha vida...',
  date: '26/03/2025',
  status: 'Pendente',
  comments: [{
    author: 'Anonima', text:'Você é muito corajosa!', date: '29/03/2025'
  }]
},
 {
    id: '2',
    codigo: 'REL-312',
    texto: 'Quero contar como a Lei Maria da Penha me protegeu quando mais precisei. A medida protetiva foi essencial para garantir minha segurança...',
    date: '10/03/2025',
    status: 'Aprovado',
    comments: [],
  },
]

export const pilares = [
  {
    icon: <Lightbulb size={24} className="text-[#056881]" />,
    title: 'A Ideia',
    text: 'Tudo começou com uma pergunta simples: por que é tão difícil encontrar informação e apoio quando mais se precisa? A resposta nos motivou a agir.',
  },
  {
    icon: <Heart size={24} className="text-[#7b0692]" />,
    title: 'O Porquê',
    text: 'Milhares de mulheres enfrentam a violência em silêncio por falta de acesso a informação, suporte e escuta. Decidimos que precisávamos mudar isso.',
  },
  {
    icon: <Target size={24} className="text-[#FF5F37]" />,
    title: 'Nossa Missão',
    text: 'Ser um espaço seguro, acessível e acolhedor onde toda mulher possa encontrar informação, apoio e comunidade — sem julgamentos.',
  },
  {
    icon: <Users size={24} className="text-[#056881]" />,
    title: 'Quem Somos',
    text: 'Somos estudantes comprometidas em usar a tecnologia como ferramenta de transformação social, colocando as mulheres no centro de tudo.',
  }
]