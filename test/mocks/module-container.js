module.exports = (willCoreModuleInstance) => {
    willCoreModuleInstance.assignables.testAssingableObj = () => require("./testAssignableObj.js");
    willCoreModuleInstance.assignables.testAssingable = () => require("./testAssignable.js");
};