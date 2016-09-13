import path from 'path';
import { skeleton } from './config';

let sandbox;

describe('generator-modern-mean:skeleton', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('success', () => {

    describe('options', () => {

      beforeEach(() => {

        return helpers.run(path.join(__dirname, skeleton.src))
          .withOptions(skeleton.options)
          .toPromise();

      });

      it('should save config file', () => {
        return assert.jsonFileContent('.yo-rc.json', skeleton.config);
      });

    });

    describe('with all prompts', () => {

      beforeEach(() => {

        return helpers.run(path.join(__dirname, skeleton.src))
          .withPrompts(skeleton.prompts)
          .withOptions({ nosay: true })
          .toPromise();

      });

      it('should save config file', () => {
        return assert.jsonFileContent('.yo-rc.json', skeleton.config);
      });

      it('should create src files', () => {
        return assert.file(['src/module.js', 'src/config.js', 'src/logger.js', 'src/index.js']);
      });

      describe('src/module.js', () => {

        it('should contain import of extended module', () => {
          return assert.fileContent('src/module.js', `import { ${skeleton.prompts.extendModule} } from \'${skeleton.config['@modern-mean/generator-modern-mean'].skeleton.extendModule.module}\';`);
        });

        it('should contain class declaration', () => {
          return assert.fileContent('src/module.js', `export class ${skeleton.prompts.classname} extends ${skeleton.prompts.extendModule} {`);
        });

      });

      describe('src/config.js', () => {

        it('should contain injected module config environment variable', () => {
          return assert.fileContent('src/config.js', `process.env.${skeleton.prompts.classname.toUpperCase()}_TEST`);
        });

      });

      describe('src/logger.js', () => {

        it('should contain injected module logger environment variables', () => {
          return assert.fileContent('src/logger.js', `process.env.${skeleton.prompts.classname.toUpperCase()}_LOG_LEVEL`);
        });

      });


      it('should create test files', () => {
        return assert.file(['test/index.spec.js', 'test/mocha.opts', 'test/mocha.setup.js', 'test/module.spec.js']);
      });

      describe('test/index.spec.js', () => {

        it('should contain injected module test', () => {
          return assert.fileContent('test/index.spec.js', `return indexTest.${skeleton.prompts.classname}.should.exist;`);
        });

      });

    });

  });

  describe('without tests', () => {

    beforeEach(() => {
      let prompts = skeleton.prompts;
      prompts.tests = false;
      return helpers.run(path.join(__dirname, skeleton.src))
        .withPrompts(skeleton.prompts)
        .withOptions({ nosay: true })
        .toPromise();

    });

    it('should not create test files', () => {
      return assert.noFile(['test/index.spec.js', 'test/mocha.opts', 'test/mocha.setup.js', 'test/module.spec.js']);
    });

  });



});
