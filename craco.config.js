// Adds a second webpack entry (the overlay) to the standard react-scripts build.
//
// react-scripts builds ONE page (`main` -> build/index.html, from public/index.html) and
// constructs its HTML plugins against the HtmlWebpackPlugin *class*, so they apply to every
// instance. Adding a second page therefore needs three things here:
//
//   1. a second entry, `renderer` (src/overlay.tsx), without renaming `main` (CRA's
//      asset-manifest generator hardcodes `entrypoints.main`);
//   2. a second HtmlWebpackPlugin for public/renderer.html, scoped with `chunks` so the two
//      pages do not inject each other's bundles or CSS;
//   3. ModuleScopePlugin + babel-loader widened to also cover ts_static, which the overlay
//      entry imports from outside src/.
//
// CRA's InterpolateHtmlPlugin and WebpackManifestPlugin keep working unchanged; they hook
// HtmlWebpackPlugin itself, not a specific instance/page.
const path = require('path');

const APP_SRC_DIR = path.resolve(__dirname, 'src');
const TS_STATIC_DIR = path.resolve(__dirname, 'ts_static');

// webpack `include` accepts a string, an array, a RegExp or a predicate. Extend whichever form
// react-scripts used so ts_static is compiled by the same babel rule as src/.
function alsoIncludeTsStatic(include) {
    if (Array.isArray(include)) {
        return include.includes(TS_STATIC_DIR) ? include : [...include, TS_STATIC_DIR];
    }
    if (typeof include === 'function') {
        return (resource) => resource.startsWith(TS_STATIC_DIR) || include(resource);
    }
    return [include, TS_STATIC_DIR];
}

// react-scripts sets `entry: paths.appIndexJs`, a BARE STRING which webpack names "main".
// Keep that name; only convert to a map when adding the second entry.
function withRendererEntry(entry) {
    const renderer = ['./src/overlay.tsx'];
    if (typeof entry === 'string') return { main: [entry], renderer };
    if (Array.isArray(entry)) return { main: entry, renderer };
    return { ...entry, renderer };
}

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.entry = withRendererEntry(webpackConfig.entry);

            const pages = [
                { entry: 'main', filename: 'index.html' },
                { entry: 'renderer', filename: 'renderer.html' },
            ];

            pages.forEach(({ entry, filename }) => {
                // CRA does not pass `filename` at all, so its instance defaults to index.html
                // and userOptions.filename is undefined.
                const existing = (webpackConfig.plugins || []).find((p) => {
                    const filenameOption = p && p.userOptions && p.userOptions.filename;
                    return filename === 'index.html'
                        ? filenameOption === undefined || filenameOption === 'index.html'
                        : filenameOption === filename;
                });

                if (existing) {
                    // index.html: restrict to its own entry, otherwise it also picks up the
                    // renderer bundle and stylesheet (they share the same CSS chunking).
                    // html-webpack-plugin snapshots its merged options at construction time
                    // (this.options = Object.assign(defaults, userOptions)), so both the
                    // user options and the live `options` object must be updated.
                    existing.userOptions.chunks = [entry];
                    if (existing.options) {
                        existing.options.chunks = [entry];
                    }
                    return;
                }

                // renderer.html: a second page, scoped to the renderer entry only.
                // Injection is left ON so the hashed script/style URLs get written in;
                // public/renderer.html only supplies the markup and the <video> element.
                const HtmlWebpackPlugin = require('html-webpack-plugin');
                const page = new HtmlWebpackPlugin({
                    filename,
                    template: path.resolve(__dirname, 'public', filename),
                    chunks: [entry],
                    inject: true,
                });

                // InterpolateHtmlPlugin / InlineChunkHtmlPlugin watch the HtmlWebpackPlugin
                // class, not one instance, so ordering only matters for readability.
                webpackConfig.plugins = [...(webpackConfig.plugins || []), page];
            });

            // CRA's app babel rule is `include: paths.appSrc`, so ts_static sources reached from
            // src/overlay.tsx would otherwise be handed to webpack as plain JS ("Unexpected
            // token" on TypeScript syntax). Widen that one rule, reusing its options as-is.
            ((webpackConfig.module && webpackConfig.module.rules) || [])
                .flatMap((rule) => (rule && rule.oneOf) || [])
                .forEach((rule) => {
                    const include = rule && rule.include;
                    const targetsAppSrc =
                        include === APP_SRC_DIR ||
                        (Array.isArray(include) && include.includes(APP_SRC_DIR));
                    if (targetsAppSrc) {
                        rule.include = alsoIncludeTsStatic(include);
                    }
                });

            // src/overlay.tsx imports ../ts_static/renderer, which lives outside src/.
            // ModuleScopePlugin only inspects imports issued *from* src/, so allowing
            // ts_static re-opens exactly that hop and nothing else.
            // NB: it is registered under resolve.plugins, not plugins.
            ((webpackConfig.resolve && webpackConfig.resolve.plugins) || []).forEach((plugin) => {
                if (plugin && Array.isArray(plugin.allowedPaths) && !plugin.allowedPaths.includes(TS_STATIC_DIR)) {
                    plugin.allowedPaths.push(TS_STATIC_DIR);
                }
            });

            return webpackConfig;
        },
    },
};
