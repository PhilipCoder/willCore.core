const assignableProxyHandler = require("../base/assignableProxyHandler.js");
const baseProxy = require("../base/baseProxy.js");

class defaultProxyHandler extends assignableProxyHandler {
    constructor(parentProxy, parentProperty) {
        super();
        this.getTraps.unshift(this.getProxies);
        this.proxies = {};
    }

    getProxies(target, property, proxy) {
        if (property === "proxies") {
            let result = {};
            for (let key in target){
                if (!key.startsWith("_")){
                    result[key] = target[key];
                }
            }
            return { status: true, value: result };
        }
        return { status: false };
    }
}

module.exports = defaultProxyHandler;