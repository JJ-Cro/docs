import { useEffect, useState } from 'react';
import { RestClient, WebsocketClient } from 'bitmart-api';

function Prices() {
  const [restPrice, setRestPrice] = useState('Loading');
  const [livePrice, setLivePrice] = useState('Connecting');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const ws = new WebsocketClient();

    function showError(error) {
      console.error(error);
      if (mounted) {
        setError(error instanceof Error ? error.message : String(error));
      }
    }

    async function loadPrice() {
      const client = new RestClient();
      const response = await client.getSpotTickerV3({ symbol: 'BTC_USDT' });
      const price = response.data.last;

      if (!price) {
        throw new Error('No price was returned.');
      }

      if (mounted) {
        setRestPrice(String(price));
      }
    }

    loadPrice().catch(showError);

    const timeout = setTimeout(() => {
      showError(new Error('No BTC_USDT update within 30 seconds.'));
    }, 30_000);

    ws.on('update', (message) => {
      if (message.table !== 'spot/ticker') {
        console.log('WebSocket update:', message);
        return;
      }

      const price = message.data?.[0]?.symbol === 'BTC_USDT' ? message.data[0].last_price : undefined;

      if (mounted && price) {
        clearTimeout(timeout);
        setLivePrice(String(price));
      }
    });
    ws.on('exception', showError);

    // React can clean up an effect before its subscription starts.
    Promise.resolve().then(async () => {
      if (!mounted) {
        return;
      }

      try {
        await Promise.all(ws.subscribe('spot/ticker:BTC_USDT', 'spot'));
      } finally {
        // Close again if pending setup completed after unmount.
        if (!mounted) {
          ws.closeAll();
        }
      }
    }).catch(showError);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      ws.closeAll();
    };
  }, []);

  return (
    <section>
      <p>BTC_USDT REST price: <output aria-label="REST price">{restPrice}</output></p>
      <p>BTC_USDT WebSocket price: <output aria-label="WebSocket price">{livePrice}</output></p>
      <p role="alert">{error}</p>
    </section>
  );
}

export default function App({ pageActive = true }) {
  const [running, setRunning] = useState(true);

  return (
    <main>
      <h1>BTC_USDT price</h1>
      {running && pageActive ? <Prices /> : <p>Stream stopped. WebSocket closed.</p>}
      <button type="button" onClick={() => setRunning(!running)}>
        {running ? 'Stop stream' : 'Start stream'}
      </button>
    </main>
  );
}
