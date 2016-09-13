import * as indexTest from '../src/index';


let sandbox;

describe('/src/index', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });


  describe('export', () => {

    <% if (modules.api) { %>
      it('should export ApiModule class', () => {
        return indexTest.ApiModule.should.exist;
      });
    <% } %>

  });

});
