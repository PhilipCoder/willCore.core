class logicClass {
    constructor() {
        this.lastEntry = null;
        this.lastKey = null;
    }

    set(target, property, value) {
        if (Array.isArray(value) && value.length === 2 && typeof value[0] === "function" && typeof value[1] === "function") {
            value.forEach(func => this.set(target, property, func))
        }
        else if (typeof value === "function") {
            target.methodContainer = target.methodContainer || {};
            target.methodContainer[property] = target.methodContainer[property] || [];
            if (!this.lastEntry) {
                this.lastEntry = {
                    func: value
                };
                this.lastKey = property;
            } else if (this.lastKey !== null && this.lastKey !== property){
                target.methodContainer[this.lastKey].push(this.lastEntry);
                this.lastEntry = {
                    func: value
                };
                this.lastKey = property;
            } else {
                this.lastEntry.activation = value;
                target.methodContainer[property].push(this.lastEntry);
                if (target.__isLogicProxy) {
                    target.___childMethods = target.___childMethods || [];
                    target.___childMethods.push(this.lastEntry);
                }
                this.lastEntry = null;
                this.lastKey = null;
            }
        } else {
            target[property] = value;
        }
        return true;
    }

    get(target, property) {
        let functions = target.methodContainer ? target.methodContainer[property] : undefined;
        if (functions && !target[property]) {
            let functionProxy = logicClass.new(async function () {
                for (let i = 0; i < functions.length; i++) {
                    if (functions[i].activation) {
                        let shouldActivate = await functions[i].activation.bind(target, ...arguments)();
                        let val = target[property];
                        if (shouldActivate) {
                            if (val.___childMethods) {
                                for (var childI = 0; childI < val.___childMethods.length; childI++) {
                                    let childShouldActivate = await val.___childMethods[childI].activation.bind(target, ...arguments)();
                                    if (childShouldActivate) {
                                        return await val.___childMethods[childI].func.bind(target, ...arguments)();
                                    }
                                }
                            }
                            return await functions[i].func.bind(target, ...arguments)();
                        }
                    } else {
                        return await functions[i].func.bind(target, ...arguments)();
                    }
                }
                return undefined;
            });
            functionProxy.__isLogicProxy = true;
            target[property] = functionProxy;
            return functionProxy;
        }
        return target[property];
    }

    static new(target) {
        return new Proxy(target || new function () { }, new logicClass());
    }
}

module.exports = logicClass;