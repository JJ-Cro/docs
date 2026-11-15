import { FuturesClientV2, RestClient } from 'bitmart-api';

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

export const credentials = {
  apiKey: requiredEnv('BITMART_API_KEY'),
  apiSecret: requiredEnv('BITMART_API_SECRET'),
  apiMemo: requiredEnv('BITMART_API_MEMO'),
};

export const spot = new RestClient(credentials);
export const futures = new FuturesClientV2(credentials);
