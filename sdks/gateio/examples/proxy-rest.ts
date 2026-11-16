import { RestClient } from 'gateio-api';

const client = new RestClient(
  {},
  {
    proxy: { protocol: 'http', host: '127.0.0.1', port: 8080 },
    timeout: 10000,
  },
);
