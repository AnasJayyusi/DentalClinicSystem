import { __decorate, __metadata } from "tslib";
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { toaster } from '../toaster';
import { ValidationMessages } from '../sharedEnum';
import { BookingPopup } from './booking.popup.component';
import { ReservationService } from './reservation.service.component';
import { FinancialRecordPopup } from './financial.record.popup.component';
import { PatientFilePopup } from './patient.file.popup.component';
let ReservationComponent = class ReservationComponent {
    // Ctor  + ngOnInIt
    constructor(svc, datepipe, commonSvc, dialog) {
        this.svc = svc;
        this.datepipe = datepipe;
        this.commonSvc = commonSvc;
        this.dialog = dialog;
        // Variables
        this.patientReservation = [];
    }
    ngOnInit() {
        this.getPatientsReservations();
    }
    /*--------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------------Main Functions-------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------------------------------*/
    // APIs
    getPatientsReservations() {
        this.svc.getPatientsReservations()
            .subscribe(result => {
            this.patientReservation = result;
            this.setRestOfProprties();
        }, error => {
            this.commonSvc.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    getPatientsReservationsByKeyword() {
        this.svc.getPatientsReservationsByKeyword(this.param)
            .subscribe(result => {
            this.patientReservation = result;
            this.setRestOfProprties();
        }, error => {
            this.commonSvc.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    // Dealing with Dom    
    setRestOfProprties() {
        this.patientReservation.forEach((patient) => {
            // Visits
            if (patient.Visits.length == 0) {
                patient.LastVisit = null;
                patient.NextVisit = null;
            }
            else {
                var sortedVisits = patient.Visits.sort((x, y) => +new Date(x.VisitTime) - +new Date(y.VisitTime));
                if (sortedVisits.length == 1) {
                    patient.NextVisit = new Date(sortedVisits[0].VisitTime);
                    patient.LastVisit = null;
                }
                if (sortedVisits.length > 1) {
                    patient.LastVisit = new Date(sortedVisits[sortedVisits.length - 2].VisitTime);
                    patient.NextVisit = new Date(sortedVisits[sortedVisits.length - 1].VisitTime);
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
        });
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
    openBookingPopup(patient) {
        const dialogRef = this.dialog.open(BookingPopup);
        dialogRef.componentInstance.patientId = Number(patient.PatientId);
        this.param = patient.FullName.toString();
        dialogRef.afterClosed().subscribe(result => {
            this.getPatientsReservationsByKeyword();
        });
    }
    // Popups
    openFinancialRecordPopup(patient) {
        const dialogRef = this.dialog.open(FinancialRecordPopup);
        dialogRef.componentInstance.patientId = Number(patient.PatientId);
        dialogRef.afterClosed().subscribe(result => {
            this.param = patient.FullName.toString();
            this.getPatientsReservationsByKeyword();
        });
    }
    openPatientFile(patient) {
        const dialogRef = this.dialog.open(PatientFilePopup);
        dialogRef.afterClosed().subscribe(result => {
        });
    }
};
ReservationComponent = __decorate([
    Component({
        selector: 'app-reservation',
        templateUrl: './reservation.component.html',
        styleUrls: ['../sharedStyle.css']
    }),
    __metadata("design:paramtypes", [ReservationService,
        DatePipe,
        toaster,
        MatDialog])
], ReservationComponent);
export { ReservationComponent };
//# sourceMappingURL=reservation.component.js.map