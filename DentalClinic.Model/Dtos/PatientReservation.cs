using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Model.Dtos
{
    public class PatientReservation
    {
        public int PatientId { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public decimal FullPrice { get; set; }
        public decimal Remaining { get; set; }
        public decimal Paid { get; set; }
        public List<Visit> Visits { get; set; }
        public Invoice Invoice { get; set; }
        public DateTime? CreatedDate { get; set; }

        [NotMapped]
        public string PhoneNumber { get; set; }
    }
}
