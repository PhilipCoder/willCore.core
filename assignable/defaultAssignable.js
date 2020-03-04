const assignable = require("./assignable.js");
const baseProxy = require("../proxies/base/baseProxy.js");
const defaultProxy = require("../proxies/default/defaultProxy.js");
class defaultAssignable extends assignable {
    constructor() {
        super({}, baseProxy);
    }

    completionResult() {
        let proxyResult = defaultProxy.new(this, this.propertyName);
        return proxyResult;
    }

    completed() {
    }
}

module.exports = defaultAssignable;