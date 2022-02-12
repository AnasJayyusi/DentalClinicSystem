export var ValidationMessages;
(function (ValidationMessages) {
    ValidationMessages[ValidationMessages["NotSet"] = 0] = "NotSet";
    ValidationMessages[ValidationMessages["SavedSuccessfully"] = 1] = "SavedSuccessfully";
    ValidationMessages[ValidationMessages["AlreadyRegistered"] = 2] = "AlreadyRegistered";
    ValidationMessages[ValidationMessages["RequiredFieldsMissing"] = 3] = "RequiredFieldsMissing";
    ValidationMessages[ValidationMessages["UpdatedSuccessfully"] = 4] = "UpdatedSuccessfully";
    ValidationMessages[ValidationMessages["Error"] = 5] = "Error";
    ValidationMessages[ValidationMessages["ResetAll"] = 6] = "ResetAll";
    ValidationMessages[ValidationMessages["NoPatientInThisName"] = 7] = "NoPatientInThisName";
    ValidationMessages[ValidationMessages["NoPatientWithThisNumber"] = 8] = "NoPatientWithThisNumber";
    ValidationMessages[ValidationMessages["DeletedSuccessfully"] = 9] = "DeletedSuccessfully";
    ValidationMessages[ValidationMessages["TimeIsMissing"] = 10] = "TimeIsMissing";
    ValidationMessages[ValidationMessages["DateIsMissing"] = 11] = "DateIsMissing";
    ValidationMessages[ValidationMessages["ChooseDate"] = 12] = "ChooseDate";
    ValidationMessages[ValidationMessages["AlreadyBooking"] = 13] = "AlreadyBooking";
    ValidationMessages[ValidationMessages["NoPatientNow"] = 14] = "NoPatientNow";
})(ValidationMessages || (ValidationMessages = {}));
var InvoiceType;
(function (InvoiceType) {
    InvoiceType[InvoiceType["Bill"] = 0] = "Bill";
    InvoiceType[InvoiceType["Paid"] = 1] = "Paid";
})(InvoiceType || (InvoiceType = {}));
//# sourceMappingURL=sharedEnum.js.map