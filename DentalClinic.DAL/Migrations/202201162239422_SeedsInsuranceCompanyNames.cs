namespace DentalClinic.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SeedsInsuranceCompanyNames : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.InsuranceTypes", "InsuranceCompanyName", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.InsuranceTypes", "InsuranceCompanyName", c => c.Int(nullable: false));
        }
    }
}
