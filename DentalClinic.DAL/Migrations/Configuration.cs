namespace DentalClinic.DAL.Migrations
{
    using DentalClinic.Model.Entities.Patients;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DentalClinic.DAL.DentalClinicDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DentalClinic.DAL.DentalClinicDbContext context)
        {
            //  This method will be called after migrating to the latest version.
            // InsuranceTypes
            if (!context.InsuranceTypes.Any())
            {
                IList<InsuranceType> insuranceTypes = new List<InsuranceType>();
                insuranceTypes.Add(new InsuranceType() { InsuranceCompanyName = "لا يوجد", CreatedBy = "Admin", CreatedDate = System.DateTime.Now });
                insuranceTypes.Add(new InsuranceType() { InsuranceCompanyName = "MatHealth", CreatedBy = "Admin", CreatedDate = System.DateTime.Now });
                insuranceTypes.Add(new InsuranceType() { InsuranceCompanyName = "الكهرباء والوطنية", CreatedBy = "Admin", CreatedDate = System.DateTime.Now });
                insuranceTypes.Add(new InsuranceType() { InsuranceCompanyName = "شركة توزيع الكهرباء", CreatedBy = "Admin", CreatedDate = System.DateTime.Now });
                insuranceTypes.Add(new InsuranceType() { InsuranceCompanyName = "شركة توليد الكهرباء", CreatedBy = "Admin", CreatedDate = System.DateTime.Now });
                context.InsuranceTypes.AddRange(insuranceTypes);
                base.Seed(context);
            }
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
        }

    }
}
