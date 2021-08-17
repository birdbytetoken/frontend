import { useEffect, useState } from 'react'
import erc20 from '../config/abi/erc20.json'
import airdropAbi from '../config/abi/airdrop.json'
import contracts from '../config/contracts'
import { useWeb3Context } from '../context/web3connect'

const useContract = (abi, address, contractOptions = {}) => {
  const { web3 } = useWeb3Context()
  
  const [contract, setContract] = useState({})
  
  useEffect(() => {
    if (web3) {
      setContract(new web3.eth.Contract(abi, address, contractOptions))
    }
  }, [abi, address, web3])

  return contract
}

export const useAirdropContract = () => {
  // console.log(contracts.airdropAddress);
  const abi = (airdropAbi)
  return useContract(abi, contracts.airdropAddress)
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */
export const useERC20Contract = (address) => {
  const erc20Abi = (erc20)
  return useContract(erc20Abi, address)
}

export default useContract
