using System;

namespace DentalClinic.Model.Dtos
{
    public class Booking
    {
        public int PatientId { get; set; }
        public DateTime BookingTime { get; set; }
    }
}
