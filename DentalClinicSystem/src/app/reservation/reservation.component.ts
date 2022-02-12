import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { toaster } from '../toaster';
import { Patient, PatientReservation } from '../sharedDtos';
import { ValidationMessages } from '../sharedEnum';
import { BookingPopup } from './booking.popup.component';
import { ReservationService } from './reservation.service.component';
import { FinancialRecordPopup } from './financial.record.popup.component';
import { PatientFilePopup } from './patient.file.popup.component';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['../sharedStyle.css']
})

export class ReservationComponent implements OnInit {

    // Variables
    patientReservation: PatientReservation[] = [];
    param: string;
    errors: any;

    // Ctor  + ngOnInIt
    constructor(
        private svc: ReservationService,
        private datepipe: DatePipe,
        private commonSvc: toaster,
        public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getPatientsReservations()
    }


    /*--------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------------Main Functions-------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------------------------------*/
    // APIs
    getPatientsReservations() {
        this.svc.getPatientsReservations()
            .subscribe(
                result => {
                    this.patientReservation = result;
                    this.setRestOfProprties();
                },
                error => {
                    this.commonSvc.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    // No errors, route to new page here
                }
            );
    }

    getPatientsReservationsByKeyword() {
        this.svc.getPatientsReservationsByKeyword(this.param)
            .subscribe(
                result => {
                    this.patientReservation = result;
                    this.setRestOfProprties();
                },
                error => {
                    this.commonSvc.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.
                    // No errors, route to new page here
                }
            );
    }

    // Dealing with Dom    
    setRestOfProprties() {
        this.patientReservation.forEach((patient: PatientReservation) => {
            // Visits
            if (patient.Visits.length == 0) {
                patient.LastVisit = null;
                patient.NextVisit = null
            }
            else {
                var sortedVisits = patient.Visits.sort((x, y) => +new Date(x.VisitTime) - +new Date(y.VisitTime));
                if (sortedVisits.length == 1) {
                    patient.NextVisit = new Date(sortedVisits[0].VisitTime)
                    patient.LastVisit = null;
                }

                if (sortedVisits.length > 1) {
                    patient.LastVisit = new Date(sortedVisits[sortedVisits.length - 2].VisitTime)
                    patient.NextVisit = new Date(sortedVisits[sortedVisits.length - 1].VisitTime)
                }


                //patient.NextVisit = "غير محدد"
            }

            if (patient.Invoice == null) {
                patient.FullPrice = 0;
                patient.Remaining = 0;
                patient.Paid = 0;
            }
            else {
                patient.FullPrice = patient.Invoice.FullPrice;
                patient.Remaining = patient.Invoice.Remaining;
                patient.Paid = patient.Invoice.Paid;
            }
        })
    }

    search(e) {
        if (e == "Refresh") {
            this.getPatientsReservations();
            this.param = null;
            return;
        }

        if (e.key == "Enter" || e == "Enter") {
            if (this.param == null || this.param == "" || this.param == undefined) {
                this.getPatientsReservations();
            }
            else {
                this.getPatientsReservationsByKeyword();
            }
        }
    }

    // Popups
    openBookingPopup(patient: Patient) {
        const dialogRef = this.dialog.open(BookingPopup);
        dialogRef.componentInstance.patientId = Number(patient.PatientId);
        this.param = patient.FullName.toString();
        dialogRef.afterClosed().subscribe(result => {
            this.getPatientsReservationsByKeyword();
        });
    }

    // Popups
    openFinancialRecordPopup(patient: Patient) {
        const dialogRef = this.dialog.open(FinancialRecordPopup);
        dialogRef.componentInstance.patientId = Number(patient.PatientId);

        dialogRef.afterClosed().subscribe(result => {
            this.param = patient.FullName.toString();
            this.getPatientsReservationsByKeyword();
        });
    }

    openPatientFile(patient: Patient) {
        const dialogRef = this.dialog.open(PatientFilePopup);

        dialogRef.afterClosed().subscribe(result => {
        });
    }


}
