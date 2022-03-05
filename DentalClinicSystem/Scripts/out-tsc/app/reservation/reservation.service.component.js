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
        return this.httpClient.get(this.URL + "/GetFinancialRecord/" + patientId);
    }
    getInvoice(patientId) {
        return this.httpClient.get(this.URL + "/GetInvoice/" + patientId);
    }
    saveInvoice(invoice) {
        return this.httpClient.post(this.URL + "/SaveInvoice", invoice);
    }
    deleteFinancialRecord(id) {
        return this.httpClient.get(this.URL + "/DeleteFinancialRecord/" + id);
    }
    getNextPatientVisit(id) {
        return this.httpClient.get(this.URL + "/GetNextPatientVisit/" + id);
    }
    getPatientFile(patientId) {
        return this.httpClient.get(this.URL + "/GetPatientFileById/" + patientId);
    }
    getProceduresNamesWithPrice() {
        return this.httpClient.get(this.URL + "/GetProceduresNames");
    }
    savePatientRecord(patientFile) {
        return this.httpClient.post(this.URL + "/SavePatientRecord", patientFile);
    }
    deletePatientRecord(recordId) {
        return this.httpClient.get(this.URL + "/DeletePatientRecord/" + recordId);
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