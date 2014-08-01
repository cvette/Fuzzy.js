var FIS = require('./lib/fis');
var Types = require('./lib/function_types');
var ActivationMethod = require('./lib/activation_methods');
var AccumulationMethod = require('./lib/accumulation_methods');
var AndMethod = require('./lib/and_methods');
var OrMethod = require('./lib/or_methods');

var fis = new FIS(ActivationMethod.Min, AccumulationMethod.Max, AndMethod.Min, OrMethod.Max);
var service = fis.addInput('service', [0, 10]);
var food = fis.addInput('food', [0, 10]);
var tip = fis.addOutput('tip', [0, 30]);

service.addTerm('poor', Types.Gaussian, [1.5, 0]);
service.addTerm('good',   Types.Gaussian, [1.5, 5]);
service.addTerm('excellent',  Types.Gaussian, [1.5, 10]);

food.addTerm('rancid', Types.Trapezoidal, [-2, 0, 1, 3]);
food.addTerm('delicious',  Types.Trapezoidal, [7, 9, 10, 12]);

tip.addTerm('cheap', Types.Triangular, [0, 5, 10]);
tip.addTerm('average',   Types.Triangular, [10, 15, 20]);
tip.addTerm('generous',  Types.Triangular, [20, 25, 30]);

fis.createRuleBuilder().if('service').is('poor').or('food').is('rancid').then('tip', 'cheap').create();
fis.createRuleBuilder().if('service').is('good').then('tip', 'average').create();
fis.createRuleBuilder().if('service').is('excellent').or('food').is('delicious').then('tip', 'generous').create();

service.setValue(3);
food.setValue(7);

var res = fis.evaluate();

console.log(res);