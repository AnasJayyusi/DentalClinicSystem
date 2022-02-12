using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Reservation;
using DentalClinic.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClinicSystem.API.Services
{
    public class CalendarService
    {
        CalendarRepository _calendarRepository;
     
        public CalendarService()
        {
            _calendarRepository = new CalendarRepository();
        }
        internal List<LiteVisitInfo> GetTodayPatients()
        {
           return  _calendarRepository.GetTodayPatients();
        }

        internal List<LiteVisitInfo> GetTomorrowPatients()
        {
            return _calendarRepository.GetTomorrowPatients();
        }

        internal FullVisitInfo GetCurrentPatientDetails(int curretPatientId)
        {
            return _calendarRepository.GetCurrentPatientDetails(curretPatientId);
        }

        internal void DeleteAppointment(int visitId)
        {
            _calendarRepository.DeleteAppointment(visitId);
        }
    }
}