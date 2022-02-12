import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../sharedDtos';

@Injectable({
    providedIn: 'root' 
})

export class PatientService {

    // Delcartion
    URL = 'http://localhost/DentalClinic.API';
    _patientId: number = -1;

    constructor(private httpClient: HttpClient) {
    }

    addNewPatient(patient: Patient) {
        return this.httpClient.post(this.URL + "/AddNewPatient", patient);
    }

    updatePatient(patient: Patient) {
        return this.httpClient.post(this.URL + "/UpdatePatient", patient);
    }

    deletePatient(id): Observable<any> {
        return this.httpClient.get(this.URL + "/DeletePatient/" + id);
    }


    getInsuranceType(): Observable<any> {
        return this.httpClient.get(this.URL + "/GetInsuranceType");
    }

    getPatientByName(param): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatientsByName/" + param);
    }

    getPatientsByPhoneNumber(param): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatientsByPhoneNumber/" + param);
    }

    getPatients(): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatients");
    }

    getPatientById(id): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatientById/" + id);
    }
}
