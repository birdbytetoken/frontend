export const claimAirdrop = async (Contract, account, referrersCount, nonce, userId, sigV, sigR, sigS) => {
  return Contract.methods
    .claimReward(referrersCount, nonce, userId, sigV, sigR, sigS)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
