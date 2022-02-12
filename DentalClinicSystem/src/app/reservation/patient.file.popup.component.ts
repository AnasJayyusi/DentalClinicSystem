import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FinancialRecord, Invoice, InvoiceType, Transaction } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { toaster } from "../toaster";
import { ReservationService } from "./reservation.service.component";

@Component({
    selector: 'patient.file.popup',
    templateUrl: 'patient.file.popup.component.html',
    styleUrls: ['../sharedStyle.css']
})
export class PatientFilePopup  {

    
}


