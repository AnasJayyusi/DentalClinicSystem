
export class Patient {
    PatientId: Number;
    FullName: String;
    PhoneNumber: String;
    Birthdate: Date;
    Gender: Gender;
    Job: String;
    Address: String
    Surgeries: String;
    Medicines: String;
    InsuranceTypeId: number;
}

export class PatientReservation {
    FullName: String;
    PhoneNumber: String;
    Gender: Gender;
    Age: number;
    NextVisit: Date;
    LastVisit: Date;
    FullPrice: Number;
    Remaining: Number;
    Paid: Number;
    Visits: Visit[];
    Invoice: Invoice;
}

export class Booking {
    PatientId: Number;
    BookingTime: Date;
}

export class Invoice {
    PatientId: Number;
    FullPrice: Number;
    Paid: Number;
    Remaining: Number;
    FinancialRecords: FinancialRecord[] = [];
}

export class FinancialRecord {
    Id: Number;
    Amount: Number;
    Comment: String;
    InvoiceType: InvoiceType;
    CreatedDate: Date;
}

export class Transaction {
    BillAmount: Number;
    BillComment: String;
    PaidAmount: Number;
    PaidComment: String;
}


// Navigate Classes
export class InsuranceType {
    Id: number
    InsuranceCompanyName: string;
}

export class Visit {
    VisitTime: Date;
}

export class FullVisitInfo {
    PatientId: Number;
    Name: String;
    PhoneNumber: String;
    Time: Date;
    RemainingCost: Number;
    LastVisit: Date;
}

export class LiteVisitInfo {
    PatientId: Number;
    VisitId: Number;
    PatientName: String;
    VisitTime: Date;
    PhoneNumber: Number;
}


export class Bill {
    Id: number;
    BillDate: Date;
    Salary: number;
    Meterial: number;
    Rent: number;
    Electricity: number
    Water: number;
    Tax: number;
    AmmanMunicipality: number;
    ClinicConsumables: number;
    Other: number;
    Note: string;
}

export class BillsAmount {
    SalariesAmount: number = 0;
    MeterialAmount: number = 0;
    RentAmount: number = 0;
    ElectricityBillsAmount: number = 0;
    WaterBillsAmount: number = 0;
    TaxAmount: number = 0;
    AmmanMunicipalityAmount: number = 0;
    ClinicConsumablesAmount: number = 0;
    OtherAmount: number = 0;
    TotalAmount: number = 0;
}
export class PatientFile {
    Id: number;
    PatientId: number;
    OfficeProcedure: string;
    Qty: number;
    Price: number;
    ToothCode: number;
    Comment: string;
    Date: Date;
}

export class ProceduresName {
    ProcedureName: string;
    Price: number;
}

// Enums
export enum Gender {
    NotSet,
    Male,
    Female
}

export enum InvoiceType {
    Bill,
    Paid
}


