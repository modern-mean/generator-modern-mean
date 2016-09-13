export let skeleton = {
  src: '../src/generators/skeleton',
  prompts: {
    classname: 'NewModuleTest',
    extendModule: 'ExpressModule',
    tests: true
  },
  options: {
    classname: 'NewModuleTest',
    extendModule: 'ExpressModule',
    tests: true,
    nosay: true
  },
  config: {
    '@modern-mean/generator-modern-mean': {
      'skeleton': {
        'classname': 'NewModuleTest',
        'extendModule': {
          'name': 'ExpressModule',
          'module': '@modern-mean/server-express-module'
        },
        'tests': true
      }
    }
  }
};

export let npmmodule = {
  src: '../src/generators/module',
  deps: [
    [helpers.createDummyGenerator(), '@modern-mean/modern-mean:skeleton'],
    [helpers.createDummyGenerator(), 'github-create:authenticate'],
    [helpers.createDummyGenerator(), 'github-create:create'],
    [helpers.createDummyGenerator(), 'github-create:package'],
    [helpers.createDummyGenerator(), 'github-create:readme']
  ],
  prompts: {
    createrepository: true
  },
  options: {
    createrepository: false,
    nosay: false
  },
  config: {
    '@modern-mean/generator-modern-mean': {
      'module': {
        'createrepository': true
      }
    }
  }
};
