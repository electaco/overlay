// Webpack entry for the overlay window (build/renderer.html).
//
// The overlay used to be loaded as CommonJS straight from renderer.html
// (`require('./electron/ts_static/renderer')`), which forced the overlay window to run
// with nodeIntegration: true. It is now a normal webpack bundle, so the window can run
// sandboxed with contextIsolation and talk to main only through the preload bridge.
//
// Deliberately NOT importing './index': that mounts the React UI into #root, which
// renderer.html does not have (React would throw "Target container is not a DOM element"
// and abort this module before the overlay ever started).

import 'reflect-metadata';

// The renderer module starts itself on import (it constructs RenderManager at module scope).
import '../ts_static/renderer';
