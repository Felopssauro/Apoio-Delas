import { cardsTypes } from "../data/card"

const Principal = () => {
    return (
            <section className="flex flex-col items-center justify-center px-6 py-20 pb-28 md:pb-20 relative">
                <div className="text-center mb-14 z-10">
                    <span className="text-2xl font-semibold tracking-widest text-[#056881] uppercase">Conhecimento que transforma</span>
                    <p className="mt-4 text-[#849ffa] text-xl max-w-md mx-auto leading-relaxed">Informação é o primeiro passo para conbater a violencia</p>
                </div>

                {/* cards */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl z-10">
                    {cardsTypes.map((cards) => (
                        <div key={cards.title} className=" bg-[#ddecf779] rounded-2xl border-gray-100 shadow-md p-8 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-shadow duration-300">
                            {/* Icones */}
                                <div className="bg-[#7f91b9ad] rounded-2xl p-4 shadow-sm">
                                    {cards.icon}
                                </div>

                                {/* Titulo */}
                                <div className="text-2xl text-[#056881] leading-relaxed flex-1">
                                    {cards.title}
                                </div>
                                {/* descrição */}
                                <div className="text-2xl text-[#849ffa] leading-relaxed flex-1">
                                    {cards.text}
                                </div>
                                {/* butão */}
                                <button className="mt-2 bg-[#7f91b9ad] text-[#43225e] px-8 py-2 rounded-xl font-semibold text-sm hover:bg-[#7f91b9] transition-colors duration-200 shadow-sm">
                                    {cards.btn}
                                </button>
                        </div>
                    ))}
                </div>
            </section>
  )
}

export default Principal