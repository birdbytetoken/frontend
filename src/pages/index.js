import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { useAppContext } from '../context/state'
import { getTotalBurn, getTotalSupply } from '../utils/erc20'

export default function Home() {
  const [sharedState, setSharedState] = useAppContext()
  const [totalSupply, setTotalSupply] = useState(0)
  const [availableSupply, setAvailableSupply] = useState(0)
  const [burntPercent, setBurntPercent] = useState(0)
  const [fastRefresh, setFastRefresh] = useState(0)


  const buy = (e) => {
    e.preventDefault()
    setSharedState({ msg: true });
  }
    

  useEffect(() => {
    setInterval(() => {
      setFastRefresh((prev) => prev + 1)
    }, 4000)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const totalSupply = await getTotalSupply()
      setTotalSupply(totalSupply.toLocaleString())
      const totalBurn = await getTotalBurn()
      setAvailableSupply((totalSupply - totalBurn).toLocaleString())
      setBurntPercent(((100 * totalBurn)/totalSupply || 0).toFixed(4))
    }

    loadData()
  }, [fastRefresh])

  return (
    <Layout>
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div className="md:pt-32 sm:pt-0">
            <h2 className="font-semibold text-4xl text-white">
                Welcome to BirdByte.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white">
              BirdByte is a utility coin on Bsc. It features multiple deflationary standards
              and defi apps to give the token more use case, making it more than just a memecoin.
            </p>

            <div className="mt-10">
              <div className="bg-glass p-2 md:p-4 w-52 md:w-56 text-center text-white font-bold mt-4">
                <h3>Total supply:</h3>
                <p className="text-darkPurple">{totalSupply}</p>
              </div>
              <div className="bg-glass p-2 md:p-4 w-52 md:w-56 text-center text-white font-bold mt-4">
                <h3>Available supply:</h3>
              <p className="text-darkPurple">{ availableSupply }</p>
              </div>
              <div className="bg-glass p-2 md:p-4 w-52 md:w-56 text-center text-white font-bold mt-4">
                <h3>Burnt supply:</h3>
                <p className="text-darkPurple">{burntPercent}%</p>
              </div>

            </div>
          </div>
          <div className="md:absolute md:top-10 b-auto right-24 pt-16 -mt-48 sm:mt-0 justify-center text-center">
            <img className="w-20 md:w-96 absolute md:relative top-60 md:top-4 right-10 md:right-0" src="/images/colors-circle.png" alt="colors" />
            <div className="mt-40 md:mt-12">
              <a
                href={sharedState?.user?.id ? "/dashboard" : "/welcome"}
                className="btn get-started font-bold outline-none focus:outline-none mr-1 mb-1 uppercase text-xs p-3 md:text-sm shadow-lg ease-linear transition-all duration-150"
              >
                Get Airdrop
              </a>
              <a
                href="https://pancakeswap.finance/swap#/swap?outputCurrency=0x4ab12a2c63be0e67f77fa027d9f4c094bb4b0d68"
                className="btn github-star ml-1 font-bold outline-none focus:outline-none mr-1 mb-1 uppercase text-xs p-3 md:text-sm shadow-lg ease-linear transition-all duration-150"
                target="_blank"
              >
                Buy on pcs<i className="ml-1 fas fa-arrow-alt-circle-right"></i>
              </a>
              <a
                href="/files/bytepaper.pdf"
                className="btn github-star ml-1 font-bold outline-none focus:outline-none mr-1 mb-1 uppercase text-xs p-3 md:text-sm shadow-lg ease-linear transition-all duration-150"
              target="_blank"
              download
              >
                Byte paper <i className="fas fa-arrow-alt-circle-right"></i>
              </a>
            </div>
          </div>
        </div>

    </Layout>
  )
}
