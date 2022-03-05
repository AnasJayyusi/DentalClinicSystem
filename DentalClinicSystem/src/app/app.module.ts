import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { PatientComponent } from './patient/patient.component';
import { RouterModule } from '@angular/router';
import appRoutes from './routerConfig';
import { PatientListComponent } from './patient/patient.list.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { toaster } from './toaster';
import { MatNativeDateModule } from '@angular/material';
import { MaterialExampleModule } from '../material.module';
import { ReservationComponent } from './reservation/reservation.component';
import { BookingPopup } from './reservation/booking.popup.component';
import { FinancialRecordPopup } from './reservation/financial.record.popup.component';
import { PatientFilePopup } from './reservation/patient.file.popup.component';
import { ReportComponent } from './report/report.component';
import { BillingComponent } from './billing/billing.component';
import { BillingListComponent } from './billing/billing.list.component';
import { ShortNamePipe } from './customPipes';
import { PatientProfilePopup } from './reservation/patient.profile.popup.component';

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        PatientComponent,
        ReportComponent,
        BillingComponent,
        BillingListComponent,
        PatientListComponent,
        ReservationComponent,
        BookingPopup,
        FinancialRecordPopup,
        PatientFilePopup,
        PatientProfilePopup,
        ShortNamePipe
    ],
    imports: [
        BrowserModule, HttpClientModule,
        FormsModule, ReactiveFormsModule, // These are important to using [(NgModel)]
        FormsModule,
        MatNativeDateModule, MaterialExampleModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({ positionClass: 'inline' }),
        ToastContainerModule,
        NgxPaginationModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: false }),
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/DentalClinicSystem' }, DatePipe, toaster],
    bootstrap: [AppComponent],
    entryComponents: [BookingPopup, FinancialRecordPopup, PatientFilePopup, PatientProfilePopup]


})
export class AppModule { }
