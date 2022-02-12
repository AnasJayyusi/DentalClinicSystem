import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toaster } from '../toaster';
import { Patient } from '../sharedDtos';
import { ValidationMessages } from '../sharedEnum';
import { PatientService } from './patient.Service.component';

@Component({
    selector: 'patient-list',
    templateUrl: './patient.list.component.html',
    styleUrls: ['../sharedStyle.css']
})

export class PatientListComponent implements OnInit {


    // Variables
    patients: Patient[] = [];
    param: string;
    errors: any;

    // Ctor  + ngOnInIt
    constructor(private router: Router, private svc: PatientService, private toaster: toaster) { }

    ngOnInit(): void {
        this.getPatients()
    }


    /*--------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------------Main Functions-------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------------------------------*/
    // APIs
    getPatients() {
        this.svc.getPatients()
            .subscribe(
                result => {
                    this.patients = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    // No errors, route to new page here
                }
            );
    }

    getPatientsByName() {
        this.svc.getPatientByName(this.param)
            .subscribe(
                result => {
                    this.patients = result;
                    if (this.patients.length == 0)
                        this.toaster.render(ValidationMessages.NoPatientInThisName)

                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    // No errors, route to new page here
                }
            );
    }

    getPatientsByPhoneNumber() {
        this.svc.getPatientsByPhoneNumber(this.param)
            .subscribe(
                result => {
                    this.patients = result;
                    if (this.patients.length == 0)
                        this.toaster.render(ValidationMessages.NoPatientWithThisNumber)
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    // No errors, route to new page here
                }
            );
    }

    delete(id, fullname) {
        var answer = confirm("Are you sure want to delete (" + fullname +") from the system?");
        if (answer) {
            this.svc.deletePatient(id)
                .subscribe(
                    result => {
                        this.toaster.render(ValidationMessages.DeletedSuccessfully)
                    },
                    error => {
                        this.toaster.render(ValidationMessages.Error)
                    },
                    () => {
                        this.param = null;
                        this.search("Enter");
                    }
                );
        }
        else
            return;
    }
    // Dealing With Dom
    edit(patientId) {
        this.svc._patientId = Number(patientId);
        this.router.navigate(['Patient/edit', patientId], { skipLocationChange: true });
    }

    search(e) {
        if (e == "Refresh") {
            this.getPatients();
            this.param = null;
            return;
        }

        if (e.key == "Enter" || e == "Enter") {
            if (this.param == null || this.param == "" || this.param == undefined) {
                this.getPatients();
            }
            else {
                let isPhoneNumber = /^\d+$/.test(this.param);

                if (isPhoneNumber)
                    this.getPatientsByPhoneNumber()
                else
                    this.getPatientsByName()
            }
        }
    }
}