using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Model.Entities.Reservation
{
    public class FinancialRecord : IBaseEntity
    {
        public decimal Amount { get; set; }
        public string Comment { get; set; }
        public InvoiceType InvoiceType { get; set; }
    }
}

public enum InvoiceType
{
    Bill,
    Paid
}
