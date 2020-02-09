const assert = require('chai').assert;
const willCoreProxy = require("../proxies/willCore/willCoreProxy.js");
const intermediateAssignableProxy = require("../proxies/intermediateAssignable/intermediateAssignableProxy.js");
const testAssingable = require("./mocks/testAssignable.js");

describe('test-dynamic-loading-test', function () {
    before(function(){
        require('module-alias/register')
    });
    it('willCore-assignment-property-return-intermediateAssignableProxy', function () {
        let proxy = willCoreProxy.new();
        let assignableProxy = proxy.myDB;
        assert(assignableProxy instanceof intermediateAssignableProxy, "An intermediateAssignableProxy was not returned.");
    });
    it('willCore-assignment-property-assign-assignable', function () {
        let aa = require("willcore.testAssingableObj");
        let proxy = willCoreProxy.new();
        proxy.myDB.testAssingable;
        assert(proxy.myDB instanceof testAssingable, "Assignable instance not created.");
    });
    it('willCore-assignment-property-assign-values', function () {
        let proxy = willCoreProxy.new();
        proxy.myDB.testAssingableObj.one.two.three = { testing: 20 };
        assert(typeof proxy.myDB === "object", "The assignable is not an object.");
        assert(Object.keys(proxy.myDB).length === 2, "Assigned values are incorrect");
        assert(proxy.myDB["string"].length === 3, "Assigned values are incorrect");
        assert(proxy.myDB["string"][0] === "one" && proxy.myDB["string"][1] === "two" && proxy.myDB["string"][2] === "three", "Assigned values are incorrect");
        assert(proxy.myDB["object"].length === 1, "Assigned values are incorrect");
        assert(proxy.myDB["object"][0].testing === 20, "Assigned values are incorrect");
    });

})