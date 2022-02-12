import { __decorate, __metadata } from "tslib";
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FullVisitInfo } from '../sharedDtos';
import { ValidationMessages } from '../sharedEnum';
import { toaster } from '../toaster';
import { CalendarService } from './calendart.service.component';
let CalendarComponent = class CalendarComponent {
    // Ctor  + ngOnInIt
    constructor(toaster, svc) {
        this.toaster = toaster;
        this.svc = svc;
        // Variables
        this.todayPatients = [];
        this.tommorowPatients = [];
        this.fullVisitInfo = new FullVisitInfo();
    }
    ngOnInit() {
        this.getTodayPatient();
        this.getTommorowPatient();
        this.getCurrentPatientDetails();
    }
    // APIs
    getTodayPatient() {
        this.svc.getTodayPatients()
            .subscribe(result => {
            this.todayPatients = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    getTommorowPatient() {
        this.svc.getTommorowPatient()
            .subscribe(result => {
            this.tommorowPatients = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    getCurrentPatientDetails() {
        var datePipe = new DatePipe('en-US');
        var date = new Date();
        date.setMinutes(0, 0);
        var currentTime = datePipe.transform(date, 'shortTime');
        this.todayPatients.forEach(obj => {
            let visitTime = datePipe.transform(obj.VisitTime, 'shortTime');
            if (visitTime == currentTime) {
                this.fullVisitInfo.PatientId = obj.PatientId;
                this.fullVisitInfo.Name = obj.PatientName;
                this.fullVisitInfo.PhoneNumber = obj.PhoneNumber.toString();
                this.fullVisitInfo.Time = obj.VisitTime;
            }
        });
        if (this.fullVisitInfo.PatientId != undefined && this.fullVisitInfo.PatientId != null) {
            this.svc.getCurrentPatientDetails(this.fullVisitInfo.PatientId)
                .subscribe(result => {
                this.fullVisitInfo.RemainingCost = result.RemainingCost;
                this.fullVisitInfo.LastVisit = result.LastVisit;
            }, error => {
                this.toaster.render(ValidationMessages.Error);
            }, () => {
            });
        }
        if (Object.keys(this.fullVisitInfo).length == 0)
            this.toaster.render(ValidationMessages.NoPatientNow);
    }
    deleteAppointment(visitId) {
        var answer = confirm("Are you sure want to delete this appointment from the system?");
        if (answer) {
            this.svc.deleteAppointment(visitId)
                .subscribe(result => {
                this.toaster.render(ValidationMessages.DeletedSuccessfully);
            }, error => {
                this.toaster.render(ValidationMessages.Error);
            }, () => {
                this.getTodayPatient();
                this.getTommorowPatient();
                this.getCurrentPatientDetails();
            });
        }
        else
            return;
    }
};
CalendarComponent = __decorate([
    Component({
        selector: 'app-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['calendar.component.css']
    }),
    __metadata("design:paramtypes", [toaster,
        CalendarService])
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map