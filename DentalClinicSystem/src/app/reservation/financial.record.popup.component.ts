import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FinancialRecord, Invoice, InvoiceType, Transaction } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { toaster } from "../toaster";
import { ReservationService } from "./reservation.service.component";

@Component({
    selector: 'financial.record.popup',
    templateUrl: 'financial.record.popup.component.html',
    styleUrls: ['../sharedStyle.css']
})
export class FinancialRecordPopup implements OnInit , OnDestroy {

    patientId: number;
    invoice: Invoice = new Invoice();
    transaction: Transaction = new Transaction();
    newFinancialRecord: FinancialRecord[] = [];

    constructor(
        private toaster: toaster,
        private svc: ReservationService,
        private datepipe: DatePipe,
        public dialog: MatDialog) { }

    ngOnDestroy(): void {
        this.patientId =0
    }

    ngOnInit(): void {
        this.getInvoice()
    }
   
    // Dealing With Dom
    getInvoice() {
        this.svc.getFinancialRecord(this.patientId)
            .subscribe(
                result => {
                    this.invoice = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    // No errors, route to new page here
                }
            );
    }

    addNewInvoice() {
        if (this.transaction.BillAmount != null && this.transaction.BillAmount != undefined && this.transaction.BillAmount != 0) {
            var obj = new FinancialRecord();
            obj.Amount = this.transaction.BillAmount;
            obj.Comment = this.transaction.BillComment;
            obj.InvoiceType = InvoiceType.Bill;
            obj.CreatedDate = new Date;
            this.newFinancialRecord.push(obj)
        }

        if (this.transaction.PaidAmount != null && this.transaction.PaidAmount != undefined && this.transaction.PaidAmount != 0) {
            var obj = new FinancialRecord();
            obj.Amount = this.transaction.PaidAmount;
            obj.Comment = this.transaction.PaidComment;
            obj.InvoiceType = InvoiceType.Paid;
            obj.CreatedDate = new Date;
            this.newFinancialRecord.push(obj)
        }

        var newInvoice = new Invoice();
        newInvoice.FullPrice = 0;
        newInvoice.Paid = 0;

        newInvoice.PatientId = this.patientId;
        this.calculateInvoice(newInvoice); // To Get FullPrice & Paid 
        newInvoice.FinancialRecords = this.invoice.FinancialRecords.concat(this.newFinancialRecord);

        this.svc.saveInvoice(newInvoice)
            .subscribe(
                result => {
                    this.invoice = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error);
                },
                () => {
                    // Reset All Inputs
                    this.transaction = new Transaction();
                    this.toaster.render(ValidationMessages.SavedSuccessfully);
                    this.dialog.closeAll();

                }
            );
    }

    // helper 
    calculateInvoice(newInvoice: Invoice) {
        newInvoice.FullPrice = this.invoice.FullPrice
        newInvoice.Paid = this.invoice.Paid;

        this.newFinancialRecord.forEach(obj => {
            if (obj.InvoiceType == InvoiceType.Bill) {
                newInvoice.FullPrice = Number(newInvoice.FullPrice) + Number(obj.Amount);
            }
            if (obj.InvoiceType == InvoiceType.Paid) {
                newInvoice.Paid = Number(newInvoice.Paid) + Number(obj.Amount);
            }
        });
    }
}


