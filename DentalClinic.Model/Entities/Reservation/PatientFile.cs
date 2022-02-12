using DentalClinic.Model.Entities.Patients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Model.Entities.Reservation
{
    public class PatientFile : IBaseEntity
    {
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public string Comment { get; set; }
        public DateTime? Date { get; set; }
        public string ImagePath { get; set; }
    }
}
