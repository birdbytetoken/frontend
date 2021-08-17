import Layout from '../components/layout'

export default function Roadmap() {
  return (
    <Layout>
        <div className="w-full px-4">
          <div className="md:pt-32 sm:pt-0">
            <div className="flex flex-wrap text-cener justfy-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold text-white">What you should know:</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-white">
                Our token is based on the Binance Smart Chain. <span className="text-red-500">BirdByte</span> Smart Contract
                uses the BEP-20 standards. We're based on BSC because of it's low fuel costs and fast transactions.
                And our liquidity is held at Pancakeswap, where you can trade our tokens.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 justify-center">
          <div className="w-full px-4">
            <h6 className="text-xl mt-5 font-semibold text-white bg-red-600 p-2 lg:w-3/12">
              BirdByte Tokenomics: (15%)
            </h6>
              <ul className="list-disc text-white pl-4">
                <div className="grid md:grid-cols-2">
                  <div>

              <li className="mt-2">
                5% - Marketing
              </li>
              <li className="mt-1">
                1% - Burn
              </li>
              <li className="mt-1">
                3% - Lp
              </li>
              <li className="mt-1">
                6% - Rewards in $BIB
              </li>
              <li className="mt-1">
                Total Supply: 12,000,000
              </li>
              <li className="mt-1">
                Initial burn: 30%
              </li>
                  </div>
                  <div>

              <li className="mt-1">
                Symbol: BIB
              </li>
              <li className="mt-1">
                Name: BirdByte
              </li>
              <li className="mt-1">
                Network: Smartchain
              </li>
              <li className="mt-1">
                Max Buy: 1%
              </li>
              <li className="mt-1">
                Max Sell: 1%
              </li>
                  </div>
                </div>
              </ul>
              <p className="text-lg leading-relaxed mt-8 mb-4 text-white">
                It is normal for people to buy and sell our token at any given time, because as they do so the supply
                reduces rapidly, thereby; increasing demand to supply ratio and driving the price of $BIB up.
            </p>
          </div>
      </div>
            </div>
        </div>

    </Layout>
  )
}
