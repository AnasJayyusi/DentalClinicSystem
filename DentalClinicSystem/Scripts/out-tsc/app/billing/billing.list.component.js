import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { toaster } from '../toaster';
import { BillsAmount } from '../sharedDtos';
import { ValidationMessages } from '../sharedEnum';
import { BillingService } from './billing.service.component';
import { DatePipe } from '@angular/common';
let BillingListComponent = class BillingListComponent {
    // Ctor  + ngOnInIt
    constructor(router, svc, toaster, datepipe) {
        this.router = router;
        this.svc = svc;
        this.toaster = toaster;
        this.datepipe = datepipe;
        // Variables
        this.bills = [];
        this.billing = [];
        this.billsAmount = new BillsAmount();
        this.totalIncome = 0;
        this.isBusy = false;
        this.pageSize = 2;
        this.pageNumber = 1;
    }
    ngOnInit() {
        this.getBills();
    }
    /*--------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------------Main Functions-------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------------------------------*/
    // APIs
    getBills() {
        this.svc.getBills(this.pageNumber, this.pageSize)
            .subscribe(result => {
            this.bills = result.bills;
            this.total = result.totalItems;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    getBillsByDate(date) {
        let dateAsString = this.datepipe.transform(date, 'yyyy-MM-dd');
        this.svc.getBillsByDate(dateAsString)
            .subscribe(result => {
            this.bills = result;
            this.total = 1; // always will be 1 
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
        });
    }
    getBillsByPeriods() {
        if (this.datePeriod == undefined) {
            this.toaster.render(ValidationMessages.DateIsMissing);
            return;
        }
        this.getIncomeByPeriods();
        this.isBusy = true;
        let arr = this.getMonthYearAsNumbers(this.datePeriod);
        this.svc.getBillsByPeriod(arr[1], arr[0])
            .subscribe(result => {
            this.billing = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
            this.isBusy = false;
        }, () => {
            this.calculateBills();
            this.isBusy = false;
        });
    }
    getIncomeByPeriods() {
        this.isBusy = true;
        let arr = this.getMonthYearAsNumbers(this.datePeriod);
        this.svc.getIncomeByPeriods(arr[1], arr[0])
            .subscribe(result => {
            this.totalIncome = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
            this.isBusy = false;
        }, () => {
            this.calculateBills();
            this.isBusy = false;
        });
    }
    delete(id) {
        var answer = confirm("Are you sure want to delete this recored from the system?");
        if (answer) {
            this.svc.deleteBill(id)
                .subscribe(result => {
                this.toaster.render(ValidationMessages.DeletedSuccessfully);
            }, error => {
                this.toaster.render(ValidationMessages.Error);
            }, () => {
                this.param = null;
                this.search("Enter");
            });
        }
        else
            return;
    }
    // Dealing With Dom
    pageChanged(e) {
        this.pageNumber = e;
        this.getBills();
    }
    edit(billId, billDate) {
        this.svc._billId = Number(billId);
        this.svc._billDate = new Date(billDate);
        this.router.navigate(['Billing/edit', this.svc._billId], { skipLocationChange: true });
    }
    search(e) {
        if (e == "Refresh") {
            this.getBills();
            this.param = null;
            return;
        }
        if (e.key == "Enter" || e == "Enter") {
            if (this.param == null || this.param == "" || this.param == undefined) {
                this.getBills();
            }
            else {
                // Get By Date
                this.getBillsByDate(new Date(this.param));
            }
        }
    }
    // Helpers
    getMonthYearAsNumbers(date) {
        let month, year;
        var dateArray = date.toString().split('-');
        if (dateArray[0].length == 4) {
            year = Number(dateArray[0]);
            month = Number(dateArray[1]);
        }
        else {
            month = Number(dateArray[0]);
            year = Number(dateArray[1]);
        }
        return [month, year];
    }
    calculateBills() {
        this.billsAmount = new BillsAmount();
        this.billsAmount.SalariesAmount = this.billing.map(x => x.Salary).reduce((a, b) => a + b, 0);
        this.billsAmount.MeterialAmount = this.billing.map(x => x.Meterial).reduce((a, b) => a + b, 0);
        this.billsAmount.RentAmount = this.billing.map(x => x.Rent).reduce((a, b) => a + b, 0);
        this.billsAmount.ElectricityBillsAmount = this.billing.map(x => x.Electricity).reduce((a, b) => a + b, 0);
        this.billsAmount.WaterBillsAmount = this.billing.map(x => x.Water).reduce((a, b) => a + b, 0);
        this.billsAmount.TaxAmount = this.billing.map(x => x.Tax).reduce((a, b) => a + b, 0);
        this.billsAmount.AmmanMunicipalityAmount = this.billing.map(x => x.AmmanMunicipality).reduce((a, b) => a + b, 0);
        this.billsAmount.ClinicConsumablesAmount = this.billing.map(x => x.ClinicConsumables).reduce((a, b) => a + b, 0);
        this.billsAmount.OtherAmount = this.billing.map(x => x.Other).reduce((a, b) => a + b, 0);
        this.billsAmount.TotalAmount =
            this.billsAmount.SalariesAmount + this.billsAmount.MeterialAmount + this.billsAmount.RentAmount
                +
                    this.billsAmount.ElectricityBillsAmount + this.billsAmount.WaterBillsAmount + this.billsAmount.TaxAmount
                +
                    this.billsAmount.AmmanMunicipalityAmount + this.billsAmount.ClinicConsumablesAmount + +this.billsAmount.OtherAmount;
        //this.billsAmount.SalariesAmount = this.billing.map()
    }
};
BillingListComponent = __decorate([
    Component({
        selector: 'billing-list',
        templateUrl: './billing.list.component.html',
        styleUrls: ['../sharedStyle.css']
    }),
    __metadata("design:paramtypes", [Router,
        BillingService,
        toaster,
        DatePipe])
], BillingListComponent);
export { BillingListComponent };
//# sourceMappingURL=billing.list.component.js.map