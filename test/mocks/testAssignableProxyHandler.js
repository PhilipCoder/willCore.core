const assignableProxyHandler = require("../../Proxies/base/assignableProxyHandler.js");

class testAssignableProxyHandler extends assignableProxyHandler {
    constructor(parentProxy, parentProperty, assignable) {
        super(assignable);
    }
}

module.exports = testAssignableProxyHandler;