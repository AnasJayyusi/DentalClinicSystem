import { __decorate, __metadata } from "tslib";
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toaster } from '../toaster';
import { Patient } from '../sharedDtos';
import { ValidationMessages } from '../sharedEnum';
import { PatientService } from './patient.Service.component';
let PatientComponent = class PatientComponent {
    // Ctor  + ngOnInIt
    constructor(router, formBuilder, svc, datepipe, toaster) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.svc = svc;
        this.datepipe = datepipe;
        this.toaster = toaster;
        // Object + Services
        this.insuranceTypes = [];
        this.submitted = false;
        this.patient = new Patient();
    }
    ngOnInit() {
        this.getInsuranceType();
        this.checkForm();
        this.Title = "Add new patient info";
        // For Edit Mode
        if (this.svc._patientId != -1) {
            this.getPatientById();
            this.Title = "Edit patient nfo";
            this.isEditMode = true;
        }
    }
    ngOnDestroy() {
        this.patient = new Patient();
        this.svc._patientId = -1;
        this.Title = "Add New Patient";
        this.isEditMode = false;
    }
    // Gets / Sets
    get f() {
        return this.form.controls;
    }
    /*--------------------------------------------------------------------------------------------------------------------------------
    ------------------------------------------------------Main Functions-------------------------------------------------------------
    --------------------------------------------------------------------------------------------------------------------------------*/
    // Validations 
    checkForm() {
        this.form = this.formBuilder.group({
            fullname: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            birthdate: ['', Validators.required],
            gender: [''],
            job: [''],
            address: [''],
            surgeries: [''],
            medicines: [''],
            insurancetypeId: [''],
        });
    }
    // Dealing With Dom
    onSubmit() {
        this.submitted = true;
        // return when the form is invaild 
        if (this.form.invalid) {
            return;
        }
        // Filling patient object
        var obj = this.form.value;
        this.mappingObjToEntity(obj);
        if (this.isEditMode)
            this.update();
        else
            this.add();
    }
    onReset() {
        if (this.isEditMode)
            return;
        this.submitted = false;
        this.form.reset();
        this.toaster.render(ValidationMessages.ResetAll);
    }
    // APIs
    add() {
        this.svc.addNewPatient(this.patient)
            .subscribe(result => {
            this.toaster.render(result);
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            this.router.navigate(['Patient/PatientList'], { skipLocationChange: true });
        });
    }
    update() {
        this.svc.updatePatient(this.patient)
            .subscribe(result => {
            this.toaster.render(result);
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            this.router.navigate(['Patient/PatientList'], { skipLocationChange: true });
        });
    }
    getInsuranceType() {
        this.svc.getInsuranceType()
            .subscribe(result => {
            this.insuranceTypes = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
        });
    }
    getPatientById() {
        this.svc.getPatientById(this.svc._patientId)
            .subscribe(result => {
            this.patient = result;
        }, error => {
            this.toaster.render(ValidationMessages.Error);
        }, () => {
            // 'onCompleted' callback.
            this.mappingEntityTobj(this.patient);
            // No errors, route to new page here
        });
    }
    // Helper
    mappingObjToEntity(obj) {
        this.patient.FullName = obj.fullname;
        this.patient.Birthdate = new Date(obj.birthdate);
        this.patient.PhoneNumber = obj.phoneNumber;
        this.patient.Job = obj.job;
        this.patient.Address = obj.address;
        this.patient.Gender = obj.gender == '' ? 0 : obj.gender;
        this.patient.Surgeries = obj.surgeries;
        this.patient.Medicines = obj.medicines;
        this.patient.InsuranceTypeId = obj.insurancetypeId == '' ? 1 : Number(obj.insurancetypeId);
    }
    mappingEntityTobj(patient) {
        this.form.controls.fullname.setValue(patient.FullName);
        this.form.controls.birthdate.setValue(this.datepipe.transform(new Date(patient.Birthdate), 'yyyy-MM-dd'));
        this.form.controls.phoneNumber.setValue(patient.PhoneNumber);
        this.form.controls.job.setValue(patient.Job);
        this.form.controls.address.setValue(patient.Address);
        this.form.controls.gender.setValue(patient.Gender.toString());
        this.form.controls.surgeries.setValue(patient.Surgeries);
        this.form.controls.medicines.setValue(patient.Medicines);
        this.form.controls.insurancetypeId.setValue(patient.InsuranceTypeId.toString());
    }
};
PatientComponent = __decorate([
    Component({
        selector: 'patient-add',
        templateUrl: './patient.component.html',
        styleUrls: ['../sharedStyle.css']
    }),
    __metadata("design:paramtypes", [Router,
        FormBuilder,
        PatientService,
        DatePipe,
        toaster])
], PatientComponent);
export { PatientComponent };
//# sourceMappingURL=patient.component.js.map