var expect = require('chai').expect;
var q = require('./question');

describe('question.getNext', () => {

  it('Must return a number between max and min', () => {
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
    expect(result.q).to.be.above(200);
    expect(result.q).to.be.below(200+30+1);
  });

  it('Does not return a used question', () => {
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
