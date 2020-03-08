const assignableProxyHandler = require("../base/assignableProxyHandler.js");
const baseProxy = require("../base/baseProxy.js");

class defaultProxyHandler extends assignableProxyHandler {
    constructor(parentProxy, parentProperty) {
        super();
        this.setTraps.unshift(this.assignAssignable);
        this.proxies = {};
    }

    assignAssignable(target, property, value, proxy) {
        if (value instanceof baseProxy) {
            this.proxies[property] = value;
            return { status: true, value: value };
        }
        return { status: false };
    }

    getProxies(target, property, proxy) {
        if (property === "proxies") {
            return { status: true, value: this.proxies };
        }
        return { status: false };
    }
}

module.exports = defaultProxyHandler;