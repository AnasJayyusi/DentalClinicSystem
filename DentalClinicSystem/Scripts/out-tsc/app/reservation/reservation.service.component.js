import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let ReservationService = class ReservationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // Delcartion
        this.URL = 'http://localhost/DentalClinic.API';
    }
    getPatientsReservations() {
        return this.httpClient.get(this.URL + "/GetPatientsReservations/");
    }
    getPatientsReservationsByKeyword(param) {
        return this.httpClient.get(this.URL + "/GetPatientsReservationsByKeyword/" + param);
    }
    bookNewAppointment(booking) {
        return this.httpClient.post(this.URL + "/BookNewAppointment", booking);
    }
    getAvailableHours(booking) {
        return this.httpClient.post(this.URL + "/GetAvailableHours", booking);
    }
    getFinancialRecord(patientId) {
        return this.httpClient.get(this.URL + "/getFinancialRecord/" + patientId);
    }
    saveInvoice(invoice) {
        return this.httpClient.post(this.URL + "/SaveInvoice", invoice);
    }
};
ReservationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], ReservationService);
export { ReservationService };
//# sourceMappingURL=reservation.service.component.js.map