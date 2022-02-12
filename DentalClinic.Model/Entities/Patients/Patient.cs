
using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinic.Model.Entities.Patients
{
    public class Patient : IBaseEntity
    {
        [Required]
        [StringLength(250)]
        public string FullName { get; set; }

        [Required]
        [StringLength(10)]
        public string PhoneNumber { get; set; }

        [Required]
        public DateTime Birthdate { get; set; }

        public Gender Gender { get; set; }

        [StringLength(250)]
        public string Job { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        public string Surgeries { get; set; }

        public string Medicines { get; set; }

        public int InsuranceTypeId { get; set; }

        public InsuranceType InsuranceType { get; set; }
        public Invoice Invoice { get; set; }
        public List<Visit> Visits { get; set; }
        public List<PatientFile> PatientFiles { get; set; }
    }
}
public enum Gender
{
    NotSet,
    Male,
    Female
}