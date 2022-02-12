using System;

namespace DentalClinic.Model.Dtos
{
    public class LiteVisitInfo
    {
        public int PatientId { get; set; }
        public int VisitId { get; set; }
        public string PatientName{ get; set; }
        public DateTime VisitTime { get; set; }
        public string PhoneNumber { get; set; }
    }
}
