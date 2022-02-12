using DentalClinic.Model.Entities.Patients;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Model.Entities.Reservation
{
    public class Invoice
    {
        [Key, ForeignKey("Patient")]
        public int PatientId { get; set; }

        public Patient Patient { get; set; }
        public decimal FullPrice { get; set; }
        public decimal Paid { get; set; }
        [NotMapped]
        public decimal Remaining
        {
            get { return FullPrice - Paid; }
        }
        public List<FinancialRecord> FinancialRecords { get; set; }
    }
}
