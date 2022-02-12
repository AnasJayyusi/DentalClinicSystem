using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DentalClinic.Repository
{
    public class ReservationRepository : DbContext
    {
        public List<PatientReservation> GetPatientsReservations()
        {
            return _dbContext.Patients.Where(x => !x.IsDeleted)
                       .Include(x => x.Visits)
                       .Include(x => x.Invoice)
                       .Select(p => new PatientReservation()
                       {

                           PatientId = p.Id,
                           FullName = p.FullName,
                           Age = DateTime.Now.Year - p.Birthdate.Year,
                           Visits = p.Visits,
                           Invoice = p.Invoice
                       }).ToList();
        }

        public List<PatientReservation> GetPatientsReservationsByKeyword(string parm)
        {
            return _dbContext.Patients.Where(x => !x.IsDeleted)
                       .Include(x => x.Visits)
                       .Include(x => x.Invoice)
                       .Select(p => new PatientReservation()
                       {
                           PatientId = p.Id,
                           PhoneNumber = p.PhoneNumber,
                           FullName = p.FullName,
                           Age = DateTime.Now.Year - p.Birthdate.Year,
                           Visits = p.Visits,
                           Invoice = p.Invoice
                       }).Where(x => x.FullName.Contains(parm) || x.PhoneNumber.Contains(parm)).ToList();
        }

        public List<string> GetAvailableHours(Booking booking)
        {
            List<string> workingHours = new List<string>() { "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00" };

            List<DateTime?> reservedDateTime = _dbContext.Visits.Where(x => DbFunctions.TruncateTime(booking.BookingTime) == DbFunctions.TruncateTime(x.VisitTime)).Select(x => x.VisitTime).ToList();


            List<string> reservedHours = new List<string>();
            foreach (var item in reservedDateTime)
            {
                if (item.HasValue)
                    reservedHours.Add(item.Value.ToString("HH:mm"));
            }

            List<string> availableHours = workingHours.Except(reservedHours).ToList();
            return availableHours;
        }

        public void BookNewAppointment(Booking booking)
        {
            var obj = new Visit()
            {
                PatientId = booking.PatientId,
                VisitTime = booking.BookingTime.ToLocalTime(),
                CreatedDate = DateTime.Now
            };

            _dbContext.Visits.Add(obj);
            _dbContext.SaveChanges();
        }

        public Invoice GetFinancialRecord(int patientId)
        {
            return _dbContext.Invoices
                             .Include(x => x.FinancialRecords)
                             .SingleOrDefault(x => patientId == x.PatientId);
        }

        public void AddNewInvoice(Invoice invoice)
        {
            _dbContext.Invoices.Add(invoice);
            _dbContext.SaveChanges();
        }


        public void UpdateInvoice(Invoice invoice)
        {
            Invoice dbInvoice = _dbContext.Invoices.Find(invoice.PatientId);

            dbInvoice.FullPrice = invoice.FullPrice;
            dbInvoice.Paid = invoice.Paid;
            dbInvoice.FinancialRecords = invoice.FinancialRecords;

            _dbContext.SaveChanges();
        }

    }
}
