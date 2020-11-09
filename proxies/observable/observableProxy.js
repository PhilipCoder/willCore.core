class observableProxyHandler {
    constructor(events) {
        this.events = events;
        this.emittingEvents = true;
    }

    get(target, property) {
        switch (typeof value) {
            case "symbol":
                return this[value.toString().slice(7,-1)];
            default:
                return target[property];
        }
    }

    set(target, property, value) {
        switch (typeof value) {
            case "object":
                target[property] = observableProxyHandler.getProxy(this.events,value);
                if (this.emittingEvents) this.events.forEach(event => event());
                break;
            case "symbol":
                this[value.toString().slice(7,-1)] = value;
                break;
            default:
                target[property] = value;
                if (this.emittingEvents) this.events.forEach(event => event());
                break;
        }
    }

    static getProxy(events, value) {
        return new Proxy(value, new observableProxyHandler(events));
    }
}

module.exports = observableProxyHandler;