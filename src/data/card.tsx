import {Users, ClipboardList, Megaphone, BookOpen, Scale, Shield} from "lucide-react"

export type Card = {
    icon: React.ReactNode,
    title:string,
    text:string,
    btn: string
}

export const cardsData: Card[] = [
    {
    icon: <Users size={48} className="text-white" />,
    title: 'Grupos de Apoio',
    text: 'Conexão com grupos para compartilhar experiências e fortalecer a rede de suporte',
    btn: 'Visualizar',
   
  },
  {
    icon: <ClipboardList size={48} className="text-white" />,
    title: 'Testes',
    text: 'Descubra se você sabe identificar ou se está passando por algum tipo de violência',
    btn: 'Acessar',
   
  },
  {
    icon: <Megaphone size={48} className="text-white" />,
    title: 'Como Denunciar',
    text: 'Conheça e entenda o passo a passo de como prosseguir com uma denúncia',
    btn: 'Acessar',
  },
] 

export const cardsTypes: Card[] = [
  {
    icon: <BookOpen size={28}/>,
    title: "Tipos de Violencia",
    text: "Entenda as diferentes formas de violência — física, psicológica, sexual, patrimonial e moral — e como identificá-las no dia a dia.",
    btn: "Visualize"
  },
    {
    icon: <Scale size={28}/>,
    title: "Lei",
    text: "Conheça as leis que que protegem vocÊ, como a Lei Maria da Penha, e saiba quais são seus direitos garantidos pela legislação brasileira",
    btn: "Visualize"
  },
    {
    icon: <Shield size={28}/>,
    title: "Seus Direitos",
    text: "Você tem direito à proteção, assistência e justiça. Descubra como acessar os serviços públicos e medidas protetivas disponíveis.",
    btn: "Visualize"
  }
]