import { <%= classname %> } from '../src/module';


let sandbox,
  moduleTest;

describe('/src/module', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return moduleTest = new <%= classname %>();
  });

  afterEach(() => {
    return sandbox.restore();
  });


  describe('constructor', () => {

    it('should be an object', () => {
      return moduleTest.should.be.an('object');
    });

    it('should be instance of <%= classname %>', () => {
      return expect(moduleTest instanceof <%= classname %>).to.equal(true);
    });

  });

  describe('get', () => {

    it('should return itself', () => {
      return expect(moduleTest.get() instanceof <%= classname %>).equal(true);
    });

  });

});
