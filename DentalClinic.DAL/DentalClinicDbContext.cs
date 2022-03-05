
using DentalClinic.DAL;
using DentalClinic.Model.Entities.Billing;
using DentalClinic.Model.Entities.Common;
using DentalClinic.Model.Entities.Patients;
using DentalClinic.Model.Entities.Reservation;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DentalClinic.DAL
{

    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class DentalClinicDbContext : IdentityDbContext<ApplicationUser>
    {
        public DentalClinicDbContext() : base("DentalClinic", throwIfV1Schema: false)
        {
        }

        public static DentalClinicDbContext Create()
        {
            return new DentalClinicDbContext();
        }

        // DbSet here represent table in database
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<InsuranceType> InsuranceTypes { get; set; }
        public virtual DbSet<Visit> Visits { get; set; }
        public virtual DbSet<PatientFile> PatientFiles { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<FinancialRecord> FinancialRecords { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<OfficeProcedure> OfficeProcedures { get; set; }
    }
}

public class DentalClinicDBInitializer : DropCreateDatabaseAlways<DentalClinicDbContext>
{

}
