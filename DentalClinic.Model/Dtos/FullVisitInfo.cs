using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Model.Dtos
{
    public class FullVisitInfo
    {
        public int PatientId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Time { get; set; }
        public decimal RemainingCost { get; set; }
        public DateTime LastVisit { get; set; }

    }
}
