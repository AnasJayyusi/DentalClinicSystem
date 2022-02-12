using ClinicSystem.API.Services;
using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ClinicSystem.API.Controllers
{
    public class CalendarApiController : ApiController
    {
        CalendarService _calendarService;

        public CalendarApiController()
        {
            _calendarService = new CalendarService();
        }

        [Route("GetTodayPatients")]
        [HttpGet]
        public IHttpActionResult GetTodayPatients()
        {
            try
            {
                List<LiteVisitInfo> visits = _calendarService.GetTodayPatients();
                return Ok(visits);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetTomorrowPatients")]
        [HttpGet]
        public IHttpActionResult GetTomorrowPatients()
        {
            try
            {
                List<LiteVisitInfo> visits = _calendarService.GetTomorrowPatients();
                return Ok(visits);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetCurrentPatientDetails/{currentPatientId}")]
        [HttpGet]
        public IHttpActionResult GetCurrentPatientDetails(int currentPatientId)
        {
            try
            {
                FullVisitInfo visits = _calendarService.GetCurrentPatientDetails(currentPatientId);
                return Ok(visits);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [Route("DeleteAppointment/{visitId}")]
        [HttpGet]
        public IHttpActionResult DeleteAppointment(int visitId)
        {
            try
            {
                _calendarService.DeleteAppointment(visitId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
