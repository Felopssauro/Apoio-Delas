import { cardsLink } from "../data/card"
import { Link } from "react-router-dom"

const NeedHelp = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl flex flex-col gap-4">
            {cardsLink.map((card) => (
                <div key={card.title}
                className="bg-[#ff7552b9] rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    {/* Icone */}
                    <div className="shrink-0 bg-white/40 rounded-2xl p-4 w-fit">
                        {card.icon}
                    </div>

                    {/* Conteudo */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold  text-[#113d66]">{card.title}</h3>
                        <p className="text-sm text-[#272429] leading-relaxed">{card.text}</p>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 mt-1">
                            {card.links.map((link) => (
                                link.external ? (
                                    <a key={link.label} href={link.href} target="_blank" rel="noopener nonferrer" className="font-semibold underline underline-offset-2 hover:text-[#ff5f37] transition-colors text-sm">{link.label}</a>
                                ):(
                                    <Link key={link.label} to={link.to} className="font-semibold underline underline-offset-2 hover:text-[#ff5f37] transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>                    
                </div>
            ))}
        </div>
    </section>
  )
}

export default NeedHelp