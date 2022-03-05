import { __decorate, __metadata } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { PatientComponent } from "../patient/patient.component";
let PatientProfilePopup = class PatientProfilePopup {
    ngAfterViewInit() {
        // child is set
    }
};
__decorate([
    ViewChild('patientProfile', { static: false }),
    __metadata("design:type", PatientComponent)
], PatientProfilePopup.prototype, "PatientComponent", void 0);
PatientProfilePopup = __decorate([
    Component({
        selector: 'patient.profile.popup',
        templateUrl: 'patient.profile.popup.component.html',
        styleUrls: ['../sharedStyle.css'],
    })
], PatientProfilePopup);
export { PatientProfilePopup };
//# sourceMappingURL=patient.profile.popup.component.js.map