using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClinicSystem.API
{
    internal enum ValidationMessages
    {
        NotSet,
        SavedSuccessfully,
        AlreadyRegistered,
        RequiredFieldsMissing,
        UpdatedSuccessfully,
        Error,
        ResetAll,
        NoPatientInThisName,
        NoPatientWithThisNumber,
        DeletedSuccessfully,
        TimeIsMissing,
        DateIsMissing,
        ChooseDate,
        AlreadyBooking
    }
}