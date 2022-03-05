using DentalClinic.Model.Entities.Patients;
using System;

namespace DentalClinic.Model.Entities.Reservation
{
    public class PatientFile : IBaseEntity
    {
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public string OfficeProcedure { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
        public int ToothCode { get; set; }
        public string Comment { get; set; }
        public DateTime? Date { get; set; }
    }
}
