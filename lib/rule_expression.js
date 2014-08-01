var RuleStatement = require('./rule_statement');

function RuleExpression(a, b, operator) {
    var self = this;

    function aggregate(x, andMethod, orMethod) {
        if(x instanceof RuleExpression) {
            return x.aggregate(andMethod, orMethod);
        } else if(x instanceof RuleStatement) {
            return x.evaluate();
        } else {
            throw new Error('a and b have to be an instance of RuleExpression or RuleStatement');
        }
    }

    self.getB = function () {
        return b;
    };

    /**
     * Aggregates all subconditions to a single degree of accomplishment
     * @param value
     * @returns {number}
     */
    self.aggregate = function(andMethod, orMethod) {
        var resA = aggregate(a, andMethod, orMethod);
        var resB = aggregate(b, andMethod, orMethod);

        if(operator === 'and') {
            return andMethod(resA, resB);
        } else if (operator === 'or') {
            return orMethod(resA, resB)
        }
    };

}

module.exports = RuleExpression;