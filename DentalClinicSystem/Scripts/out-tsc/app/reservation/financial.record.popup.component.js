import { __decorate, __metadata } from "tslib";
import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FinancialRecord, Invoice, InvoiceType, Transaction } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { toaster } from "../toaster";
import { ReservationService } from "./reservation.service.component";
let FinancialRecordPopup = class FinancialRecordPopup {
    constructor(toaster, svc, datepipe, dialog) {
        this.toaster = toaster;
        this.svc = svc;
        this.datepipe = datepipe;
        this.dialog = dialog;
        this.invoice = new Invoice();
        this.transaction = new Transaction();
        this.newFinancialRecord = [];
    }
    ngOnDestroy() {
        this.patientId = 0;
    }
    ngOnInit() {
        this.getInvoice();
    }
    // Dealing With Dom
    getInvoice() {
        this.svc.getFinancialRecord(this.patientId)
            .subscribe(result => {
            this.invoice = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    addNewInvoice() {
        if (this.transaction.BillAmount != null && this.transaction.BillAmount != undefined && this.transaction.BillAmount != 0) {
            var obj = new FinancialRecord();
            obj.Amount = this.transaction.BillAmount;
            obj.Comment = this.transaction.BillComment;
            obj.InvoiceType = InvoiceType.Bill;
            obj.CreatedDate = new Date;
            this.newFinancialRecord.push(obj);
        }
        if (this.transaction.PaidAmount != null && this.transaction.PaidAmount != undefined && this.transaction.PaidAmount != 0) {
            var obj = new FinancialRecord();
            obj.Amount = this.transaction.PaidAmount;
            obj.Comment = this.transaction.PaidComment;
            obj.InvoiceType = InvoiceType.Paid;
            obj.CreatedDate = new Date;
            this.newFinancialRecord.push(obj);
        }
        var newInvoice = new Invoice();
        newInvoice.FullPrice = 0;
        newInvoice.Paid = 0;
        newInvoice.PatientId = this.patientId;
        this.calculateInvoice(newInvoice); // To Get FullPrice & Paid 
        newInvoice.FinancialRecords = this.invoice.FinancialRecords.concat(this.newFinancialRecord);
        this.svc.saveInvoice(newInvoice)
            .subscribe(result => {
            this.invoice = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // Reset All Inputs
            this.transaction = new Transaction();
            this.toaster.render(ValidationMessages.SavedSuccessfully);
            this.dialog.closeAll();
        });
    }
    // helper 
    calculateInvoice(newInvoice) {
        newInvoice.FullPrice = this.invoice.FullPrice;
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
};
FinancialRecordPopup = __decorate([
    Component({
        selector: 'financial.record.popup',
        templateUrl: 'financial.record.popup.component.html',
        styleUrls: ['../sharedStyle.css']
    }),
    __metadata("design:paramtypes", [toaster,
        ReservationService,
        DatePipe,
        MatDialog])
], FinancialRecordPopup);
export { FinancialRecordPopup };
//# sourceMappingURL=financial.record.popup.component.js.map