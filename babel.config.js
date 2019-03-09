module.exports = {
  presets: [
    '@babel/preset-env',
    // '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [ 'module-resolver', { // https://github.com/tleunen/babel-plugin-module-resolver
      root: [ './src' ],
      alias: {
        lib: [ './src/lib' ],
        blocks: [ './src/blocks' ],
        // test: './test',
        // underscore: 'lodash',
      },
    }],
    'directory-resolver', // https://github.com/mgcrea/babel-plugin-directory-resolver
    // '@babel/plugin-syntax-dynamic-import', // webpack dynamic import
    // 'es6-promise', // webpack dynamic import requirements
  ],
};
