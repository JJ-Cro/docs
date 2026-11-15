# HTX: React Native / Expo

Read public market prices with `@siebly/htx-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm start
```

Use an Expo Go version that supports the Expo SDK in `package.json`. Press **i** for an iOS simulator or **a** for an Android emulator. iOS simulators require macOS and Xcode. Keep Expo Go in the foreground.

Use **Stop stream** to close the price subscription.

Public WebSocket streams require DecompressionStream support. The Expo recipe does not polyfill it; verify your target runtime or relay market data through a backend. Browser REST access depends on HTX CORS policy. Keep credentials and trading operations on your server.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/htx/environments/expo.html).
