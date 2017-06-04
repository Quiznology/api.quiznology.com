var expect = require('chai').expect;
var q = require('./question');

describe('question', () => {

  describe('.getNext', () => {

    it('must return a number between max and min', () => {
      const state = {
        total: 20,
        step : 0,
        hit  : true,
        max  : 400,
        min  : 0,
        pre  : [150,143]
      };

      const result = q.getNext(state);

      expect(result.max).to.be.equal(400);
      expect(result.min).to.be.equal(30);
      expect(result.q).to.be.above(199);
      expect(result.q).to.be.below(200+30+1);
    });

    it('does not return a used question', () => {
      const state = {
        total: 20,
        step : 0,
        hit  : true,
        max  : 400,
        min  : 0,
        pre  : []
      };

      for (var i=0; i<32; i++){
        state.pre.push(200+i);
      }

      const result = q.getNext(state);

      expect(result.max).to.be.equal(400);
      expect(result.min).to.be.equal(30);
      expect(result.q).to.be.equal(232);
    });

    it('must return a narrower result', () => {
      const state = {
        total: 20,
        step : 14,
        hit  : false,
        max  : 224,
        min  : 150,
        pre  : []
      };

      for (var i=0; i<32; i++){
        state.pre.push(200+i);
      }

      const result = q.getNext(state);

      expect(result.max).to.be.equal(222);
      expect(result.min).to.be.equal(150);
      expect(result.q).to.be.above(172);
      expect(result.q).to.be.below(200+15+1);
    });
  });

  describe('.evaluateDifficulty', () => {

    function test(questionScoe, userScore, hit, expected){
      return () => {
        var question  = {score: questionScoe };
        var result = q.evaluate(question, userScore, hit);
        expect(result.score).to.be.equal(expected);
      };
    }

    describe('on hit', () => {
      it('must increate from 0,50 to 0,4500 for a user with score 0,50', test(0.50, 0.50, true, 0.4500) );
      it('must increate from 0,50 to 0,4375 for a user with score 0,25', test(0.50, 0.25, true, 0.4375) );
      it('must increate from 0,90 to 0,7380 for a user with score 0,10', test(0.90, 0.10, true, 0.7380) );
      it('must increate from 0,10 to 0,0980 for a user with score 0,90', test(0.10, 0.90, true, 0.0980) );
    });

    describe('on fail', () => {
      it('must decreate from 0,50 to 0,5500 for a user with score 0,50', test(0.50, 0.50, false, 0.5500) );
      it('must decreate from 0,50 to 0,5375 for a user with score 0,25', test(0.50, 0.25, false, 0.5375) );
      it('must decreate from 0,90 to 0,9020 for a user with score 0,10', test(0.90, 0.10, false, 0.9020) );
      it('must decreate from 0,10 to 0,2620 for a user with score 0,90', test(0.10, 0.90, false, 0.2620) );
    });

  });

});
