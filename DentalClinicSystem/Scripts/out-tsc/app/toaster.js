import { __decorate, __metadata } from "tslib";
import { ToastrService } from "ngx-toastr";
import { ValidationMessages } from "./sharedEnum";
import { Injectable } from '@angular/core';
let toaster = class toaster {
    constructor(toastr) {
        this.toastr = toastr;
    }
    render(validationMsgValue) {
        var position = 'toast-bottom-center';
        switch (validationMsgValue) {
            // Success
            case ValidationMessages.SavedSuccessfully:
                this.toastr.success("", "Saved Successfully.", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.UpdatedSuccessfully:
                this.toastr.success("", "Updated Successfully.", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.DeletedSuccessfully:
                this.toastr.success("", "Deleted Successfully.", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            // Info
            case ValidationMessages.ResetAll:
                this.toastr.info("", "All fields are reset.", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.NoPatientInThisName:
                this.toastr.info("No patient with this name.", "Not Found", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.NoPatientWithThisNumber:
                this.toastr.info("No Patient with this number", "Not Found", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.ChooseDate:
                this.toastr.info("Please choose a date before you booking time", "Cannnot Procced", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.NoPatientNow:
                this.toastr.info("There is no patient at the moment", "Not Found", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            // Warning
            case ValidationMessages.TimeIsMissing:
                this.toastr.warning("", "Select Time Please", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.DateIsMissing:
                this.toastr.warning("", "Select Date Please", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.RequiredFieldsMissing:
                this.toastr.warning("Required", "Fullname , Phonenumber , birthdate", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.AlreadyRegistered:
                this.toastr.warning("", "This patient already registered!", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            case ValidationMessages.AlreadyBooking:
                this.toastr.warning("", "This appointment is already taken!", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
            // Error 
            case ValidationMessages.Error:
                this.toastr.error("Some error occurred", "Error", { positionClass: position, "closeButton": true, "progressBar": true });
                break;
        }
    }
};
toaster = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToastrService])
], toaster);
export { toaster };
//# sourceMappingURL=toaster.js.map