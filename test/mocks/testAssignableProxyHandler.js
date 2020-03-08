const assignableProxyHandler = require("../../Proxies/base/assignableProxyHandler.js");

class testAssignableProxyHandler extends assignableProxyHandler {
    constructor(parentProxy, parentProperty) {
        super();
    }
}

module.exports = testAssignableProxyHandler;