using System;

namespace DentalClinic.Model.Entities.Billing
{
    public class Bill : IBaseEntity
    {
        public DateTime BillDate { get; set; }
        public decimal Salary { get; set; }
        public decimal Meterial { get; set; }
        public decimal Rent { get; set; }
        public decimal Electricity { get; set; }
        public decimal Water { get; set; }
        public decimal Tax { get; set; }
        public decimal AmmanMunicipality { get; set; }
        public decimal ClinicConsumables { get; set; }
        public decimal Other { get; set; }
        public string Note { get; set; }
    }
}
