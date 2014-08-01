module.exports = {
    Triangular: function (x, params) {

        if(params.length !== 3) { throw new Error('function expects 3 parameters')}

        var a = params[0];
        var b = params[1];
        var c = params[2];

        return Math.max(Math.min((x-a)/(b-a), (c-x)/(c-b)), 0);
    },
    Trapezoidal: function (x, params) {
        if(params.length !== 4) { throw new Error('function expects 4 parameters')}

        var a = params[0];
        var b = params[1];
        var c = params[2];
        var d = params[3];

        return Math.max(Math.min((x-a)/(b-a), 1, (d-x)/(d-c)), 0);
    },

    ZSpline: function (x, params) {
        if(params.length !== 2) { throw new Error('function expects 2 parameters')}

        var a = params[0];
        var b = params[1];

        if (x <=  a) {
            return 1;
        }

        if (a <= x && x <= (a + b)/2) {
            return 1 - 2 * Math.pow((x-a)/(b-a), 2);
        }

        if ((a+b)/2 <= x && x <= b) {
            return 2 * Math.pow((x-b)/(b-a), 2);
        }

        return 0;
    },

    SSpline: function (x, params) {
        if(params.length !== 2) { throw new Error('function expects 2 parameters')}

        var a = params[0];
        var b = params[1];

        if (x <=  a) {
            return 0;
        }

        if (a <= x && x <= (a + b)/2) {
            return 2 * Math.pow((x-a)/(b-a), 2);
        }

        if ((a+b)/2 <= x && x <= b) {
            return 1 - 2 * Math.pow((x-b)/(b-a), 2);
        }

        return 1;
    },
    GeneralizedBell: function (x, params) {
        if(params.length !== 3) { throw new Error('function expects 3 parameters')}

        var a = params[0];
        var b = params[1];
        var c = params[2];

        return 1 / (1 + Math.pow(Math.abs((x - c) / a), 2 * b))
    },
    Gaussian: function (x, params) {
        if(params.length !== 2) { throw new Error('function expects 2 parameters')}

        var sig = params[0];
        var c = params[1];

        return Math.exp((-1) * (Math.pow((x-c), 2) / (2 * Math.pow(sig, 2))));
    }

};