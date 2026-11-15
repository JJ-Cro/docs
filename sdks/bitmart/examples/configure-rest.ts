import { RestClient } from 'bitmart-api';

export const client = new RestClient({
  keepAlive: true,
}, {
  timeout: 20_000,
});
