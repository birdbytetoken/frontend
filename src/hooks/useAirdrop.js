import { useCallback, useEffect, useState } from 'react'
import { useWeb3Context } from '../context/web3connect'
import { getAirdropPerReferrer } from '../utils/airdrop'
import { claimAirdrop } from '../utils/callHelpers'
import { useAirdropContract } from './useContract'

const useAirdrop = () => {
  const { account } = useWeb3Context()
  const airdropContract = useAirdropContract()

  const handleClaimAirdrop = useCallback(
    async (referrersCount, nonce, userId, sigV, sigR, sigS) => {
      const txHash = await claimAirdrop(airdropContract, account, referrersCount, nonce, userId, sigV, sigR, sigS)
      console.info(txHash)
    },
    [account],
  )

  return { onAirdrop: handleClaimAirdrop }
}

export const useRewardPerReferrers = () => {
  const [reward, setReward] = useState(0)
  const { web3 } = useWeb3Context()

  useEffect(() => {
    const fetchReward = async () => {
      const res = await getAirdropPerReferrer(web3)
      setReward(res)
    }
    
    if (web3) {
      fetchReward()
    }
    
  }, [web3])
  
  return reward
}

export default useAirdrop
