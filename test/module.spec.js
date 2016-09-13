import path from 'path';
import { npmmodule } from './config';

let sandbox;

describe('generator-modern-mean:module', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('success', () => {

    describe('with all prompts', () => {

      beforeEach(() => {

        return helpers.run(path.join(__dirname, npmmodule.src))
          .withGenerators(npmmodule.deps)
          .withPrompts(npmmodule.prompts)
          .withOptions({ nosay: true })
          .toPromise();

      });

      it('should save config file', () => {
        return assert.jsonFileContent('.yo-rc.json', npmmodule.config);
      });

      it('should create .bablerc', () => {
        return assert.file('.babelrc');
      });

      it('should create .editorconfig', () => {
        return assert.file('.editorconfig');
      });

      it('should create .eslintrc', () => {
        return assert.file('.eslintrc');
      });

      it('should create .gitignore', () => {
        return assert.file('.gitignore');
      });

      it('should create .npmignore', () => {
        return assert.file('.npmignore');
      });

      it('should create .travis.yml', () => {
        return assert.file('.travis.yml');
      });

    });

  });

});
