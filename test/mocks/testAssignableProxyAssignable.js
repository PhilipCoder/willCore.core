const assignable = require("../../assignable/assignable.js");
const baseProxy = require("../../proxies/base/baseProxy.js");
const testAssignableProxy = require("./testAssignableProxy.js");
const defaultProxy = require("../../proxies/default/defaultProxy.js");

class testAssignable extends assignable {
    constructor() {
        super({ string: 1 }, [baseProxy,defaultProxy]);
    }

    completionResult() {
        return testAssignableProxy.new(null, null, this);
    }

    completed() {
    }
}

module.exports = testAssignable;