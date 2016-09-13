export let app = {
  scripts: {
    'coverage': 'nyc report --reporter=text-lcov | coveralls',
    'build': 'rm -rf ./dist && babel --out-dir ./dist --copy-files ./src',
    'build:watch': 'rm -rf ./dist && babel --out-dir ./dist --copy-files --watch ./src',
    'lint': 'eslint ./test/**/*.js ./src/**/*.js',
    'postversion': 'git push && git push --tags && npm publish --access public',
    'test': 'npm run lint && cross-env NODE_ENV=test nyc mocha test/*.spec.js',
    'test:watch': 'npm run lint && cross-env NODE_ENV=test nyc mocha --watch test/**/*.spec.js',
    'start:dev': 'cross-env NODE_ENV=development nodemon'
  },
  devDependencies: [
    'nodemon',
    'babel-core',
    'babel-cli',
    'babel-plugin-istanbul',
    'babel-preset-es2015-node6',
    'chai',
    'chai-as-promised',
    'coveralls',
    'cross-env',
    'eslint',
    'mocha',
    'nyc',
    'sinon',
    'sinon-as-promised',
    'sinon-chai'
  ],
  dependencies: ['forever', 'chalk']
};


export let moduleScripts = {
  'coverage': 'nyc report --reporter=text-lcov | coveralls',
  'build': 'rm -rf ./dist && babel --out-dir ./dist --copy-files ./src',
  'build:watch': 'rm -rf ./dist && babel --out-dir ./dist --copy-files --watch ./src',
  'lint': 'eslint ./test/**/*.js ./src/**/*.js',
  'postversion': 'git push && git push --tags && npm publish --access public',
  'release:patch': 'npm test && npm run build && npm version patch',
  'release:minor': 'npm test && npm run build && npm version minor',
  'release:major': 'npm test && npm run build && npm version major',
  'release:quick': 'npm test && npm run build && git add -A && git commit -m "Quick Release Patch" && npm version patch',
  'test': 'npm run lint && cross-env NODE_ENV=test nyc mocha test/*.spec.js',
  'test:watch': 'npm run lint && cross-env NODE_ENV=test nyc mocha --watch test/**/*.spec.js'
};

export let nycConfig = {
  'sourceMap': false,
  'instrument': false,
  'reporter': [
    'lcov',
    'text',
    'text-summary'
  ],
  'include': [
    'src/**/*.js'
  ],
  'exclude': [
    'tests/**/*'
  ],
  'all': true
};

export let devDependencies = [
  'babel-core',
  'babel-cli',
  'babel-plugin-istanbul',
  'babel-preset-es2015-node6',
  'chai',
  'chai-as-promised',
  'coveralls',
  'cross-env',
  'eslint',
  'mocha',
  'nyc',
  'sinon',
  'sinon-as-promised',
  'sinon-chai'
];
