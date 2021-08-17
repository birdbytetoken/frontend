import erc20 from '../config/abi/erc20.json'
import contracts from '../config/contracts'
import Web3 from 'web3'
import { nodeRpcUrl } from '../config'

export const getContract = () => {
const web3 = new Web3(nodeRpcUrl)
  const contract = new web3.eth.Contract((erc20), contracts.birdByteAddress)
  return contract
}

export const getTotalBurn = async () => {
  const contract = getContract()
  try {
    const autoBurn = await contract.methods.totalBurn().call()
    const totalManualBurn = await contract.methods.balanceOf("0x000000000000000000000000000000000000dead").call()
    const totalburn = parseFloat(autoBurn) + parseFloat(totalManualBurn)
    return totalburn / 10 ** 9
  } catch (e) {
    return '0'
  }
}

export const getTotalSupply = async () => {
  const contract = getContract()
  try {
    const supply = await contract.methods.totalSupply().call()
    return supply / 10**9
  } catch (e) {
    return '0'
  }
}
