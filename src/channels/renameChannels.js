const { LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
const { formatNumber } = require("../utility/helpers");
const { SOLANA_CONNECTION } = require("../utility/network");

/**
 * Model will run through all the tokens in this list and 
 * update the respective channel based on current account balance
 * Must have channel, balance, token address, and token label
 */
const TOKEN_DETAIL = {
    sol: {
        channel: '994396923635191808',
        balance: 0,
        address: '7iCV5tQ1nNjpxwdcSpCHCM5Sbmhs4oHkFjfZWa7zYCmf',
        label: 'SOL'
    },
    usdc: {
        channel: '996221864236023808',
        balance: 0,
        address: 'ED2M5j7Bc51YnhbWgDiStzadxRBN2XiQDtKW3W2sV7VP',
        label: 'USDC',
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    },
    samo: {
        channel: '996221790986706965',
        balance: 0,
        address: 'HX68eFni5VyZvRsyupSVR9MxYyV2TrDskKTNy5jbFVSw',
        label: 'SAMO',
        mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
    }
}

const renameChannels = async (guild) => {
    
    /**
     * 
     * Update name of a channel based on it's ID.
     * Note: this can only run 1-2x per 10 min. 
     * 
     * @param {string} channelId 
     * @param {string} newName 
     */
    const updateChannel = async (channelId, newName) => {
        const channel = await guild.channels.cache.get(channelId);
        try {
            if(channel.name !== newName){
                await channel.setName(newName);
                console.log(`New name set: "${newName}."`);
            }
            else {
                console.log('No name change required.');
            }
        }
        catch {
            console.error('Error setting name.');
        }
    }
    const lamportsToSol = (lamports) => {
        return lamports/LAMPORTS_PER_SOL;
    }

    const generateChannelName = (number, unit) => {
        try {
            const newValue = formatNumber(number);
            const newName = unit + ': ' +  newValue;
            return newName;
        }
        catch {
            console.error('error');
        }
    }
    const checkAndUpdateNames = async () => {
        for (const token in TOKEN_DETAIL) {
            const { address, label, channel } = TOKEN_DETAIL[token];
            let { balance } = TOKEN_DETAIL[token];
            balance = token === 'sol' 
                ? lamportsToSol(await SOLANA_CONNECTION.getBalance(new PublicKey(address)))
                : (await SOLANA_CONNECTION.getTokenAccountBalance(new PublicKey(address))).value.uiAmount;
            updateChannel(channel, generateChannelName(balance, label));
        }
    }
    checkAndUpdateNames();

    SOLANA_CONNECTION.onAccountChange(new PublicKey(TOKEN_DETAIL.sol.address),(accountInfo)=>{
        console.log(`----Account change detected for Wallet: ${TOKEN_DETAIL.sol.address}.----`);
        checkAndUpdateNames();
    },'finalized');
}
module.exports = {renameChannels};


