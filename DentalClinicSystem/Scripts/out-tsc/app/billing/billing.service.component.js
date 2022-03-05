import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let BillingService = class BillingService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // Delcartion
        this.URL = 'http://localhost/DentalClinic.API';
        this._billId = -1;
    }
    addNewBill(bill) {
        return this.httpClient.post(this.URL + "/AddNewBill", bill);
    }
    deleteBill(id) {
        return this.httpClient.get(this.URL + "/DeleteBill/" + id);
    }
    getBills(pageNumber, pageSize) {
        return this.httpClient.get(this.URL + "/GetBills/" + pageNumber + "/" + pageSize);
    }
    getBillsByPeriod(year, month) {
        return this.httpClient.get(this.URL + "/GetBillsByPeriod/" + year + "/" + month);
    }
    getIncomeByPeriods(year, month) {
        return this.httpClient.get(this.URL + "/GetIncomeByPeriods/" + year + "/" + month);
    }
    getBillByDate(date) {
        return this.httpClient.get(this.URL + "/GetBillByDate/" + date);
    }
    getBillsByDate(date) {
        return this.httpClient.get(this.URL + "/GetBillsByDate/" + date);
    }
};
BillingService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], BillingService);
export { BillingService };
//# sourceMappingURL=billing.service.component.js.map