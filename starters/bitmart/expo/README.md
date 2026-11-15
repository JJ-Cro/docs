# BitMart: React Native / Expo

Read public market prices with `bitmart-api`. No API key is required for public prices.

Use Node.js 24 and npm.

This is a setup recipe, not live runtime verification. SDK 2.5.1 recognizes compressed frames only as Buffer data; these examples do not adapt browser/native Blob or ArrayBuffer frames. Buffer support alone does not fix this. Decompression also requires DecompressionStream with deflate-raw, Response and Web Streams. Run the Node.js stream on your server and forward prices to the UI if needed. Browser REST depends on CORS.

## Run

From this folder:

```sh
npm install
npm start
```

Use an Expo Go version that supports the Expo SDK in `package.json`. Press **i** for an iOS simulator or **a** for an Android emulator. iOS simulators require macOS and Xcode. Keep Expo Go in the foreground.

Use **Stop stream** to close the price subscription.

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitmart/environments/expo.html).
