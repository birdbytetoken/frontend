import Layout from '../components/layout'

export default function Roadmap() {
  return (
    <Layout>
        <div className="w-full px-4">
          <div className="md:pt-32 sm:pt-0">
            <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold text-white">BirdByte Official Roadmap</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-white">
              The BirdByte team have put together a roadmap that will serve as a guide through the long term
              development of giant community/defi products.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-12 justify-center">
          <div className="w-full lg:w-3/12 px-4">
            <h6 className="text-xl mt-5 font-semibold text-white">
              Q3 2021
            </h6>
            <ul className="list-disc text-white pl-4">
              <li className="mt-2">
                Project Launch
              </li>
              <li className="mt-1">
                30% Token Burn
              </li>
              <li className="mt-1">
                LP locked
              </li>
              <li className="mt-1">
                Logo on trustwallet | bsc scan
              </li>
              <li className="mt-1">
                AMA
              </li>
              <li className="mt-1">
                Giveaways
              </li>
              <li className="mt-1">
                Getting Audited
              </li>
              <li className="mt-1">
                Writing white paper
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <h6 className="text-xl mt-5 font-semibold text-white">
              Q4 2021
            </h6>
            <ul className="list-disc text-white pl-4">
              <li className="mt-2">
                Listing & others (from some of: P2PB2B, CG, Blockfolio, LBank, CMC, Hotbit, Olive)
              </li>
              <li className="mt-1">
                Airdrop distribution
              </li>
              <li className="mt-1">
                Burn & Giveaways
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <h6 className="text-xl mt-5 font-semibold text-white">
              Q1 2022
            </h6>
            <ul className="list-disc text-white pl-4">
              <li className="mt-2">
                Use case development
              </li>
              <li className="mt-1">
                Nft
              </li>
              <li className="mt-1">
                A mobile multi-player game where you earn BirdByte by playing (Racing/Action game)
              </li>
              <li className="mt-1">
                Vaults (Lock BirdByte for six months to earn rare BirdByte nfts)
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <h6 className="text-xl mt-5 font-semibold text-white">
              Q2 2022
            </h6>
            <ul className="list-disc text-white pl-4">
              <li className="mt-2">
                Partnership
              </li>
              <li className="mt-1">
                More use cases added
              </li>
              <li className="mt-1">
                More burn
              </li>
              <li className="mt-1">
                More Giveaways
              </li>
            </ul>
          </div>
        </div>
            </div>
        </div>

    </Layout>
  )
}
