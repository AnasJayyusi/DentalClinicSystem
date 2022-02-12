using ClinicSystem.API.Services;
using DentalClinic.Model.Entities.Patients;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;


namespace ClinicSystem.API.Controllers
{
    public class PatientApiController : ApiController
    {
        PatientService _patientService;
        public PatientApiController()
        {
            _patientService = new PatientService();
        }

        [Route("GetInsuranceType")]
        [HttpGet]
        public IHttpActionResult GetInsuranceType()
        {
            try
            {
                List<InsuranceType> InsuranceTypes = _patientService.GetInsuranceTypes();
                return Ok(InsuranceTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("AddNewPatient")]
        [HttpPost]
        public IHttpActionResult AddNewPatient(Patient patient)
        {
            try
            {
                ValidationMessages message = ValidationMessages.SavedSuccessfully;
                _patientService.AddNewPatient(patient, out message);
                return Content(HttpStatusCode.OK, message);
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }

        [Route("UpdatePatient")]
        [HttpPost]
        public IHttpActionResult UpdatePatient(Patient patient)
        {
            try
            {
                ValidationMessages message = ValidationMessages.UpdatedSuccessfully;
                _patientService.UpdatePatient(patient, out message);
                return Content(HttpStatusCode.OK, message);
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }

        [Route("GetPatients")]
        [HttpGet]
        public IHttpActionResult GetPatients()
        {
            try
            {
                List<Patient> patients = _patientService.GetPatients();
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetPatientById/{id}")]
        [HttpGet]
        public IHttpActionResult GetPatientById(int id)
        {
            try
            {
                Patient patient = _patientService.GetPatientById(id);
                return Ok(patient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetPatientsByName/{name}")]
        [HttpGet]
        public IHttpActionResult GetPatientsByName(string name)
        {
            try
            {
                List<Patient> patients = _patientService.GetPatientsByName(name);
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetPatientsByPhoneNumber/{PhoneNumber}")]
        [HttpGet]
        public IHttpActionResult GetPatientsByPhoneNumber(string phoneNumber)
        {
            try
            {
                List<Patient> patients = _patientService.GetPatientsByPhoneNumber(phoneNumber);
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeletePatient/{id}")]
        [HttpGet]
        public IHttpActionResult DeletePatient(int id)
        {
            try
            {
                 _patientService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
