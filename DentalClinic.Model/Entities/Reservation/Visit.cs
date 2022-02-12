using DentalClinic.Model.Entities.Patients;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Model.Entities.Reservation
{
    public class Visit : IBaseEntity
    {
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public DateTime? VisitTime { get; set; }
    }
}
