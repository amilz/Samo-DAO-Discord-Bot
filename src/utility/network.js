const {Connection, clusterApiUrl} = require('@solana/web3.js');

//TO DO UPDATE WITH CONFIG/ENV VARIABLES
const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));

module.exports = { SOLANA_CONNECTION };