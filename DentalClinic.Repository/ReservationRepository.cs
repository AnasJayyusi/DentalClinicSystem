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
            List<string> workingHours = new List<string>() {
                "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
                "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00","16:30", "17:00" };

            List<DateTime?> reservedDateTime = _dbContext.Visits
                                                          .Where(x => DbFunctions.TruncateTime(booking.BookingTime) == DbFunctions.TruncateTime(x.VisitTime))
                                                          .Select(x => x.VisitTime)
                                                          .ToList();


            List<string> reservedHours = new List<string>();
            foreach (var item in reservedDateTime)
            {
                if (item.HasValue)
                    reservedHours.Add(item.Value.ToString("HH:mm"));
            }

            List<string> availableHours = workingHours.Except(reservedHours).ToList();
            return availableHours;
        }

        public List<LiteVisitInfo> GetNextPatientVisit(int patientId)
        {
            DateTime today = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day);
            List<LiteVisitInfo> lastVisit = _dbContext.Visits
                                           .Where(b => DbFunctions.TruncateTime(b.VisitTime) >= DbFunctions.TruncateTime(today))
                                           .Include(x => x.Patient)
                                           .Select(x => new LiteVisitInfo()
                                           {
                                               PatientId = x.PatientId,
                                               VisitId = x.Id,
                                               PatientName = x.Patient.FullName,
                                               VisitTime = x.VisitTime.Value,
                                               PhoneNumber = x.Patient.PhoneNumber
                                           })
                                           .OrderBy(x => x.VisitTime)
                                           .Where(x => x.PatientId == patientId)
                                           .ToList();

            return lastVisit;
        }

        public List<ProcedureNameDto> GetProceduresNames()
        {
            return _dbContext.OfficeProcedures
                .Select(x => new ProcedureNameDto
                {
                    Price = x.Price,
                    ProcedureName = x.ProcedureName
                }).ToList();
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

        public Invoice GetInvoice(int patientId)
        {

            Invoice invoice = _dbContext.Invoices
                             .SingleOrDefault(x => patientId == x.PatientId);

            return invoice;

        }
        public List<FinancialRecord> GetFinancialRecord(int patientId)
        {
            return _dbContext.FinancialRecords.Where(x => x.Invoice_PatientId == patientId)
                                              .ToList();
        }

        public void AddNewInvoice(Invoice invoice)
        {
            _dbContext.Invoices.Add(invoice);
            _dbContext.SaveChanges();
        }

        public void AddFinancialRecord(List<FinancialRecord> financialRecords, int patientId)
        {
            List<FinancialRecord> RemovedfinancialRecords = _dbContext.FinancialRecords
                                                                      .Where(x => x.Invoice_PatientId == patientId)
                                                                      .ToList();

            _dbContext.FinancialRecords.RemoveRange(RemovedfinancialRecords);
            _dbContext.FinancialRecords.AddRange(financialRecords);
            _dbContext.SaveChanges();
        }

        public void AddFinancialRecord(FinancialRecord financialRecord, int patientId)
        {
            List<FinancialRecord> originalList = _dbContext.FinancialRecords
                                                           .Where(x => x.Invoice_PatientId == patientId)
                                                           .ToList();
                                                       
            _dbContext.FinancialRecords.RemoveRange(originalList);
            originalList.Add(financialRecord);
            _dbContext.FinancialRecords.AddRange(originalList);
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

        public void UpdateInvoiceFullPrice(int patientId, decimal price)
        {
            Invoice dbInvoice = _dbContext.Invoices.Find(patientId);
            dbInvoice.FullPrice += price;
            _dbContext.SaveChanges();
        }


        public void DeleteFinancialRecord(int recordId)
        {
            var obj = _dbContext.FinancialRecords.Single(p => p.Id == recordId);
            _dbContext.FinancialRecords.Remove(obj);
            _dbContext.SaveChanges();
        }

    }
}
