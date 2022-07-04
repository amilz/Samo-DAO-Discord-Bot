const { LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
const { SOLANA_CONNECTION } = require("../utility/network");

//TO DO Update with Config/env
const VAULT_ADDRESS = '7iCV5tQ1nNjpxwdcSpCHCM5Sbmhs4oHkFjfZWa7zYCmf';
const VOICE_CHANNEL_ID = '993211469292376204';

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
            console.log('Error setting name.');
        }
    }

    const lamportsToSol = (lamports) => {
        return lamports/LAMPORTS_PER_SOL;
    }

    const generateChannelName = (number, unit) => {
        try {
            const newValue = (Math.round(number)).toLocaleString();
            const newName = unit + ' Balance: ' +  newValue;
            return newName;
        }
        catch {
            console.log('error')
        }
    }
    const onLaunch = async () => {
        const newSolBalance = lamportsToSol(await SOLANA_CONNECTION.getBalance(new PublicKey(VAULT_ADDRESS)));
        updateChannel(VOICE_CHANNEL_ID, generateChannelName(newSolBalance,'SOL'));
    }
    onLaunch();

    SOLANA_CONNECTION.onAccountChange(new PublicKey(VAULT_ADDRESS),(accountInfo)=>{
        console.log(`----Account change detected for Wallet: ${VAULT_ADDRESS}.----`)
        const newSolBalance = lamportsToSol(accountInfo.lamports);
        updateChannel(VOICE_CHANNEL_ID, generateChannelName(newSolBalance,'SOL'));
    },'finalized');
    



}

module.exports = {renameChannels};


