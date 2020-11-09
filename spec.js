//The idea of the logic proxy is to implement features such as dependency injection and method overloading.

//Method overloading

let proxyClass = proxyClassFactory.new("name");

proxyClass.login = [(parameter) => {
    console.log("Value is greater than 10");
}, (parameter) => parameter.value && parameter.value > 10];

proxyClass.login = [(parameter) => {
    console.log("Value is smaller than 10");
}, (parameter) => parameter.value && parameter.value < 10];

proxyClass.outputValue = [(parameter) => {
    console.log("value was not supplied");
}, (parameter) => !!parameter];

proxyClass.outputValue.outputString = [(parameter) => {
    console.log("value was not supplied");
}, (parameter) => typeof parameter === "string"];


//Base appointment

class appointment extends polymorph {
    constructor() {
        super(invoicedAppointment, invoiceAppointment)
        this.BillingStates = [2, 6, 4, 8, 9, 4, 6];
        this.appointment = null;
        this.displayState = {
            showInvoicingButton: false,
            showDropdown: false,
            showInvoiceLink: false,
            showBillingTemplates: false,
            existingInvoice: false,
            color: "blue"
        };
    }

    activate(app = this.appointment) {
        return app.id === 0 || app.accountNumber === 0 || this.BillingStates.includes(app.statusId);
    }

    getDisplayState() {
        return this.resolve(this.displayState);
    }
}

const polyAppointment = appointment.new({ appointment: appointmentData });

//Invoiced Appointment

class invoicedAppointment extends polymorph {
    constructor() {
        this.logic.getColor = [
            () => "green",
            () => true
        ];
        this.logic.getColor.billingTemplateColor = [
            () => "yellow",
            () => this.appointment.savedBillingTemplate
        ];
        this.logic.getColor.bureauTemplateColor = [
            () => "red",
            () => this.appointment.savedBureauTemplate
        ];

        this.displayState = {
            showInvoicingButton: true,
            showDropdown: false,
            showInvoiceLink: false,
            showBillingTemplates: false,
            existingInvoice: true,
            color: this.logic.getColor
        };
    }

    activate(app = this.appointment) {
        return app.id > 0 && app.accountNumber > 0 && !this.BillingStates.includes(app.statusId) && app.invoiceId > 0;
    }
}

//Invoice Appointment

class invoiceAppointment extends polymorph {
    constructor() {
        super(dropdownAppointment);
        this.displayState = {
            showInvoicingButton: true,
            showDropdown: false,
            showInvoiceLink: false,
            showBillingTemplates: false,
            existingInvoice: false,
            color: "blue"
        };
    }

    activate(app = this.appointment) {
        return app.id > 0 && app.accountNumber > 0 && !this.BillingStates.includes(app.statusId) && app.invoiceId === 0;
    }
}

//Dropdown Appointment

class dropdownAppointment extends polymorph {
    constructor() {
        this.logic.showBillingTemplates = () => this.appointment.shouldShowBillingTemplate;

        this.displayState = {
            showInvoicingButton: true,
            showDropdown: true,
            showInvoiceLink: true,
            showBillingTemplates: this.logic.showBillingTemplates,
            existingInvoice: false,
            color: "blue"
        };
    }

    activate(app = this.appointment) {
        return app.id > 0 && app.accountNumber > 0 && !this.BillingStates.includes(app.statusId) && app.invoiceId === 0 && app.shouldShowBillingTemplate;
    }
}