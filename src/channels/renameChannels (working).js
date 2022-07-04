const { LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
const { SOLANA_CONNECTION } = require("../utility/network");

//TO DO Update with Config/env
const VAULT_ADDRESS = '7iCV5tQ1nNjpxwdcSpCHCM5Sbmhs4oHkFjfZWa7zYCmf';
const VOICE_CHANNEL_ID = '993211469292376204';
const GUILD_ID = '896470658169569310';

const renameChannels = async (client) => {
    const guild = client.guilds.cache.get(GUILD_ID);
    const voiceChannel = guild.channels.cache.get(VOICE_CHANNEL_ID);
    
    const updateChannel = (channelId, name) => {
        const channel = guild.channels.cache.get(channelId);

        channel.setName(name);
    }
/*     SOLANA_CONNECTION.onAccountChange(new PublicKey(VAULT_ADDRESS),(accountInfo)=>{
        const newSolBalance = accountInfo.lamports/LAMPORTS_PER_SOL;
        console.log('Account change! New SOL Balance',newSolBalance.toLocaleString());
        updateChannel(voiceChannel,'SOL Balance: ',newSolBalance.toLocaleString());
    },'finalized'); */
    const newSolBalance = await SOLANA_CONNECTION.getBalance(new PublicKey(VAULT_ADDRESS));
    const newSolString = (Math.round(newSolBalance/LAMPORTS_PER_SOL)).toLocaleString();
    const newName = `SOL Balance: ${newSolString}`;
    console.log(newName);
    updateChannel(VOICE_CHANNEL_ID, newName);



}

module.exports = {renameChannels};