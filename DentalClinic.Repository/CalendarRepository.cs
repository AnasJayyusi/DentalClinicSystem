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
                                               VisitId = x.Id,
                                               PatientName = x.Patient.FullName,
                                               VisitTime = x.VisitTime.Value,
                                               PhoneNumber = x.Patient.PhoneNumber
                                           })
                                           .OrderBy(x => x.VisitTime)
                                           .ToList();

            return visits;

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
                                            VisitId = x.Id,
                                            PatientName = x.Patient.FullName,
                                            VisitTime = x.VisitTime.Value,
                                            PhoneNumber = x.Patient.PhoneNumber
                                        })
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

    }
}
