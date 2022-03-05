import { __decorate, __metadata } from "tslib";
import { Component } from "@angular/core";
import { FormControl, FormBuilder } from "@angular/forms";
import { PatientFile } from "../sharedDtos";
import { ValidationMessages } from "../sharedEnum";
import { map, startWith } from 'rxjs/operators';
import { ReservationService } from "./reservation.service.component";
import { DatePipe } from "@angular/common";
import { toaster } from "../toaster";
import { MatDialog } from "@angular/material";
let PatientFilePopup = class PatientFilePopup {
    constructor(toaster, svc, datepipe, formBuilder, dialog) {
        this.toaster = toaster;
        this.svc = svc;
        this.datepipe = datepipe;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.proceduresNames = [];
        this.proceduresNamesWithPrice = [];
        this.patientFileRecords = [];
        this.patientFile = new PatientFile();
        this.myControl = new FormControl();
        this.submitted = false;
    }
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
            .subscribe(result => {
            this.patientFileRecords = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
        });
    }
    getProceduresNamesWithPrice() {
        this.svc.getProceduresNamesWithPrice()
            .subscribe(result => {
            this.proceduresNamesWithPrice = result;
            this.proceduresNames = this.proceduresNamesWithPrice.map(x => x.ProcedureName);
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
        });
    }
    //Apis
    delete(id) {
        var answer = confirm("Are you sure want to delete this record?");
        if (answer) {
            this.svc.deletePatientRecord(id)
                .subscribe(result => {
                this.toaster.render(ValidationMessages.DeletedSuccessfully);
            }, error => {
                this.toaster.render(ValidationMessages.Error);
            }, () => {
                let ndx = this.patientFileRecords.findIndex(x => x.Id == id);
                this.patientFileRecords.splice(ndx, 1);
            });
        }
        else
            return;
    }
    save(patientFile) {
        this.svc.savePatientRecord(patientFile)
            .subscribe(result => {
            this.toaster.render(ValidationMessages.SavedSuccessfully);
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // Reset All Inputs
            this.patientFile = new PatientFile();
            this.dialog.closeAll();
            this.submitted = false;
        });
    }
    // Dealing With Dom
    onSubmit() {
        this.submitted = true;
        this.resetValidations();
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
            .pipe(startWith(''), map(value => this.filter(value)));
    }
    filter(value) {
        const filterValue = value.toLowerCase();
        let selectedProc = this.proceduresNames.filter(option => option.toLowerCase().includes(filterValue));
        if (selectedProc.length == 1) {
            let officeProcedure = selectedProc[0];
            this.patientFile.OfficeProcedure = officeProcedure;
            this.setPrice(officeProcedure);
        }
        return selectedProc;
    }
    setPrice(procedureName) {
        let price = this.getPriceByProcdureName(procedureName);
        // Set it on form 
        this.patientFile.Price = price;
    }
    settoothCode(toothCode) {
        this.patientFile.ToothCode = toothCode;
    }
    // Helpers
    getPriceByProcdureName(procedureName) {
        let obj = this.proceduresNamesWithPrice.find(x => x.ProcedureName == procedureName);
        if (obj)
            return obj.Price;
        else
            0;
    }
};
PatientFilePopup = __decorate([
    Component({
        selector: 'patient.file.popup',
        templateUrl: 'patient.file.popup.component.html',
        styleUrls: ['../sharedStyle.css'],
    }),
    __metadata("design:paramtypes", [toaster,
        ReservationService,
        DatePipe,
        FormBuilder,
        MatDialog])
], PatientFilePopup);
export { PatientFilePopup };
//# sourceMappingURL=patient.file.popup.component.js.map