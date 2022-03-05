import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
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
export class FinancialRecordPopup implements OnInit, OnDestroy {

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
        this.patientId = 0
        this.invoice = new Invoice();
    }

    ngOnInit(): void {
        this.getInvoice();
    }

    // Dealing With Dom
    getInvoice() {
        this.svc.getInvoice(this.patientId)
            .subscribe(
                result => {
                    this.invoice = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    this.getFinancialRecord();
                    
                }
            );
    }

    getFinancialRecord() {
        this.svc.getFinancialRecord(this.patientId)
            .subscribe(
                result => {
                    this.invoice.FinancialRecords = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    this.calculateClaims();
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

        this.save(newInvoice);

    }

    // Calulcations 
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

    calculateClaims() {
        let me = this;
        me.invoice.FullPrice = 0;
        me.invoice.Paid = 0;

        me.invoice.FinancialRecords.forEach(function (Record) {
            if (Record.InvoiceType == InvoiceType.Paid) {
                me.invoice.Paid = Number(me.invoice.Paid) + Number(Record.Amount);
            }
            if (Record.InvoiceType == InvoiceType.Bill) {
                me.invoice.FullPrice = Number(me.invoice.FullPrice) + Number(Record.Amount);
            }
        })

        me.invoice.Remaining = Number(me.invoice.FullPrice) - Number(me.invoice.Paid);
    }

    // Apis
    delete(id) {
        var answer = confirm("Are you sure want to delete this record?");
        if (answer) {
            this.svc.deleteFinancialRecord(id)
                .subscribe(
                    result => {
                        let ndx = this.invoice.FinancialRecords.findIndex(x => x.Id == id)
                        this.invoice.FinancialRecords.splice(ndx,1)
                    },
                    error => {
                        this.toaster.render(ValidationMessages.Error)
                    },
                    () => {
                        this.calculateClaims();
                        this.save(this.invoice);
                    }
                );
        }
        else
            return;
    }

    save(invoice: Invoice) {
        this.svc.saveInvoice(invoice)
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
                    this.invoice = new Invoice();
                    this.toaster.render(ValidationMessages.SavedSuccessfully);
                    this.dialog.closeAll();
                }
            );
    }
    // helper
}


