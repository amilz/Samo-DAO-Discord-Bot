const { PublicKey, LAMPORTS_PER_SOL} = require('@solana/web3.js');
const {SOLANA_CONNECTION} = require('./network');

/**
 * 
 * @param wallet (address of a solana wallet)
 * @returns solana balance of that wallet
 */
async function getAccountBalance(wallet) {
    const walletPublicKey = new PublicKey(wallet);
    const balance = await SOLANA_CONNECTION.getBalance(walletPublicKey)/LAMPORTS_PER_SOL;
    return balance;
}

module.exports = { getAccountBalance };
