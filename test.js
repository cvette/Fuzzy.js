var FIS = require('./lib/fis');
var Types = require('./lib/function_types');
var ActivationMethod = require('./lib/activation_methods');
var AccumulationMethod = require('./lib/accumulation_methods');
var AndMethod = require('./lib/activation_methods');
var OrMethod = require('./lib/activation_methods');

var fis = new FIS(ActivationMethod.Min, AccumulationMethod.Max, AndMethod.Min, OrMethod.Min);
var test1 = fis.addInput('test1', [0, 10]);
var test2 = fis.addOutput('test2', [0, 10]);

test1.addTerm('good', Types.Gaussian, [2, 5]);
test1.addTerm('ok',   Types.Triangular, [3, 6, 8]);
test1.addTerm('bad',  Types.GeneralizedBell, [2, 4, 6]);

test2.addTerm('good', Types.Gaussian, [2, 5]);
test2.addTerm('ok',   Types.Triangular, [3, 6, 8]);
test2.addTerm('bad',  Types.GeneralizedBell, [2, 4, 6]);

rule1 = fis.createRuleBuilder();
rule1.if('test1').is('good').then('test2', 'bad').weight(1);
rule1 = rule1.getRule();


var res = fis.evaluate(3);

console.log(res);