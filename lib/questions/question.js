module.exports = {
  getNext : getNext,
  evaluate: evaluate
};


// state = {
//   total:20,
//   step: 0,
//   hit: true,
//   max: 300,
//   min: 0,
//   pre: [150,143]
// };
function getNext(state){
  state.pre = sort(state.pre);

  var chunk  = getStepChunk(state);
  var newMax = state.max - ( (state.hit) ? 0 : chunk);
  var newMin = state.min + ((!state.hit) ? 0 : chunk);
  var newQ   = (newMax - newMin)/2 + newMin;
  var randQ  = Math.floor( random(chunk) - chunk/2 );

  newQ = newQ + randQ;
  for(var i=0; i<state.pre.length; i++){
    if(newQ === state.pre[i]) newQ++;
  }

  return {
    total: state.total,
    step : state.step++,
    max  : newMax,
    min  : newMin,
    q    : newQ,
    pre  : state.pre
  };

  function random(i){
    return Math.floor( Math.random()*(i+1) );
  }

  function sort(a){
    return a.sort(function(a, b){
      return a-b;
    });
  }

  function getStepChunk(state){
    var stepEqualChunkPecernt = 1/state.total;
    var stepEqualChunkCount = (state.max - state.min) * stepEqualChunkPecernt;
    return Math.floor( stepEqualChunkCount * (1+((state.total/2)-state.step)/(state.total-1)) );
  }
}

// question = {
//   score: int(0...1)
// }
function evaluate(question, userScore, hit){
  var difference = (userScore-question.score+1)/2;
  difference = (hit) ?  question.score    * (1-difference) / 5
                     : (question.score-1) * difference     / 5;
  question.score = question.score - difference;
  return question;
}
