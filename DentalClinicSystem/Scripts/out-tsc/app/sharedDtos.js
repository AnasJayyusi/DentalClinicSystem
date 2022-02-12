export class Patient {
}
export class PatientReservation {
}
export class Booking {
}
export class Invoice {
    constructor() {
        this.FinancialRecords = [];
    }
}
export class FinancialRecord {
}
export class Transaction {
}
// Navigate Classes
export class InsuranceType {
}
export class Visit {
}
export class FullVisitInfo {
}
export class LiteVisitInfo {
}
// Enums
export var Gender;
(function (Gender) {
    Gender[Gender["NotSet"] = 0] = "NotSet";
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (Gender = {}));
export var InvoiceType;
(function (InvoiceType) {
    InvoiceType[InvoiceType["Bill"] = 0] = "Bill";
    InvoiceType[InvoiceType["Paid"] = 1] = "Paid";
})(InvoiceType || (InvoiceType = {}));
//# sourceMappingURL=sharedDtos.js.map