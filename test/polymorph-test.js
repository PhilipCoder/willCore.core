const assert = require('chai').assert;
const logicClass = require("../proxies/logicClass/logicClass.js");
const observableHandler = require("../proxies/observable/observableProxy.js");

class polymorph {
    constructor() {
        const ___proto___ = Object.getPrototypeOf(this);
        this.baseValues = null;
        this.morphs = Array.from(arguments);
        this.onEvent = () => {
            this.__proto__ = ___proto___;
            this.baseValues = this.baseValues || Object.assign({}, this);
            for (var key in this) {
                if (key !== "onEvent" && key !== "baseValues" && key !== "state" && key !== "morphs") {
                    delete this[key];
                }
            }
            for (var key in this.baseValues) {
                if (key !== "onEvent" && key !== "baseValues" && key !== "state" && key !== "morphs") {
                    this[key] = this.baseValues[key];
                }
            }
            let that = this;
            if (this.morphs && Array.isArray(this.morphs)) {
                for (let mI = 0; mI < this.morphs.length; mI++) {
                    let morph = this.morphs[mI];
                    if (morph.activation && morph.activation(that)) {
                        let originalInstance = that;
                        that = new morph(that);
                        that = that.getMorph(that);
                        Object.getOwnPropertyNames(originalInstance.__proto__).forEach(protoMember => {
                            if (!that.__proto__[protoMember]) {
                                that.__proto__[protoMember] = originalInstance.__proto__[protoMember];
                            }
                        });
                        break
                    }
                };
            }
            this.__proto__ = that.__proto__;
            for (var key in that) {
                this[key] = that[key];
            }
            Object.getOwnPropertyNames(that.__proto__).forEach(protoMember => {
                if (!this.__proto__[protoMember]) {
                    this.__proto__[protoMember] = that.__proto__[protoMember];
                }
            });

        }
        this.state = observableHandler.getProxy([this.onEvent], {});
    }

}

class morph {
    constructor() {
        if (arguments.length === 0) throw 'No base supplied for morph';
        let base = arguments[0];
        for (let key in base) {
            if (key !== "morphs") {
                this[key] = base[key];
            }
        }
        this.morphs = Array.from(arguments).slice(1);
    }

    getMorph(that) {
        if (this.morphs && Array.isArray(this.morphs)) {
            for (let mI = 0; mI < this.morphs.length; mI++) {
                let morph = this.morphs[mI];
                if (morph.activation && morph.activation(this)) {
                    let originalInstance = that;
                    that = new morph(that);
                    that = that.getMorph(that);
                    Object.getOwnPropertyNames(originalInstance.__proto__).forEach(protoMember => {
                        that.__proto__[protoMember] = that.__proto__[protoMember] || originalInstance.__proto__[protoMember];
                    });
                    break;
                }
            };
        }
        return that;
    }
}
morph.scopeMap = new Map();


class car extends polymorph {
    constructor() {
        super(electricCar, petrolCar);
        this.type = "Unspecified";
        this.isBase = 1;
    }

    makeSound() {
        return "normal";
    }

    baseMethod() {
        return this.isBase;
    }

}

class electricCar extends morph {
    constructor(base) {
        super(base);
        this.type = "Electric";
    }

    static activation(context) {
        return context.state.fillingPoint === "Charging Station";
    }

    makeSound() {
        return "bzzzzzzzzz";
    }
}

class petrolCar extends morph {
    constructor(base) {
        super(base, fourByFour, sportsCar);
        this.type = "Petrol";
        this.sound = "Petrol sound";
    }

    static activation(context) {
        return context.state.fillingPoint === "Petrol Pump";
    }

    makeSound() {
        return "gororor";
    }

    petrolLol() {
        return this.sound;
    }
}

class fourByFour extends morph {
    constructor(base) {
        super(base);
        this.Drive = "4x4";
        this.sound = "4x4 sound";
    }

    static activation(context) {
        return context.state.brand === "Toyota";
    }

    makeSound() {
        return this.sound;
    }
}

class sportsCar extends morph {
    constructor(base) {
        super(base);
        this.Drive = "2 Wheel Drive";
    }

    static activation(context) {
        return context.state.brand === "Porche";
    }

    makeSound() {
        return "wrrrrrrrrrrzzzz";
    }
}

describe('polymorph-test', function () {

    it('basic-overloading', async function () {
        var instance = new car();
        instance.state.fillingPoint = "Petrol Pump";
        let typeA = instance instanceof petrolCar;
        instance.state.brand = "Toyota";

        let isIn = instance instanceof fourByFour;
        var sound = instance.makeSound();
        var baseResult = instance.baseMethod();
        var petrolResult = instance.petrolLol();
    });

    it("observable-test", function () {
        const events = [
            () => {
                console.log("aa");
            },
            () => {
                console.log("bb");
            }
        ];
        const proxy = observableHandler.getProxy(events, {});

        proxy.one = 1;
        proxy.two = { three: 2 };
        proxy.two.three = 5;
    });


})