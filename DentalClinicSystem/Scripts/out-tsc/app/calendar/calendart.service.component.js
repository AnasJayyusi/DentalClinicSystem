import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let CalendarService = class CalendarService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // Delcartion
        this.URL = 'http://localhost/DentalClinic.API';
    }
    getTodayPatients() {
        return this.httpClient.get(this.URL + "/GetTodayPatients");
    }
    getTommorowPatient() {
        return this.httpClient.get(this.URL + "/GetTomorrowPatients");
    }
    getCurrentPatientDetails(currentPatientId) {
        return this.httpClient.get(this.URL + "/GetCurrentPatientDetails/" + currentPatientId);
    }
    deleteAppointment(visitId) {
        return this.httpClient.get(this.URL + "/DeleteAppointment/" + visitId);
    }
};
CalendarService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], CalendarService);
export { CalendarService };
//# sourceMappingURL=calendart.service.component.js.map