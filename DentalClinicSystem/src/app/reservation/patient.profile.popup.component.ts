import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PatientComponent } from "../patient/patient.component";

@Component({
    selector: 'patient.profile.popup',
    templateUrl: 'patient.profile.popup.component.html',
    styleUrls: ['../sharedStyle.css'],
   
})
export class PatientProfilePopup {
    patientId: number;
    @ViewChild('patientProfile', { static: false }) public PatientComponent: PatientComponent;

    ngAfterViewInit() {
        // child is set
    }

}


