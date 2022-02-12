using DentalClinic.DAL;
using DentalClinic.Model.Entities.Patients;
using System;
using System.Collections.Generic;
using System.Data.Linq.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;


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
            var obj = _dbContext.Patients.Single(p => p.Id == id);

            // Logical delete
            obj.IsDeleted = true;
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
