import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { create } from 'tar';
import ts from 'typescript';
import { root, catalogue } from './context.mjs';
import { checkPublic } from './check-public.mjs';
import { generateEnvironments, environments, environmentFiles, checkStarter } from './environments.mjs';

function checkProgram(name, content, files) {
  const kind = /\.[cm]?ts$/.test(name) ? ts.ScriptKind.TS : ts.ScriptKind.JSX;
  const parsed = ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true, kind);
  assert.equal(parsed.parseDiagnostics.length, 0, `Invalid program: ${name}`);
  for (const [, target] of content.matchAll(/(?:from\s*|require\()['"]([^'"]+)['"]/g)) {
    if (!target.startsWith('.')) continue;
    const relative = path.posix.normalize(path.posix.join(path.posix.dirname(name), target));
    assert(files.has(relative) || files.has(`${relative}.js`), `Missing local import: ${name} -> ${target}`);
  }
}

test('generated guides match the starter programs and publish valid archives', async () => {
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const work = await mkdtemp(path.join(root, 'tmp/environment-test-'));
  try {
    const publicRoot = path.join(work, 'public');
    const manifest = { sdks: {}, releases: {} };
    const sdks = await catalogue();
    for (const sdk of sdks) {
      const projectRoot = path.join(work, sdk.id);
      const docs = path.join(projectRoot, 'docs');
      await generateEnvironments({ id: sdk.id, sdk, docs, projectRoot });
      await cp(path.join(docs, 'public/starters'), path.join(publicRoot, sdk.id, 'starters'), { recursive: true });
      manifest.sdks[sdk.id] = manifest.releases[sdk.id] = { version: '1.0.0' };
      for (const environment of environments) {
        const files = await environmentFiles(sdk.id, sdk, environment);
        const guide = await readFile(path.join(docs, 'environments', `${environment}.md`), 'utf8');
        assert(!/@@[A-Z_]+@@/.test(guide));
        assert(guide.includes(`https://github.com/sieblyio/docs/tree/main/starters/${sdk.id}/${environment}`));
        const automaticPackage = ['node', 'typescript', 'bun'].includes(environment);
        for (const [name, content] of files) {
          if (!(name === 'package.json' && automaticPackage)) {
            assert(guide.includes(content.trimEnd()), `Walkthrough differs from source: ${sdk.id}/${environment}/${name}`);
          }
          if (/\.(?:[cm]?js|jsx|[cm]?ts)$/.test(name)) checkProgram(name, content, files);
        }
      }
    }
    await writeFile(path.join(publicRoot, 'build-manifest.json'), JSON.stringify(manifest));
    await writeFile(path.join(publicRoot, '.nojekyll'), '');
    await checkPublic(publicRoot);
    await cp(path.join(publicRoot, 'bybit/starters/node.tar.gz'), path.join(publicRoot, 'bybit/starters/unexpected.tar.gz'));
    await assert.rejects(checkPublic(publicRoot), /Unexpected public archive/);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});

test('starter archives reject extra, changed and missing files', async () => {
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const work = await mkdtemp(path.join(root, 'tmp/starter-guard-'));
  const archive = path.join(work, 'starter.tar.gz');
  const expected = new Map([['package.json', '{"private":true}\n'], ['price.mjs', 'console.log("price");\n']]);
  try {
    for (const [name, content] of expected) await writeFile(path.join(work, name), content);
    await create({ file: archive, cwd: work, gzip: true }, [...expected.keys()]);
    await checkStarter(archive, expected);
    await writeFile(path.join(work, '.env'), 'SECRET=private\n');
    await create({ file: archive, cwd: work, gzip: true }, [...expected.keys(), '.env']);
    await assert.rejects(checkStarter(archive, expected), /Unexpected starter entry: .env/);
    await create({ file: archive, cwd: work, gzip: true }, ['package.json']);
    await assert.rejects(checkStarter(archive, expected), /missing required files/);
    await writeFile(path.join(work, 'price.mjs'), 'console.log("changed");\n');
    await create({ file: archive, cwd: work, gzip: true }, [...expected.keys()]);
    await assert.rejects(checkStarter(archive, expected), /content differs/);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});

test('BitMart recipes preserve public Spot V3 reads, topic and credential boundaries', async () => {
  const sdk = { name: 'BitMart', packageName: 'bitmart-api' };
  const node = await environmentFiles('bitmart', sdk, 'node');
  assert.match(node.get('price.mjs'), /getSpotTickerV3\(\{ symbol: 'BTC_USDT' \}\)/);
  assert.match(node.get('price.mjs'), /response\.data\.last/);
  assert.match(node.get('stream.mjs'), /Promise\.all\(ws\.subscribe\('spot\/ticker:BTC_USDT', 'spot'\)\)/);
  assert.match(node.get('stream.mjs'), /message\.table !== 'spot\/ticker'/);
  assert.match(node.get('stream.mjs'), /last_price/);
  assert.match(node.get('stream.mjs'), /SIGINT/);
  for (const environment of environments) {
    const files = await environmentFiles('bitmart', sdk, environment);
    for (const [name, source] of files) {
      if (name === 'src/order.js') continue;
      assert.doesNotMatch(source, /apiKey:|apiSecret:|apiMemo:|submitSpotOrder/);
    }
  }
  const browser = await environmentFiles('bitmart', sdk, 'vite');
  assert.equal(JSON.parse(browser.get('package.json')).dependencies.buffer, '6.0.3');
  assert.match(browser.get('vite.config.js'), /requestUtils\.js/);
  assert.match(browser.get('vite.config.js'), /import \{ Buffer \} from 'buffer'/);
  const native = await environmentFiles('bitmart', sdk, 'expo');
  assert.match(native.get('App.js'), /globalThis\.Buffer \?\?= Buffer/);
  const worker = await environmentFiles('bitmart', sdk, 'cloudflare-workers');
  assert.match(worker.get('src/order.js'), /apiMemo: env\.BITMART_API_MEMO/);
  assert.match(worker.get('src/order.js'), /submitSpotOrderV2/);
  assert.match(worker.get('src/order.js'), /type: 'limit_maker'/);
  assert.match(worker.get('src/order.js'), /size: quantity/);
  assert.doesNotMatch(worker.get('src/order.js'), /demoTrading|testnet/);
});

test('BitMart live adapter only reads public ticker and subscribes to the selected Spot symbol', async () => {
  const adapter = await import('../compatibility/adapters/bitmart.mjs');
  assert.equal(await adapter.read({ getSpotTickerV3: async params => {
    assert.deepEqual(params, { symbol: 'BTC_USDT' });
    return { data: { last: '65000' } };
  } }), '65000');
  let subscribed = false;
  await adapter.subscribe({ subscribe: (topic, market) => {
    assert.equal(topic, 'spot/ticker:BTC_USDT');
    assert.equal(market, 'spot');
    subscribed = true;
    return [Promise.resolve()];
  } });
  assert(subscribed);
  assert.equal(adapter.value({ table: 'spot/ticker', data: [{ symbol: 'BTC_USDT', last_price: '65000' }] }), '65000');
  assert.equal(adapter.value({ table: 'spot/ticker', data: [{ symbol: 'ETH_USDT', last_price: '3000' }] }), undefined);
  assert.equal(adapter.value({ event: 'subscribe' }), undefined);
});

test('BitMart browser and native guides expose binary-frame limits without claiming working streams', async () => {
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const projectRoot = await mkdtemp(path.join(root, 'tmp/bitmart-guide-'));
  try {
    const docs = path.join(projectRoot, 'docs');
    await generateEnvironments({ id: 'bitmart', sdk: { name: 'BitMart', packageName: 'bitmart-api' }, docs, projectRoot });
    for (const environment of ['react', 'vite', 'expo']) {
      const guide = await readFile(path.join(docs, 'environments', `${environment}.md`), 'utf8');
      assert.match(guide, /not a verified live stream/);
      assert.match(guide, /Blob or ArrayBuffer/);
      assert.match(guide, /DecompressionStream\("deflate-raw"\)/);
      assert.match(guide, /forward prices to your UI/);
      assert.doesNotMatch(guide, /Both price fields should|each followed by a positive price/);
      assert(!guide.includes('@@'));
    }
  } finally {
    await rm(projectRoot, { recursive: true, force: true });
  }
});
