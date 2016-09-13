import path from 'path';

let sandbox;

describe('generator-modern-mean:app', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should run without failure', () => {
    return true;
  });

});
