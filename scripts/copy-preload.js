// Copies the preload script into the compiled Electron output.
//
// tsc only emits .ts files (allowJs is off), so ts_static/preload.js has to be copied
// separately. It lives in ts_static/ rather than public/electron/ because public/electron/
// is gitignored, which meant the preload was never committed and the sandboxed windows
// could not work from a clean clone.
//
// Kept as a plain Node script (no shell built-ins) so it works on Windows and in CI.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'ts_static', 'preload.js');
const outDir = path.join(root, 'build', 'electron');
const target = path.join(outDir, 'preload.js');

if (!fs.existsSync(source)) {
    console.error('copy-preload: missing ' + source);
    process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(source, target);
console.log('copy-preload: ' + path.relative(root, source) + ' -> ' + path.relative(root, target));
