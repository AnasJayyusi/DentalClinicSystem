import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { toaster } from "../toaster";
import { Booking, LiteVisitInfo } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { ReservationService } from "./reservation.service.component";
import { CalendarService } from "../calendar/calendart.service.component";

@Component({
    selector: 'booking-popup',
    templateUrl: 'booking.popup.component.html',
    styleUrls: ['../sharedStyle.css']
})
export class BookingPopup implements OnInit, OnDestroy {
    patientId: number;
    bookTime: any;
    bookDate: any;
    bookingDateTime: Date;
    booking: Booking;
    availableHours: string[] = [];
    visits: LiteVisitInfo[] = [];
    isDateSelected: boolean = false;
    canSend: boolean;
    hasAlreadyAppointment: boolean = false;

    constructor(
        private toaster: toaster,
        private svc: ReservationService,
        private calendarsvc: CalendarService,
        private datepipe: DatePipe,
        public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getNextPatientVisit()
    }

    // Dealing With Dom
    addAppointment() {
        if (this.patientId == undefined || this.patientId == -1 || this.patientId == null) {
            this.toaster.render(ValidationMessages.Error)
        }
        else {
            if (this.bookDate == undefined || this.bookDate == null) {
                this.toaster.render(ValidationMessages.DateIsMissing)

                return;
            }

            if (this.bookTime == undefined || this.bookTime == null) {
                this.toaster.render(ValidationMessages.TimeIsMissing)
                return;
            }

            this.combineDateTime();

            if (this.canSend)
                this.bookNewAppointment()

        }

    }

    combineDateTime() {
        var date = new Date(this.datepipe.transform(new Date(this.bookDate), 'yyyy-MM-dd'));

        var getHourFromString = this.bookTime.substring(0, 2);
        date.setHours(getHourFromString);

        var getMinFromString = this.bookTime.substring(3, 5);
        date.setMinutes(getMinFromString)

        this.bookingDateTime = date;

        this.isVaildToSend(getHourFromString, getMinFromString)
    }

    // APIs
    bookNewAppointment() {
        this.booking = new Booking();
        this.booking.BookingTime = this.bookingDateTime
        this.booking.PatientId = this.patientId;

        this.svc.bookNewAppointment(this.booking)
            .subscribe(
                result => {
                    this.toaster.render(ValidationMessages.SavedSuccessfully)
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    this.dialog.closeAll();
                }
            );
    }

    getAvailableHours() {
        this.isDateSelected = true;
        var date = new Date(this.datepipe.transform(new Date(this.bookDate), 'yyyy-MM-dd'));

        this.booking = new Booking();
        this.booking.BookingTime = date;
        this.booking.PatientId = this.patientId;

        this.svc.getAvailableHours(this.booking)
            .subscribe(
                result => {
                    this.availableHours = result;
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

    getNextPatientVisit() {
        this.svc.getNextPatientVisit(this.patientId)
            .subscribe(
                result => {
                    this.visits = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    this.hasAlreadyAppointment = this.visits.length > 0 ? true : false
                }
            );

    }

    deleteAppointment(visitId) {
        var answer = confirm("Are you sure want to delete this appointment from the system?");
        if (answer) {
            this.calendarsvc.deleteAppointment(visitId)
                .subscribe(
                    result => {
                        this.toaster.render(ValidationMessages.DeletedSuccessfully);
                    },
                    error => {
                        this.toaster.render(ValidationMessages.Error)
                    },
                    () => {
                        let ndx = this.visits.findIndex(x => x.VisitId == visitId)
                        this.visits.splice(ndx, 1)
                        if (this.visits.length == 0)
                            this.hasAlreadyAppointment = false;
                    }
                );
        }
        else
            return;
    }
    // Validations
    isVaildToSend(hours, minutes) {
        if (!this.isTimeAvalaible(hours + ":" + minutes)) {
            this.toaster.render(ValidationMessages.AlreadyBooking)
            this.canSend = false;
        }
        else
            this.canSend = true;
    }

    // Helpers
    isTimeAvalaible(time) {
        if (this.availableHours.length != 0 && this.isDateSelected)
            if (this.availableHours.findIndex(x => x == time) > -1)
                return true;
        return false;
    }

    // UI 
    showWarningMessage() {
        if (!this.isDateSelected)
            this.toaster.render(ValidationMessages.ChooseDate)
    }

    ngOnDestroy(): void {
    }

}
