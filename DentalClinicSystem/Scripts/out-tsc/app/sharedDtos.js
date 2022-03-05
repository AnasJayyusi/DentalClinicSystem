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
export class Bill {
}
export class BillsAmount {
    constructor() {
        this.SalariesAmount = 0;
        this.MeterialAmount = 0;
        this.RentAmount = 0;
        this.ElectricityBillsAmount = 0;
        this.WaterBillsAmount = 0;
        this.TaxAmount = 0;
        this.AmmanMunicipalityAmount = 0;
        this.ClinicConsumablesAmount = 0;
        this.OtherAmount = 0;
        this.TotalAmount = 0;
    }
}
export class PatientFile {
}
export class ProceduresName {
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