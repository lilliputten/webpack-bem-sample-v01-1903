/* global __dirname */

/*{{{ Requirements... */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');
// const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const ip = require('ip');

/*}}}*/

/*{{{ Paths... */

const rootPath = path.resolve(__dirname);
const htmlPath = path.resolve(__dirname, 'html');
const buildPath = path.resolve(__dirname, 'build');
// const fakePath = path.resolve(__dirname, 'fake'); // Debug-time data stubs
// const imgPath = path.resolve(__dirname, 'img');

/*}}}*/

module.exports = (env, argv) => {

  /*{{{ Determine webpack/dev-server modes... */
  const myIP = ip.address();
  const mode = argv.mode || 'production';
  const isDevServer = !!argv.host; // (mode === 'none'); // (none = server) // Alternate method: !!argv.host;
  const cssHotReload = isDevServer; // Hot reload css for dev-server
  const isStats = !!argv.profile;
  const isWatch = !!argv.watch;
  const isDev = (/* isDevServer || */ mode === 'development');
  const isProd = !isDev; // mode === 'production';
  const useDevTool = true && (isDev || isDevServer); // Need server restart
  // @see https://webpack.js.org/configuration/devtool/
  const devToolMode = 'eval-source-map';
  // const devToolMode = 'source-map';
  const minimizeBundles = false && isProd; // To minimize production bundles
  // Stats waiting only json on output...
  if (!isStats) {
    const debugModes = [
      // mode,
      // 'ip:' + myIP,
      isDevServer && 'DevServer',
      isWatch && 'Watch',
      isDev && 'Development',
      isProd && 'Production',
      useDevTool && 'DevTool',
      minimizeBundles && 'minmize',
    ].filter(x => x).join(', ');
    !isStats && console.log('Running with:', debugModes);
  }
  /*}}}*/

  /*{{{ Basic params */

  const useHashes = false; // NOTE: Not works with pseudo-dynamic bundles loading method (with hardcoded urls)
  const bundleName = ({ ext, name, dir }={}) => (dir || 'js/') + (name || '[name]') + (useHashes && !isWatch && !isDevServer ? '-[contenthash:8]' : '') + (ext || '.js');

  const htmlFilename = 'index.html';
  const htmlTemplateFile = './html/' + htmlFilename;

  const mirrorStaticFolders = false; // NOTE: Mirror static folders structure (eg: `.../bootstrap/distr/...`)
  const staticFolderUrl = '/static';

  /** postcssPlugins ** {{{ */
  const postcssPlugins = [
    require('postcss-flexbugs-fixes'),
    require('postcss-import'),
    require('postcss-mixins')({
      // mixinsDir: path.join(srcPath, 'components', '!mixins'),
    }), // https://github.com/postcss/postcss-mixins
    require('postcss-advanced-variables')({ // https://github.com/jonathantneal/postcss-advanced-variables
      // unresolved: 'warn', // 'ignore',
      // variables: configCss,
    }),
    require('postcss-simple-vars'), // https://github.com/postcss/postcss-simple-vars
    require('postcss-color-function'), // https://github.com/postcss/postcss-color-function
    require('postcss-calc')(),
    require('postcss-nested-ancestors'), // https://github.com/toomuchdesign/postcss-nested-ancestors
    require('postcss-nested'),
    require('postcss-url')({ url: 'rebase' }),
    require('autoprefixer')({
      // TODO 2019.02.28, 21:05 -- Actual browsers list&
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
      flexbox: 'no-2009',
    }),
    minimizeBundles && require('postcss-csso'),
    require('postcss-reporter'),
  ].filter(x => x);/*}}}*/

  /*}}}*/

  return {
    mode, // Depends on command line options
    devtool: useDevTool && devToolMode,
    /*{{{*/performance: {
      hints: false,
    },/*}}}*/

    /*{{{*/entry: {
      'main': './src/main.js',
      // TODO: Use vendor chunks from separated list
      // 'hardware-vendors-hp': './src/hardware-vendors/hp/hp.js',
      // 'hardware-vendors-xerox': './src/hardware-vendors/xerox/xerox.js',
    },/*}}}*/

    /*{{{*/output: {
      path: buildPath,
      filename: bundleName(), // 'js/bundle.js',
    },/*}}}*/
    /*{{{*/devServer: {
      contentBase: buildPath,
      index: htmlFilename,
      watchContentBase: true,
      // compress: true,
      port: 8080,
    },/*}}}*/

    /*{{{*/module: { rules: [
      /*{{{ js */{
        test: /\.(js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // sourceRoot: '/',
          retainLines: true,
          cacheDirectory: true,
        },
      },/*}}}*/
      /*{{{ bemhtml */{
        test: /\.(bemhtml)?$/,
        exclude: /node_modules/,
        loader: path.resolve('./src/lib/Bem/BEMHTML/bemhtml-loader'),
      },/*}}}*/
      /*{{{ css/postcss */{
        test: /\.(pcss|css)$/,
        // exclude: /node_modules/, // Some imports may be from `node_modules/...`
        use: [
          cssHotReload ? 'style-loader' : ExtractCssPlugin.loader, // Hot styles realoading for dev-server
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              parser: require('postcss-scss'),
              plugins: () => postcssPlugins,
            },
          },
        ],
      },/*}}}*/
      /*{{{ resources */{
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          // // Simple name (plain folder)
          // name: (isDevServer || isDevServer) ? '[path][name].[ext]' : staticFolderUrl + '/[name]-[contenthash:8].[ext]',
          /*{{{ Mirroring static files folders */
          name: (file) => {
            let name = file;
            if (isDevServer || isDev) {
              name = '[path][name].[ext]';
            }
            else if (mirrorStaticFolders) {
              if (name.startsWith(rootPath)) {
                name = name.substr(rootPath.length);
              }
              name = staticFolderUrl + name
                .replace(/\\/g, '/')
                // .replace(/^\//, '')
                .replace(/^\/node_modules/, '')
                .replace(/([^/]+)$/, '[name]-[contenthash:8].[ext]')
              ;
            }
            else {
              name = staticFolderUrl + '/[name]-[contenthash:8].[ext]';
            }
            return name;
          },/*}}}*/
        },
      },/*}}}*/
    ]},/*}}}*/
    /*{{{*/plugins: [
      /** CleanWebpackPlugin ** {{{ Cleanup before build */
      !isDevServer && !isStats && new CleanWebpackPlugin(
        [
          path.join(buildPath, '**/*'),
        ],
        {
          exclude: ['.gitkeep'],
          verbose: true,
          beforeEmit: true,
          // dry: false,
        }
      ),/*}}}*/
      /** DefinePlugin ** {{{ Pass constants to source code */
      new webpack.DefinePlugin({
        'process.env': {
          isDevServer: JSON.stringify(isDevServer),
          isDev: JSON.stringify(isDev),
          isProd: JSON.stringify(isProd),
          isWatch: JSON.stringify(isWatch),
          ip: JSON.stringify(myIP),
        },
      }),/*}}}*/
      /** HtmlWebPackPlugin ** {{{ Process html entrypoint
       */
      new HtmlWebPackPlugin({
        inject: true,
        template: htmlTemplateFile,
        filename: htmlFilename,
        excludeChunks: [
          // 'hardware-vendors-hp',
          // 'hardware-vendors-xerox',
        ],
      }),/*}}}*/
      /** CopyWebpackPlugin ** {{{ Simply copies the files over
       */
      new CopyWebpackPlugin(
        [
          // /* isDevServer && */ { from: fakePath, to: './fake/' }, // Dev-server-only data stubs
          { from: htmlPath},
          // { from: imgPath, to: './img/' },
        ],
        {
          ignore: [
            '**/*{.tmp,.sw?}', // Temp files
            '**/*{_,~}', // Misc backup files
          ],
        }
      ),/*}}}*/
      /** ExtractCssPlugin ** {{{ Extract css */
      // Hot styles realoading for dev-server
      !cssHotReload && new ExtractCssPlugin({
        filename: bundleName({ ext: '.css', dir: 'css/' }),
      }),/*}}}*/
      // new AsyncChunkNames(), // NOTE: Not used awhile due to problems on terminals (hp)
      new webpack.NoEmitOnErrorsPlugin(), // Avoid publishing files when compilation fails

    ].filter(x => x),/*}}}*/

    /** optimization ** {{{ */
    optimization: {
      minimize: minimizeBundles,
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js$/i,
          // parallel: 8,
          sourceMap: true,
          uglifyOptions: {
            output: {
              comments: false,
              ie8: true
            },
            // https://github.com/mishoo/UglifyJS2#compress-options
            compress: {
              drop_debugger: false,
              // screw_ie8: true,
              // sequences: true,
              // booleans: true,
              // loops: true,
              // unused: true,
              // warnings: false,
              // drop_console: true,
              // unsafe: true
            },
            // beautify: false,
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          // chunks: 'all',
          // minSize: 0,
          // maxSize: 0,
          // minChunks: 1,
          // maxAsyncRequests: 5,
          // maxInitialRequests: 3,
          // automaticNameDelimiter: '-',
          // name: true,
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },/*}}}*/

    /*{{{*/stats: {
      // Nice colored output
      colors: true,
    },/*}}}*/
    /*{{{*/resolve: {
      extensions: ['.js'],
    },/*}}}*/
  };
};
