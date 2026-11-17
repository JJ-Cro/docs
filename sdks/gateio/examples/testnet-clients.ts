import { RestClient, WebsocketAPIClient, WebsocketClient } from 'gateio-api';

const options = {
  apiKey: process.env.GATEIO_TESTNET_API_KEY,
  apiSecret: process.env.GATEIO_TESTNET_API_SECRET,
  useTestnet: true,
};

const rest = new RestClient(options);
const streams = new WebsocketClient(options);
const commands = new WebsocketAPIClient(options);
