var RuleStatement = require('./rule_statement');

function RuleExpression(a, b, operator) {


    function aggreate(x, value, andMethod, orMethod) {
        if(x instanceof RuleExpression) {
            return x.aggregate(value, andMethod, orMethod);
        } else if(x instanceof RuleStatement) {
            return x.evaluate(value);
        } else {
            throw new Error('a and b have to be an instance of RuleExpression or RuleStatement');
        }
    }

    /**
     * Aggregates all subconditions to a single degree of accomplishment
     * @param value
     * @returns {number}
     */
    self.aggregate = function(value, andMethod, orMethod) {
        var resA = aggreate(a, value, andMethod, orMethod);
        var resB = aggreate(b, value, andMethod, orMethod);

        if(operator === 'and') {
            andMethod(resA, resB);
        } else if (operator === 'or') {
            orMethod(resA, resB)
        }
    };

}

module.exports = RuleExpression;