import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../sharedDtos';

@Injectable({
    providedIn: 'root' 
})

export class CalendarService {
 

    // Delcartion
    URL = 'http://localhost/DentalClinic.API';

    constructor(private httpClient: HttpClient) {
    }


    getTodayPatients(): Observable<any> {
        return this.httpClient.get(this.URL + "/GetTodayPatients" );
    }


    getTommorowPatient(): Observable<any> {
        return this.httpClient.get(this.URL + "/GetTomorrowPatients");
    }

    getCurrentPatientDetails(currentPatientId: Number): Observable<any>{
        return this.httpClient.get(this.URL + "/GetCurrentPatientDetails/" + currentPatientId);
    }

    deleteAppointment(visitId: Number): Observable<any> {
        return this.httpClient.get(this.URL + "/DeleteAppointment/" + visitId);
    }
}
