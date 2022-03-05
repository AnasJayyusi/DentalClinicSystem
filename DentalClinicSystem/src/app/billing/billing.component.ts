import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bill, BillsAmount } from '../sharedDtos';
import { ValidationMessages } from '../sharedEnum';
import { toaster } from '../toaster';
import { BillingService } from './billing.service.component';

@Component({
    selector: 'app-report',
    templateUrl: './billing.component.html',
    styleUrls: ['../sharedStyle.css']
})
export class BillingComponent implements OnInit, OnDestroy {

    // Variables
    errors: any;
    title: string;
    form: FormGroup;
    isEditMode: boolean = false;
    billing: Bill[] = [];
    bill: Bill = new Bill();
    totalIncome: number;
    year: number;
    month: number;
    // Ctor  + ngOnInIt

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private datepipe: DatePipe,
        private toaster: toaster,
        private svc: BillingService) {
    }


    ngOnInit() {
        this.title = "Today's Bill"
        this.buildForm();
        // For Edit Mode
        if (this.svc._billId != -1) {
            this.getBillByDate(this.svc._billDate)
            this.title = "Edit old bill"
            this.isEditMode = true;
        }
        else {
            this.getBillByDate(new Date())
        }
        this.calculateTotalBillingOfMonth();
    }



    ngOnDestroy(): void {
        this.bill = new Bill();
        this.svc._billId = -1
        this.title = "Today's Bill"
        this.isEditMode = false;
    }


    /*--------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------Main Functions-------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------*/
    // Validations 
    buildForm() {
        this.form = this.formBuilder.group(
            {
                id: [''],
                billDate: [''],
                salary: [''],
                meterial: [''],
                rent: [''],
                electricity: [''],
                water: [''],
                tax: [''],
                ammanMunicipality: [''],
                clinicConsumables: [''],
                other: [''],
                note: [''],
            }
        );
    }

    calculateTotalBillingOfMonth() {

    }

    // Apis
    getBillByDate(date: Date) {
        let dateAsString = this.datepipe.transform(date, 'yyyy-MM-dd')
        this.form.controls.billDate.setValue(dateAsString);
        this.svc.getBillByDate(dateAsString)
            .subscribe(
                result => {
                    this.bill = result;
                    if (result == null)
                        this.toaster.render(ValidationMessages.NoBillForToday);
                    else
                        this.mappingEntityTobj(this.bill);

                },
                error => {
                    this.toaster.render(ValidationMessages.Error);
                },
                () => {
                }
            );
    }

    save() {
        this.svc.addNewBill(this.bill)
            .subscribe(
                result => {
                    this.toaster.render(ValidationMessages.SavedSuccessfully);
                },
                error => {
                    this.toaster.render(ValidationMessages.Error);
                },
                () => {
                    //this.router.navigate(['Patient/PatientList'], { skipLocationChange: true });
                }
            );
    }

    // Dealing With Dom
    onSubmit(): void {
        // Filling bill object
        var obj = this.form.value;
        this.mappingObjToEntity(obj);
        this.save();
    }



    getBillData() {
        this.onReset(true);
        this.getBillByDate(new Date(this.form.controls.billDate.value));
    }

    onReset(keepDate = false): void {
        var date = this.form.controls.billDate.value

        if (this.isEditMode)
            return;

        this.form.reset();

        if (keepDate)
            this.form.controls.billDate.setValue(date);

        if (!keepDate)
            this.toaster.render(ValidationMessages.ResetAll)
    }

    // Mapping
    mappingObjToEntity(obj) {
        this.bill = new Bill();
        this.bill.Id = obj.id
        this.bill.BillDate = new Date(obj.billDate);
        this.bill.Salary = obj.salary
        this.bill.Meterial = obj.meterial
        this.bill.Rent = obj.rent
        this.bill.Electricity = obj.electricity
        this.bill.Water = obj.water
        this.bill.Tax = obj.tax
        this.bill.AmmanMunicipality = obj.ammanMunicipality
        this.bill.ClinicConsumables = obj.clinicConsumables
        this.bill.Other = obj.other
        this.bill.Note = obj.note
    }

    mappingEntityTobj(bill: Bill) {
        this.form.controls.id.setValue(bill.Id);
        this.form.controls.billDate.setValue(this.datepipe.transform(new Date(bill.BillDate), 'yyyy-MM-dd'));
        this.form.controls.salary.setValue(bill.Salary);
        this.form.controls.meterial.setValue(bill.Meterial);
        this.form.controls.rent.setValue(bill.Rent);
        this.form.controls.electricity.setValue(bill.Electricity);
        this.form.controls.water.setValue(bill.Water);
        this.form.controls.tax.setValue(bill.Tax);
        this.form.controls.ammanMunicipality.setValue(bill.AmmanMunicipality);
        this.form.controls.clinicConsumables.setValue(bill.ClinicConsumables);
        this.form.controls.other.setValue(bill.Other);
        this.form.controls.note.setValue(bill.Note);
    }

}

