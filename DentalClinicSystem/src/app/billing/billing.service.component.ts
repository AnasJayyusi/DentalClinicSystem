import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../sharedDtos';

@Injectable({
    providedIn: 'root'
})

export class BillingService {


    // Delcartion
    URL = 'http://localhost/DentalClinic.API';
    _billId: number = -1;
    _billDate: Date;

    constructor(private httpClient: HttpClient) {
    }

    addNewBill(bill: Bill) {
        return this.httpClient.post(this.URL + "/AddNewBill", bill);
    }

    deleteBill(id): Observable<any> {
        return this.httpClient.get(this.URL + "/DeleteBill/" + id);
    }


    getBills(pageNumber, pageSize): Observable<any> {
        return this.httpClient.get(this.URL + "/GetBills/" + pageNumber + "/" + pageSize);
    }

    getBillsByPeriod(year: number, month: number): Observable<any> {
        return this.httpClient.get(this.URL + "/GetBillsByPeriod/" + year + "/" + month);
    }

    getIncomeByPeriods(year: number, month: number): Observable<any> {
        return this.httpClient.get(this.URL + "/GetIncomeByPeriods/" + year + "/" + month);
    }

    getBillByDate(date): Observable<any> {
        return this.httpClient.get(this.URL + "/GetBillByDate/" + date);
    }

    getBillsByDate(date): Observable<any> {
        return this.httpClient.get(this.URL + "/GetBillsByDate/" + date);
    }
}
