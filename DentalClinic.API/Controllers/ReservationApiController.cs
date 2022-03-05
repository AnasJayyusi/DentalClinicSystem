using ClinicSystem.API.Services;
using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ClinicSystem.API.Controllers
{
    public class ReservationApiController : ApiController
    {
        ReservationService _reservationService;
        public ReservationApiController()
        {
            _reservationService = new ReservationService();
        }

        [Route("GetPatientsReservations")]
        [HttpGet]
        public IHttpActionResult GetPatientsReservations()
        {
            try
            {
                List<PatientReservation> patientsReservations = _reservationService.GetPatientsReservations();
                return Ok(patientsReservations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetPatientsReservationsByKeyword/{kw}")]
        [HttpGet]
        public IHttpActionResult GetPatientsReservationsByKeyword(string kw)
        {
            try
            {
                List<PatientReservation> patientsReservations = _reservationService.GetPatientsReservationsByKeyword(kw);
                return Ok(patientsReservations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("BookNewAppointment")]
        [HttpPost]
        public IHttpActionResult BookNewAppointment(Booking booking)
        {
            try
            {
                _reservationService.BookNewAppointment(booking);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetAvailableHours")]
        [HttpPost]
        public IHttpActionResult GetAvailableTimes(Booking booking)
        {
            try
            {
                List<string> availableHours = _reservationService.GetAvailableHours(booking);
                return Ok(availableHours);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetNextPatientVisit/{patientId}")]
        [HttpGet]
        public IHttpActionResult GetNextPatientVisit(int patientId)
        {
            try
            {
                List<LiteVisitInfo> visits = _reservationService.GetNextPatientVisit(patientId);
                return Ok(visits);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetInvoice/{patientId}")]
        [HttpGet]
        public IHttpActionResult GetInvoice(int patientId)
        {
            try
            {
                Invoice invoice = _reservationService.GetInvoice(patientId);
                return Ok(invoice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetFinancialRecord/{patientId}")]
        [HttpGet]
        public IHttpActionResult GetFinancialRecord(int patientId)
        {
            try
            {
                List<FinancialRecord> financialrecords = _reservationService.GetFinancialRecord(patientId);
                return Ok(financialrecords);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("SaveInvoice")]
        [HttpPost]
        public IHttpActionResult SaveInvoice(Invoice invoice)
        {
            try
            {
                _reservationService.SaveInvoice(invoice);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteFinancialRecord/{recordId}")]
        [HttpGet]
        public IHttpActionResult DeleteFinancialRecord(int recordId)
        {
            try
            {
                _reservationService.DeleteFinancialRecord(recordId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetProceduresNames")]
        [HttpGet]
        public IHttpActionResult GetProceduresNames()
        {
            try
            {
                List<ProcedureNameDto> procedureNameDtos = _reservationService.GetProceduresNames();
                return Ok(procedureNameDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
