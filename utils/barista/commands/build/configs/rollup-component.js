const postcss = require('rollup-plugin-postcss');
const postcssModules = require('postcss-modules');
const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const bundleSize = require('rollup-plugin-bundle-size');
const babelConfig = require('./babel.config');

const reactExports = [
  'Children',
  'Component',
  'PureComponent',
  'PropTypes',
  'createElement',
  'Fragment',
  'cloneElement',
  'StrictMode',
  'createFactory',
  'createRef',
  'createContext',
  'isValidElement',
  'isValidElementType',
];

const cssExportMap = {};

module.exports = function (name, config) {
  const { typescript: ts, rollup_patcher } = config;
  const plugins = [
    resolve(),
    ...(ts ? [typescript()] : []),
    ...(!ts ? [babelConfig('component')] : []),
    postcss({
      plugins: [
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExportNamed: false,
      getExport (id) {
        return cssExportMap[id];
      },
      extract: 'lib/styles.css'
    }),
    commonjs({
      include: [
        /node_modules/
      ],
      namedExports: {
        'react/index.js': reactExports
      }
    }),
    terser(),
    bundleSize()
  ]

  const inputFile = ts ? 'index.tsx' : 'index.js';
  const inputPath = 'src/' + inputFile;

  const patcher = typeof rollup_patcher === 'function'
    ? rollup_patcher
    : x => x;

  return patcher({
    input: inputPath,
    plugins
  });
};
