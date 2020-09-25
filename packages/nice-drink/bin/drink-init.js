
require('@babel/register')({
  cwd: __dirname,

  babelrc: false,

  only: [/.+\.ts$/],

  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],

  plugins: ['@babel/plugin-proposal-class-properties'],

  extensions: ['.ts'],

  cache: false,
});

require('./drink-init.ts');
