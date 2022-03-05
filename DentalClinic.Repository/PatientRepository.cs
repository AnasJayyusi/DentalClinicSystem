using DentalClinic.Model.Entities.Patients;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DentalClinic.Repository
{
    public class PatientRepository : DbContext
    {
        public void AddNewPatient(Patient patient)
        {
            _dbContext.Patients.Add(patient);
            _dbContext.SaveChanges();
        }

        public void UpdatePatient(Patient patient)
        {
            var obj = _dbContext.Patients.Single(p => p.Id == patient.Id);

            // Set New values
            obj.UpdateDate = DateTime.Now;
            obj.FullName = patient.FullName;
            obj.PhoneNumber = patient.PhoneNumber;
            obj.Job = patient.Job;
            obj.Address = patient.Address;
            obj.Gender = patient.Gender;
            obj.Surgeries = patient.Surgeries;
            obj.Medicines = patient.Medicines;
            obj.InsuranceTypeId = patient.InsuranceTypeId;

            _dbContext.SaveChanges();
        }

        public void DeletePatient(int id)
        {
            var financialRecords = _dbContext.FinancialRecords.Where(p => p.Invoice_PatientId == id).ToList();
            _dbContext.FinancialRecords.RemoveRange(financialRecords);

            var invoice = _dbContext.Invoices.Single(p => p.PatientId == id);
            _dbContext.Invoices.Remove(invoice);

            var visits = _dbContext.Visits.Where(p => p.PatientId == id).ToList();
            _dbContext.Visits.RemoveRange(visits);

            var patientFiles= _dbContext.PatientFiles.Where(x=>x.PatientId == id).ToList();
            _dbContext.PatientFiles.RemoveRange(patientFiles);

            _dbContext.Invoices.Remove(invoice);

            var patient = _dbContext.Patients.Single(p => p.Id == id);
            _dbContext.Patients.Remove(patient);

            _dbContext.SaveChanges();
        }

        public bool IsPatientExists(string fullname)
        {
            var result = _dbContext.Patients
                                   .Where(p => p.FullName == fullname && !p.IsDeleted);

            return result.Any();
        }

        public bool IsPatientExists(int id, string fullname)
        {
            var result = _dbContext.Patients
                                   .Where(p => p.FullName == fullname && p.Id != id && !p.IsDeleted);

            return result.Any();
        }

        public List<InsuranceType> GetInsuranceTypes()
        {
            return _dbContext.InsuranceTypes.ToList();
        }

        public List<Patient> GetPatients()
        {
            return _dbContext.Patients.Where(p => !p.IsDeleted).ToList();
        }

        public List<Patient> GetPatientsByName(string name)
        {
            return _dbContext.Patients.Where(x => x.FullName.Contains(name) && !x.IsDeleted).ToList();
        }

        public List<Patient> GetPatientsByPhoneNumber(string phoneNumber)
        {
            return _dbContext.Patients.Where(x => x.PhoneNumber.Contains(phoneNumber) && !x.IsDeleted).ToList();
        }

        public Patient GetPatientById(int id)
        {
            return _dbContext.Patients.Single(x => x.Id == id && !x.IsDeleted);
        }


    }
}
