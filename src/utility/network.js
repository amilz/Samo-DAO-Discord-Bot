const { Connection } = require('@solana/web3.js');
require('dotenv').config({path: '../../.env'});
const SOLANA_ENDPOINT = process.env.ENDPOINT_URL;

//TO DO UPDATE WITH CONFIG/ENV VARIABLES
const SOLANA_CONNECTION = new Connection(SOLANA_ENDPOINT);

module.exports = { SOLANA_CONNECTION };