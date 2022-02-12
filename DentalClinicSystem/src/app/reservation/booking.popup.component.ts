import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { toaster } from "../toaster";
import { Booking } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { ReservationService } from "./reservation.service.component";

@Component({
    selector: 'booking-popup',
    templateUrl: 'booking.popup.component.html',
    styleUrls: ['../sharedStyle.css']
})
export class BookingPopup {
    patientId: number;
    bookTime: any;
    bookDate: any;
    bookingDateTime: Date;
    booking: Booking;
    availableHours: string[] = [];
    isDateSelected: boolean = false;
    canSend: boolean;

    constructor(private toaster: toaster, private svc: ReservationService, private datepipe: DatePipe, public dialog: MatDialog) { }
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

}
