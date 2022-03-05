import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, Invoice, PatientFile } from '../sharedDtos';

@Injectable({
    providedIn: 'root'
})


export class ReservationService {

    // Delcartion
    URL = 'http://localhost/DentalClinic.API';

    constructor(private httpClient: HttpClient) {
    }

    getPatientsReservations(): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatientsReservations/");
    }

    getPatientsReservationsByKeyword(param): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatientsReservationsByKeyword/" + param);
    }

    bookNewAppointment(booking: Booking) {

        return this.httpClient.post(this.URL + "/BookNewAppointment", booking);
    }

    getAvailableHours(booking: Booking): Observable<any> {
        return this.httpClient.post(this.URL + "/GetAvailableHours", booking);
    }

    getFinancialRecord(patientId: number): Observable<any> {
        return this.httpClient.get(this.URL + "/GetFinancialRecord/" + patientId);
    }

    getInvoice(patientId: number): Observable<any> {
        return this.httpClient.get(this.URL + "/GetInvoice/" + patientId);
    }

    saveInvoice(invoice: Invoice): Observable<any> {
        return this.httpClient.post(this.URL + "/SaveInvoice", invoice);
    }

    deleteFinancialRecord(id): Observable<any> {
        return this.httpClient.get(this.URL + "/DeleteFinancialRecord/" + id);
    }

    getNextPatientVisit(id): Observable<any> {
        return this.httpClient.get(this.URL + "/GetNextPatientVisit/" + id);
    }

    getPatientFile(patientId: number): Observable<any> {
        return this.httpClient.get(this.URL + "/GetPatientFileById/" + patientId);
    }

    getProceduresNamesWithPrice(): Observable<any> {
        return this.httpClient.get(this.URL + "/GetProceduresNames");
    }

    savePatientRecord(patientFile: PatientFile) {
        return this.httpClient.post(this.URL + "/SavePatientRecord", patientFile);
    }

    deletePatientRecord(recordId): Observable<any> {
        return this.httpClient.get(this.URL + "/DeletePatientRecord/" + recordId);
    }


}
