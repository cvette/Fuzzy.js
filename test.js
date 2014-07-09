var fis = require('./lib/fis')();
var Types = require('./lib/function_types');


var test1 = fis.addInput('test1', [0, 10]);

test1.addTerm('good', Types.Gaussian, [2, 5]);
test1.addTerm('ok', Types.Triangular, [3, 6, 8]);
console.log(test1.addTerm('bad', Types.GeneralizedBell, [2, 4, 6]).evaluate(8).toFixed(2));
