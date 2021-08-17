import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import config, { api } from '../config'
import { useAppContext } from '../context/state'
import { useWeb3Context } from '../context/web3connect'
import { getAirdropPerReferrer } from '../utils/airdrop'

export default function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [sharedState, setSharedState] = useAppContext()
  const [refId, setRefId] = useState("")
  const [msg, setMsg] = useState("")
  const [referrersCount, setReferrersCount] = useState(0)
  const { web3 } = useWeb3Context()
  const [rewardPerReferrer, setRewardPerReferrer] = useState(0)
  const airdroping = false;
  const history = useHistory();

  function copy() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied referrer link");
  }


  const buy = (e) => {
    e.preventDefault()
    setSharedState({ msg: true });
  }
    

  const getuserinfo = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${api}/users/get`, {
        method: 'GET',
        headers: {
          Authorization: sharedState.userToken,
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      
      if (res.status == 401) {
        history.push('/welcome')
        return
      }

      const userdata = data.data
      setRefId(userdata.refID);
      setReferrersCount(userdata.referrersCount)
      setLoading(false)
      return data
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  const claimAirdrop = () => {
    if (referrersCount < 1) return
    if (!airdroping) {
      setMsg("Can't claim yet until announcement is made")
      setTimeout(() => {
        setMsg("")
      }, 3000);
      return
    }
    
    window.location.href = '/claimairdrop'
  }

  const fetchReward = async () => {
    const res = await getAirdropPerReferrer(web3)
    // setRewardPerReferrer(res)
    const reward = 2
    setRewardPerReferrer(reward)
  }

  useEffect(() => {
    fetchReward()

    if (sharedState?.user?.id)
      getuserinfo()
    
  }, [sharedState])

  return (
    <Layout>
        <div className="w-full px-4">
          <div className="md:pt-32 sm:pt-0">
            <h2 className="text-center font-semibold text-4xl text-white">
                Dashboard
            </h2>
            <div className="justify-center text-center flex flex-wrap pb-10 w-full bg-gradient mt-14 md:mt-26">
            <div class="relative w-11/12 md:w-9/12 mb-3">
              {msg && 
            <div className="text-white mb-4 bg-default inline-block p-2">{msg}</div>
              }
                        <label
                          class="block uppercase text-white text-xl font-semibold mb-2"
                        >
                          Referral Link
                        </label>
              <input
                id="myInput"
                readOnly="true"
                value={`${config.appurl}/welcome?referrer=${refId}`}
                          type="text"
                          class="border-0 px-4 py-3 placeholder-blueGray-300 text-blueGray-800 bg-white rounded-full text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
                          placeholder="https://birdbytetoken.com/referrer?23gTY7"
              />
                            <i onClick={copy} className="cursor-pointer fas fa-copy absolute -right-1 bottom-0 px-5 py-3 block bg-blueGray-600 rounded-r-full text-sm"></i>

                      </div>

            </div>
          <div className="md:mt-10 justify-center flex flex-wrap w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-glass p-2 md:p-4 w-38 md:w-56 text-center font-bold mt-4 ">
                <h3>Airdrop:</h3>
                <p className="text-darkPurple text-sm md:text-md">{loading ? '...' : rewardPerReferrer * referrersCount }</p>
              </div>
              <div className="bg-glass p-2 md:p-4 w-38 md:w-56 text-center font-bold mt-4">
                <h3>Referrers:</h3>
                <p className="text-darkPurple text-sm md:text-md">{loading ? '...' : referrersCount} verified</p>
              </div>
            </div>

            </div>
            <div className="mt-10 justify-center flex flex-col w-52 mx-auto text-center">
            <h4 className="font-bold">
            Claim Airdrop

            </h4> 
            <button onClick={claimAirdrop} className={`btn text-white text-sm font-bold uppercase p-3 mt-2 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1 ${referrersCount < 1 && 'opacity-50'}  `}>Claim now</button>

            </div>
            <div className="mt-10 justify-center flex flex-col w-52 mx-auto text-center">
            {/* <h4 className="font-bold">
            Pre-sale

            </h4>  */}
            <a
              target="_blank"
              className="btn text-white text-sm font-bold uppercase p-3 mt-2 rounded shadow-lg outline-none focus:outline-none mr-1 mb-1"
              href="https://pancakeswap.finance/swap#/swap?outputCurrency=0x4ab12a2c63be0e67f77fa027d9f4c094bb4b0d68">
              
              Buy now</a>

            </div>
          </div>
        </div>

    </Layout>
  )
}
