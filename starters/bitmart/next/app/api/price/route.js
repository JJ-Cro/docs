import { RestClient } from 'bitmart-api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = new RestClient();
    const response = await client.getSpotTickerV3({ symbol: 'BTC_USDT' });
    const price = response.data.last;

    if (!price) {
      throw new Error('No price was returned.');
    }

    return Response.json({
      symbol: 'BTC_USDT',
      price: String(price),
    });
  } catch (error) {
    console.error('Price request failed:', error);

    return Response.json(
      { error: 'Exchange price request failed. Check the server logs.' },
      { status: 502 },
    );
  }
}
