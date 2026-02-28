
const Mapa = () => {
  return (
    <section className='flex items-center justify-center px-6 py-16'>
      <div className='max-w-5xl w-full flex flex-col md:flex-row items-center gap-8'>
            <div className='bg-[#c5e7f04b] rounded-2xl shadow-sm p-10 flex flex-col gap-6 md:w-2/5 w-full'>
                <div>
                    <h2 className='text-4xl font-light'>Navegue</h2>
                    <h2 className='text-4xl font-bold text-[#03297a]'>pelo MAPA</h2>
                </div>
                <ol>
                    <li>
                        1. Clique no icone <span className='font-mono border border-gray-300 px-1 rounded text-sm'>⛶</span> para abrir o <strong>mapa em tela cheia</strong>.
                    </li>
                    <li>
                        2. <strong>Selecione a(s) categorias(s) dos serviços</strong> de acordo com a sua necessidade.
                    </li>
                    <li>
                        3. <strong>Insira seu endereço</strong> no campo de busca.
                    </li>
                    <li>
                        4. Navegue pelo mapa para encontrar o serviço <strong>mais proximo de você</strong>.
                    </li>
                </ol>
            </div>
                <div className='md:w-3/5 w-full rounded-2xl overflow-hidden shadow-md'>
                    <iframe src="https://www.google.com/maps/d/embed?mid=14r7iFNNFtXVNN5wz3TTP6BVvcBwgu-I" width="100%" height="400" className='border-0 w-full' allowFullScreen loading='lazy'/>
                </div>
        </div>
    </section>
  )
}

export default Mapa