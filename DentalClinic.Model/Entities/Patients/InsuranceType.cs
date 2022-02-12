using System.Collections.Generic;

namespace DentalClinic.Model.Entities.Patients
{
    public class InsuranceType : IBaseEntity
    {
        public string InsuranceCompanyName { get; set; }
        public List<Patient> Patienst { get; set; }
    }
}
