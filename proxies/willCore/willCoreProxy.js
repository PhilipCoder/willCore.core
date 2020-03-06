const proxyHandler = require("./willCoreProxyHandler.js");
const baseProxy = require("../../proxies/base/baseProxy.js");
/**
 * Proxy class for the main willCore instance.
 */
class willCoreProxy extends baseProxy{
    constructor(){
        super();
    }
    /**
     * Factory method.
     * @type {InstanceType<willCoreProxy>}
     */
    static new(){
        return new Proxy(new willCoreProxy(), new proxyHandler());
    }
}

module.exports = willCoreProxy;