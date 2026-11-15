import { fileURLToPath } from 'node:url';

const browserAgent = '\0bitmart-browser-agent';
const sdkRoot = fileURLToPath(new URL('./node_modules/bitmart-api/', import.meta.url));

export default {
  // Keep the same SDK transform during development and production builds.
  optimizeDeps: {
    exclude: ['bitmart-api'],
    include: ['buffer', 'events', 'bitmart-api > isomorphic-ws'],
  },
  resolve: {
    alias: {
      events: fileURLToPath(new URL('./node_modules/events/events.js', import.meta.url)),
    },
  },
  plugins: [{
    name: 'bitmart-browser-transport',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source === 'https' && importer?.startsWith(sdkRoot)) {
        return browserAgent;
      }
    },
    // The SDK checks Buffer.isBuffer when identifying compressed frames.
    // This import does not adapt browser Blob/ArrayBuffer frames.
    transform(code, id) {
      if (id.startsWith(sdkRoot) && id.endsWith('/lib/requestUtils.js')) {
        return { code: "import { Buffer } from 'buffer';\n" + code, map: null };
      }
    },
    load(id) {
      if (id === browserAgent) {
        // Browsers manage connections themselves. Reject an unsupported option
        // rather than presenting a Node Agent as a working browser transport.
        return `export class Agent {
  constructor() {
    throw new Error('keepAlive and HTTPS agents are Node.js-only. Omit keepAlive in a browser.');
  }
}
export default { Agent };`;
      }
    },
  }],
};
