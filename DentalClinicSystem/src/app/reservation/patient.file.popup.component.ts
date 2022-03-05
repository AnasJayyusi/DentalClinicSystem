import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { PatientFile, ProceduresName } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { map, startWith } from 'rxjs/operators';
import { ReservationService } from "./reservation.service.component";
import { DatePipe } from "@angular/common";
import { toaster } from "../toaster";
import { MatDialog } from "@angular/material";

@Component({
    selector: 'patient.file.popup',
    templateUrl: 'patient.file.popup.component.html',
    styleUrls: ['../sharedStyle.css'],

})
export class PatientFilePopup implements OnInit {
    _patientId: number;
    errors: any;
    proceduresNames: string[] = [];
    filteredOptions: Observable<string[]>;
    proceduresNamesWithPrice: ProceduresName[] = [];
    patientFileRecords: PatientFile[] = [];
    patientFile: PatientFile = new PatientFile();
    myControl = new FormControl();
    submitted = false;
    officeProcedureRequired: boolean;
    qtyRequired: boolean;
    priceRequired: boolean;
    toothCodeRequired: boolean;

    constructor(
        private toaster: toaster,
        private svc: ReservationService,
        private datepipe: DatePipe,
        private formBuilder: FormBuilder,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getProceduresNamesWithPrice();
        this.getPatientRecords();
    }

    ngAfterViewInit() {
        // child is set
    }

    // API 
    getPatientRecords() {
        this.svc.getPatientFile(this._patientId)
            .subscribe(
                result => {
                    this.patientFileRecords = result;
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.


                }
            );
    }

    getProceduresNamesWithPrice() {
        this.svc.getProceduresNamesWithPrice()
            .subscribe(
                result => {
                    this.proceduresNamesWithPrice = result;
                    this.proceduresNames = this.proceduresNamesWithPrice.map(x => x.ProcedureName)
                },
                error => {
                    this.toaster.render(ValidationMessages.Error)
                },
                () => {
                    // 'onCompleted' callback.


                }
            );
    }

     //Apis
    delete(id) {
        var answer = confirm("Are you sure want to delete this record?");
        if (answer) {
            this.svc.deletePatientRecord(id)
                .subscribe(
                    result => {
                        this.toaster.render(ValidationMessages.DeletedSuccessfully)
                    },
                    error => {
                        this.toaster.render(ValidationMessages.Error)
                    },
                    () => {
                        let ndx = this.patientFileRecords.findIndex(x => x.Id == id)
                        this.patientFileRecords.splice(ndx, 1)
                    }
                );
        }
        else
            return;
    }

    save(patientFile: PatientFile) {
        this.svc.savePatientRecord(patientFile)
            .subscribe(
                result => {
                    this.toaster.render(ValidationMessages.SavedSuccessfully);
                },
                error => {
                    this.toaster.render(ValidationMessages.Error);
                },
                () => {
                    // Reset All Inputs
                    this.patientFile = new PatientFile();
                    this.dialog.closeAll();
                    this.submitted = false;
                }
            );
    }

    // Dealing With Dom
    onSubmit(): void {
        this.submitted = true;
        this.resetValidations()
        if (!this.isValid()) {
            this.toaster.render(ValidationMessages.RequiredFieldsMissingPatientFile);
            return;
        }
        else {
            // Filling patient object
            this.patientFile.PatientId = this._patientId;
            this.save(this.patientFile);
        }
    }

    // Validations
    resetValidations() {
        this.officeProcedureRequired = false;
        this.priceRequired = false;
        this.qtyRequired = false;
        this.toothCodeRequired = false;
    }
    isValid() {
        if (this.patientFile.OfficeProcedure == null || this.patientFile.OfficeProcedure == undefined)
            this.officeProcedureRequired = true;

        if (this.patientFile.Qty == null || this.patientFile.Qty == undefined)
            this.qtyRequired = true;

        if (this.patientFile.Price == null || this.patientFile.Price == undefined)
            this.priceRequired = true;

        if (this.patientFile.ToothCode == null || this.patientFile.ToothCode == undefined)
            this.toothCodeRequired = true;

        if (this.officeProcedureRequired || this.qtyRequired || this.priceRequired || this.toothCodeRequired)
            return false;
        return true;
    }

    // Dealing With Dom
    search() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(startWith(''),
                map(value => this.filter(value)),
            );
    }

    filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        let selectedProc = this.proceduresNames.filter(option => option.toLowerCase().includes(filterValue));
        if (selectedProc.length == 1) {
            let officeProcedure = selectedProc[0];
            this.patientFile.OfficeProcedure = officeProcedure;
            this.setPrice(officeProcedure);
        }
        return selectedProc;
    }

    setPrice(procedureName: string) {
        let price = this.getPriceByProcdureName(procedureName);
        // Set it on form 
        this.patientFile.Price = price;
    }

    settoothCode(toothCode: number) {
        this.patientFile.ToothCode = toothCode;
    }

    // Helpers
    getPriceByProcdureName(procedureName: string) {
        let obj = this.proceduresNamesWithPrice.find(x => x.ProcedureName == procedureName)
        if (obj)
            return obj.Price;
        else
            0;
    }

   
}



