using DentalClinic.Model.Entities.Patients;
using DentalClinic.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClinicSystem.API.Services
{
    public class PatientService
    {
        PatientRepository _patientRepository;
        public PatientService()
        {
            _patientRepository = new PatientRepository();
        }

        #region Serve Api
        internal void AddNewPatient(Patient patient, out ValidationMessages message)
        {
            if (IsVaildObject(patient))
            {
                if (CheckIsPatientAlreadyExists(patient.FullName))
                    message = ValidationMessages.AlreadyRegistered;

                else
                {
                    Save(patient);
                    message = ValidationMessages.SavedSuccessfully;
                }
            }
            else
            {
                message = ValidationMessages.RequiredFieldsMissing;
            }
        }

        internal void UpdatePatient(Patient patient, out ValidationMessages message)
        {
            if (IsVaildObject(patient))
            {
                if (CheckIsPatientAlreadyExists(patient.Id, patient.FullName))
                    message = ValidationMessages.AlreadyRegistered;

                else
                {
                    Update(patient);
                    message = ValidationMessages.UpdatedSuccessfully;
                }
            }
            else
            {
                message = ValidationMessages.RequiredFieldsMissing;
            }

        }

        internal List<InsuranceType> GetInsuranceTypes()
        {
            return _patientRepository.GetInsuranceTypes();
        }

        internal List<Patient> GetPatients()
        {
            return _patientRepository.GetPatients();
        }

        internal Patient GetPatientById(int id)
        {
            return _patientRepository.GetPatientById(id);
        }

        internal List<Patient> GetPatientsByName(string name)
        {
            return _patientRepository.GetPatientsByName(name);
        }

        internal List<Patient> GetPatientsByPhoneNumber(string phoneNumber)
        {
            return _patientRepository.GetPatientsByPhoneNumber(phoneNumber);
        }
        #endregion

        #region Helper + Vaildations
        private bool IsVaildObject(Patient patient)
        {
            bool isVaild = false;
            if (patient != null)
            {
                if (!string.IsNullOrEmpty(patient.FullName) && !string.IsNullOrEmpty(patient.PhoneNumber) && patient.Birthdate != null)
                    isVaild = true;
            }
            return isVaild;
        }
        private bool CheckIsPatientAlreadyExists(string fullname)
        {
            return _patientRepository.IsPatientExists(fullname);
        }

        private bool CheckIsPatientAlreadyExists(int id, string fullname)
        {
            return _patientRepository.IsPatientExists(id, fullname);
        }
        #endregion

        #region Dealing With Database  Add / Update / Delete 
        private void Save(Patient patient)
        {
            _patientRepository.AddNewPatient(patient);
        }

        private void Update(Patient patient)
        {
            _patientRepository.UpdatePatient(patient);
        }

        internal void Delete(int id)
        {
            _patientRepository.DeletePatient(id);
        }

      


        #endregion

    }
}