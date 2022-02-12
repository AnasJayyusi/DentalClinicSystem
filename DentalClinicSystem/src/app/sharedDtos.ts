
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
    Amount: Number;
    Comment: String;
    InvoiceType: InvoiceType;
    CreatedDate: Date;
}

export class Transaction {
    BillAmount: Number ;
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
    PatientName: String;
    VisitTime: Date;
    PhoneNumber : Number;
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


