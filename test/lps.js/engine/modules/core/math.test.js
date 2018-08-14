const coreModule = lpsRequire('engine/modules/core');
const Functor = lpsRequire('engine/Functor');
const Value = lpsRequire('engine/Value');
const Variable = lpsRequire('engine/Variable');
const Program = lpsRequire('parser/Program');

const chai = require('chai');
const expect = chai.expect;

describe('coreModule', () => {
  describe('math', () => {
    describe('+/2', () => {
      let program;
      beforeEach(() => {
        program = new Program();

        // core module is loaded by Engine
        coreModule(null, program);
      });

      it('should be defined', () => {
        let functorProvider = program.getFunctorProvider();
        expect(functorProvider.has('+/2')).to.be.true;
      });

      it('should return addition correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(1),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('+', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(3);
      });

      it('should return no result for variables in argument 1', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Variable('A'),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('+', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });

      it('should return no result for variables in argument 2', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Variable('A')
        ];
        let result = functorProvider.execute(new Functor('+', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });
    });

    describe('-/2', () => {
      let program;
      beforeEach(() => {
        program = new Program();

        // core module is loaded by Engine
        coreModule(null, program);
      });

      it('should be defined', () => {
        let functorProvider = program.getFunctorProvider();
        expect(functorProvider.has('-/2')).to.be.true;
      });

      it('should return subtraction correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Value(1)
        ];
        let result = functorProvider.execute(new Functor('-', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(1);
      });

      it('should return no result for variables in argument 1', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Variable('A'),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('-', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });

      it('should return no result for variables in argument 2', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Variable('A')
        ];
        let result = functorProvider.execute(new Functor('-', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });
    });

    describe('*/2', () => {
      let program;
      beforeEach(() => {
        program = new Program();

        // core module is loaded by Engine
        coreModule(null, program);
      });

      it('should be defined', () => {
        let functorProvider = program.getFunctorProvider();
        expect(functorProvider.has('*/2')).to.be.true;
      });

      it('should return multiplication correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Value(3)
        ];
        let result = functorProvider.execute(new Functor('*', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(6);
      });

      it('should return no result for variables in argument 1', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Variable('A'),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('*', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });

      it('should return no result for variables in argument 2', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Variable('A')
        ];
        let result = functorProvider.execute(new Functor('*', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });
    });

    describe('//2', () => {
      let program;
      beforeEach(() => {
        program = new Program();

        // core module is loaded by Engine
        coreModule(null, program);
      });

      it('should be defined', () => {
        let functorProvider = program.getFunctorProvider();
        expect(functorProvider.has('//2')).to.be.true;
      });

      it('should return division correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(6),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('/', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(3);
      });

      it('should return no result for variables in argument 1', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Variable('A'),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('/', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });

      it('should return no result for variables in argument 2', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Variable('A')
        ];
        let result = functorProvider.execute(new Functor('/', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });
    });

    describe('**/2', () => {
      let program;
      beforeEach(() => {
        program = new Program();

        // core module is loaded by Engine
        coreModule(null, program);
      });

      it('should be defined', () => {
        let functorProvider = program.getFunctorProvider();
        expect(functorProvider.has('**/2')).to.be.true;
      });

      it('should return power correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(6),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('**', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(36);
      });

      it('should return no result for variables in argument 1', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Variable('A'),
          new Value(2)
        ];
        let result = functorProvider.execute(new Functor('**', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });

      it('should return no result for variables in argument 2', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(2),
          new Variable('A')
        ];
        let result = functorProvider.execute(new Functor('**', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });
    });

    describe('-/1', () => {
      let program;
      beforeEach(() => {
        program = new Program();

        // core module is loaded by Engine
        coreModule(null, program);
      });

      it('should be defined', () => {
        let functorProvider = program.getFunctorProvider();
        expect(functorProvider.has('-/1')).to.be.true;
      });

      it('should return negative number correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Value(6)
        ];
        let result = functorProvider.execute(new Functor('-', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(-6);
      });

      it('should return negative number correctly', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          Program.literal('2 + 6')
        ];
        let result = functorProvider.execute(new Functor('-', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(1);
        expect(result[0]).to.have.property('theta');
        expect(result[0].theta).to.be.an('object');
        expect(result[0].theta).to.be.empty;
        expect(result[0]).to.have.property('replacement');
        expect(result[0].replacement).to.be.an('object');
        expect(result[0].replacement).to.be.instanceof(Value);
        expect(result[0].replacement.evaluate()).to.be.equal(-8);
      });


      it('should return no result for variables in argument', () => {
        let functorProvider = program.getFunctorProvider();
        let params = [
          new Variable('A')
        ];
        let result = functorProvider.execute(new Functor('-', params));
        expect(result).to.be.an('array');
        expect(result).to.be.length(0);
      });
    });
  });
});
