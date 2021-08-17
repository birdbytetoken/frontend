import airdrop from '../config/abi/airdrop.json'
import contracts from '../config/contracts'
import Web3 from 'web3'
import { nodeRpcUrl } from '../config'

export const getContract = () => {
const web3 = new Web3(nodeRpcUrl)
  const contract = new web3.eth.Contract((airdrop), contracts.airdropAddress)
  return contract
}

export const getAirdropPerReferrer = async () => {
  const contract = getContract()
  try {
    const reward = await contract.methods.rewardPerReferrer().call()
    return reward
  } catch (e) {
    return '0'
  }
}
