/*
  This file is part of the lps.js project, released open source under
  the BSD 3-Clause license. For more info, please see https://github.com/mauris/lps.js
 */

const Value = lpsRequire('engine/Value');
const Variable = lpsRequire('engine/Variable');
const Engine = lpsRequire('engine/Engine');
const Program = lpsRequire('engine/Program');
const ProgramFactory = lpsRequire('parser/ProgramFactory');

const chai = require('chai');
const expect = chai.expect;

describe('math.lps', () => {
  let engine;

  before((done) => {
    let program = new Program();
    engine = new Engine(program);
    engine.load()
      .then(() => {
        done();
      });
  });

  describe('max/3', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('max(1, 2, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(2);
    });

    it('should return correct result for variable replacement 2', () => {
      let result = engine.query(ProgramFactory.literal('max(2, 1, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(2);
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('max(2, 1, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for no result', () => {
      let result = engine.query(ProgramFactory.literal('max(2, 1, 1)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // max/3

  describe('min/3', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('min(1, 2, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(1);
    });

    it('should return correct result for variable replacement 2', () => {
      let result = engine.query(ProgramFactory.literal('min(2, 1, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(1);
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('min(2, 1, 1)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for no result', () => {
      let result = engine.query(ProgramFactory.literal('min(2, 1, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // min/3

  describe('abs/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('abs(-60, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(60);
    });

    it('should return correct result for variable replacement 2', () => {
      let result = engine.query(ProgramFactory.literal('abs(60, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(60);
    });


    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('abs(-60, 60)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for no result', () => {
      let result = engine.query(ProgramFactory.literal('abs(-60, -60)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // abs/2

  describe('sin/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('sin(60, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.sin(60));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('sin(60, ' + Math.sin(60) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('sin(60, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // sin/2

  describe('cos/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('cos(60, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.cos(60));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('cos(60, ' + Math.cos(60) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('cos(60, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // cos/2

  describe('tan/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('tan(60, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.tan(60));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('tan(60, ' + Math.tan(60) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('tan(60, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // tan/2

  describe('asin/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('asin(0, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.asin(0));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('asin(0, ' + Math.asin(0) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('asin(0, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // asin/2

  describe('acos/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('acos(1, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.acos(1));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('acos(1, ' + Math.acos(1) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('acos(1, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // acos/2

  describe('atan/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('atan(1, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.atan(1));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('atan(1, ' + Math.atan(1) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('atan(1, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // atan/2

  describe('sqrt/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('sqrt(25, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.sqrt(25));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('sqrt(25, ' + Math.sqrt(25) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('sqrt(25, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // sqrt/2

  describe('pow/3', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('pow(5, 2, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(25);
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('pow(5, 2, 25)'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('pow(5, 2, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // pow/3

  describe('mod/3', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('mod(12, 5, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(2);
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('mod(12, 5, 2)'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('mod(12, 5, 5)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // mod/3

  describe('exp/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('exp(25, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.exp(25));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('exp(25, ' + Math.exp(25) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('exp(25, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // exp/2

  describe('log/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('log(25, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.log(25));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('log(25, ' + Math.log(25) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('log(25, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // log/2

  describe('log2/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('log2(25, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.log2(25));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('log2(25, ' + Math.log2(25) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('log2(25, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // log2/2

  describe('floor/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('floor(2.6, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.floor(2.6));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('floor(2.6, ' + Math.floor(2.6) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('floor(2.6, 3)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // floor/2

  describe('ceil/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('ceil(2.6, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.ceil(2.6));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('ceil(2.6, ' + Math.ceil(2.6) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('ceil(2.6, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // ceil/2

  describe('round/2', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('round(2.6, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.round(2.6));
    });

    it('should return correct result for matching output', () => {
      let result = engine.query(ProgramFactory.literal('round(2.6, ' + Math.round(2.6) + ')'));
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('round(2.6, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // round/2

  describe('pi/1', () => {
    it('should return correct result for variable replacement', () => {
      let result = engine.query(ProgramFactory.literal('pi(A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(Math.PI);
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('pi(2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // ceil/2

  describe('succ/2', () => {
    it('should return correct result for variable replacement 1', () => {
      let result = engine.query(ProgramFactory.literal('succ(5, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(6);
    });

    it('should return correct result for variable replacement 2', () => {
      let result = engine.query(ProgramFactory.literal('succ(A, 6)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.be.instanceof(Value);
      expect(result[0].theta.A.evaluate()).to.be.equal(5);
    });

    it('should return empty array for non-match', () => {
      let result = engine.query(ProgramFactory.literal('succ(2, 5)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('should return empty array for out of domain parameters', () => {
      let result = engine.query(ProgramFactory.literal('succ(N, -5)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('should return empty array for out of domain parameters', () => {
      let result = engine.query(ProgramFactory.literal('succ(-5, N)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // succ/2

  describe('between/3', () => {
    it('should return correct result for correct parameters', () => {
      let result = engine.query(ProgramFactory.literal('between(2, 6, 4)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.be.empty;
    });

    it('should return correct result for same values', () => {
      let result = engine.query(ProgramFactory.literal('between(2, 2, 2)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);

      expect(result[0]).to.have.property('theta');
      expect(result[0].theta).to.be.empty;
    });

    it('should return correct result for high low values', () => {
      let result = engine.query(ProgramFactory.literal('between(2, 2, X)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('X');
      expect(result[0].theta.X).to.have.instanceof(Value);
      expect(result[0].theta.X.evaluate()).to.have.equal(2);
    });

    it('should return correct result for all variables', () => {
      let result = engine.query(ProgramFactory.literal('between(A, B, A)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('A');
      expect(result[0].theta.A).to.have.instanceof(Variable);
      expect(result[0].theta.A.evaluate()).to.have.equal('A');

      expect(result[0].theta).to.have.property('B');
      expect(result[0].theta.B).to.have.instanceof(Variable);
      expect(result[0].theta.B.evaluate()).to.have.equal('A');
    });

    it('should return correct result for all variables', () => {
      let result = engine.query(ProgramFactory.literal('between(X, Y, X)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('theta');

      expect(result[0].theta).to.have.property('X');
      expect(result[0].theta.X).to.have.instanceof(Variable);
      expect(result[0].theta.X.evaluate()).to.have.equal('X');

      expect(result[0].theta).to.have.property('Y');
      expect(result[0].theta.Y).to.have.instanceof(Variable);
      expect(result[0].theta.Y.evaluate()).to.have.equal('X');
    });

    it('should return empty array for incorrect high low values', () => {
      let result = engine.query(ProgramFactory.literal('between(8, 5, 6)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('should return empty array for non-grounding 1', () => {
      let result = engine.query(ProgramFactory.literal('between(A, 5, 4)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('should return empty array for non-grounding 2', () => {
      let result = engine.query(ProgramFactory.literal('between(3, A, 4)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('should return empty array for non-grounding 3', () => {
      let result = engine.query(ProgramFactory.literal('between(2, 5, B)'));

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  }); // between/3
});
