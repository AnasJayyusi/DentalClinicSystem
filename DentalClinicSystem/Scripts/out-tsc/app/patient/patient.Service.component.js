import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let PatientService = class PatientService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // Delcartion
        this.URL = 'http://localhost/DentalClinic.API';
        this._patientId = -1;
    }
    addNewPatient(patient) {
        return this.httpClient.post(this.URL + "/AddNewPatient", patient);
    }
    updatePatient(patient) {
        return this.httpClient.post(this.URL + "/UpdatePatient", patient);
    }
    deletePatient(id) {
        return this.httpClient.get(this.URL + "/DeletePatient/" + id);
    }
    getInsuranceType() {
        return this.httpClient.get(this.URL + "/GetInsuranceType");
    }
    getPatientByName(param) {
        return this.httpClient.get(this.URL + "/GetPatientsByName/" + param);
    }
    getPatientsByPhoneNumber(param) {
        return this.httpClient.get(this.URL + "/GetPatientsByPhoneNumber/" + param);
    }
    getPatients() {
        return this.httpClient.get(this.URL + "/GetPatients");
    }
    getPatientById(id) {
        return this.httpClient.get(this.URL + "/GetPatientById/" + id);
    }
};
PatientService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], PatientService);
export { PatientService };
//# sourceMappingURL=patient.Service.component.js.map