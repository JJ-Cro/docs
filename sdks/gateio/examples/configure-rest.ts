import { RestClient } from 'gateio-api';

const client = new RestClient({ keepAlive: true }, { timeout: 10000 });
