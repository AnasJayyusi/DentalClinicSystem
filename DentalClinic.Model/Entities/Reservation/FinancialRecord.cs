using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Model.Entities.Reservation
{
    public class FinancialRecord : IBaseEntity
    {
        public decimal Amount { get; set; }
        public string Comment { get; set; }
        public InvoiceType InvoiceType { get; set; }

        [ForeignKey("Invoice")]
        public int? Invoice_PatientId { get; set; }
        public Invoice Invoice { get; set; }
    }
}

public enum InvoiceType
{
    Bill,
    Paid
}

