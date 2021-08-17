import { useState } from 'react';
import { useEffect } from 'react';
import Layout from '../components/layout'
import { api } from '../config';
import { useAppContext } from '../context/state';
import { useWeb3Context } from '../context/web3connect'
import useAirdrop from '../hooks/useAirdrop';

export default function ClaimAirdrop() {
  const { account, connectWallet, disconnectWallet } = useWeb3Context();
  const [sharedState] = useAppContext()
  const [loading, setLoading] = useState(false)
  const { onAirdrop } = useAirdrop()
  const [msg, setMsg] = useState({msg: "", msgType: ""})

  useEffect(() => {
   connectWallet() 
  }, [])

  const claimAirdrop = async () => {
    try {
      setLoading(true)
      setMsg({msg: "", msgType: "" })
      const res = await (await fetch(`${api}/users/claim-airdrop`, {
        method: 'GET',
        headers: {
          Authorization: sharedState.userToken,
          'Content-Type': 'application/json',
      },
      })).json()
      
      if (res.success) {
        const { sigV, sigR, sigS, nonce, referrersCount } = res.data;
        await onAirdrop(referrersCount, nonce, sharedState.user.id, sigV, sigR, sigS)
      } else {
        setMsg({msg: res.message, msgType: "red" })
        console.log({res});
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log({error});
    }
  }

  return (
    <Layout>
        <div className="w-full px-4">
          <div className="md:pt-32 sm:pt-0">
            <h2 className="text-center font-semibold text-4xl text-white">
                Claim Airdrop
            </h2>
            <div className="justify-center text-center flex flex-wrap pb-4 w-full bg-gradient mt-14 md:mt-26">
            {msg.msg && 
              <div className={`text-${msg.msgType}-500 block p-4 w-full`}>{msg.msg}</div>}
            <div class="relative w-11/12 md:w-9/12 mb-3">
                        <label
                          class="block uppercase text-white text-xl font-semibold mb-2"
                        >
                          Bsc wallet address
                        </label>
              <input
                readOnly="true"
                value={account ? account : ""}
                          type="email"
                          class="border-0 px-4 py-3 placeholder-blueGray-300 text-blueGray-800 bg-white rounded-full text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
                          placeholder=""
              />
                       
                      </div>

            </div>
            <div className="justify-center flex flex-col w-52 mx-auto text-center">
            
            {account ? (
              <span>

                <button onClick={claimAirdrop} className={`btn text-white text-sm font-bold uppercase p-3 mt-2 rounded shadow-lg outline-none focus:outline-none mr-1 mb-2 ${loading && 'opacity-50'}`}>Claim now</button>
                <button onClick={disconnectWallet} className={`btn text-white text-sm font-bold uppercase p-3 mt-2 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ${loading && 'opacity-50'}`}>Disconnect wallet</button>
                
              </span>
              ) : (
              <button onClick={connectWallet} className="btn text-white text-sm font-bold uppercase p-3 mt-2 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1">Connect wallet</button>
            ) }

            </div>
          </div>
        </div>

    </Layout>
  )
}
