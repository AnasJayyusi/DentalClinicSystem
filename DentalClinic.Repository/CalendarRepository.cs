using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Repository
{
    public class CalendarRepository : DbContext
    {

        public List<LiteVisitInfo> GetTodayPatients()
        {
            DateTime today = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day);
            var visits = _dbContext.Visits
                                           .Where(b => DbFunctions.TruncateTime(b.VisitTime) == DbFunctions.TruncateTime(today))
                                           .Include(x => x.Patient)
                                           .Include(x => x.Patient.Invoice)
                                           .Select(x => new LiteVisitInfo()
                                           {
                                               PatientId = x.PatientId,
                                               IsPatientDeleted = x.Patient.IsDeleted,
                                               VisitId = x.Id,
                                               PatientName = x.Patient.FullName,
                                               VisitTime = x.VisitTime.Value,
                                               PhoneNumber = x.Patient.PhoneNumber
                                           })
                                           .Where(x => x.IsPatientDeleted == false)
                                           .OrderBy(x => x.VisitTime)
                                           .ToList();

            return visits;

        }

        public void AddPatientRecord(PatientFile patientFile)
        {
            _dbContext.PatientFiles.Add(patientFile);
            _dbContext.SaveChanges();
        }

        public void UpdatePatientRecord(PatientFile patientFile)
        {
            var obj = _dbContext.PatientFiles.Single(p => p.PatientId == patientFile.Id);
            // Set new values
            obj.UpdateDate = DateTime.Now;
            obj.OfficeProcedure = patientFile.OfficeProcedure;
            obj.Qty = patientFile.Qty;
            obj.Price = patientFile.Price;
            obj.ToothCode = patientFile.ToothCode;
            obj.Comment = patientFile.Comment;
            obj.Date = patientFile.Date;
            _dbContext.SaveChanges();
        }

        public List<LiteVisitInfo> GetTomorrowPatients()
        {
            DateTime Tomorrow = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day).AddDays(1);
            var visits = _dbContext.Visits
                                        .Where(b => DbFunctions.TruncateTime(b.VisitTime) == DbFunctions.TruncateTime(Tomorrow))
                                        .Include(x => x.Patient)
                                        .Include(x => x.Patient.Invoice)
                                        .Select(x => new LiteVisitInfo()
                                        {
                                            PatientId = x.PatientId,
                                            IsPatientDeleted = x.Patient.IsDeleted,
                                            VisitId = x.Id,
                                            PatientName = x.Patient.FullName,
                                            VisitTime = x.VisitTime.Value,
                                            PhoneNumber = x.Patient.PhoneNumber
                                        })
                                        .Where(x => x.IsPatientDeleted == false)
                                        .OrderBy(x => x.VisitTime)
                                        .ToList();
            return visits;
        }

        public FullVisitInfo GetCurrentPatientDetails(int curretPatientId)
        {
            var fullvisitDetail = new FullVisitInfo();
            Invoice invoice = _dbContext.Invoices.SingleOrDefault(x => x.PatientId == curretPatientId);
            if (invoice == null)
                fullvisitDetail.RemainingCost = 0;
            else
                fullvisitDetail.RemainingCost = invoice.Remaining;

            Visit visit = _dbContext.Visits.Where(x => x.PatientId == curretPatientId).OrderByDescending(x => x.VisitTime.Value).FirstOrDefault();
            fullvisitDetail.LastVisit = visit.VisitTime.Value;

            return fullvisitDetail;
        }

        public void DeleteAppointment(int visitId)
        {
            Visit visit = _dbContext.Visits.Single(x => x.Id == visitId);
            _dbContext.Visits.Remove(visit);
            _dbContext.SaveChanges();
        }


        public void DeletePatientRecord(int recordId)
        {
            PatientFile patientFile = _dbContext.PatientFiles.Single(x => x.Id == recordId);
            _dbContext.PatientFiles.Remove(patientFile);

            Invoice invoice = _dbContext.Invoices.SingleOrDefault(x => x.PatientId == patientFile.PatientId);
            invoice.FullPrice -= patientFile.Price;

            FinancialRecord record = _dbContext.FinancialRecords.First(x => x.InvoiceType == InvoiceType.Bill && x.Amount == patientFile.Price);
            _dbContext.FinancialRecords.Remove(record);

            _dbContext.SaveChanges();

        }

        public List<PatientFile> GetPatientFileRecords(int patientId)
        {
            return _dbContext.PatientFiles.Where(x => x.PatientId == patientId).ToList();
        }

    }
}
