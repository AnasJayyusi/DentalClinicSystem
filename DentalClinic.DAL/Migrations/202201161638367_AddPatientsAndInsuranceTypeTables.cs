namespace DentalClinic.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPatientsAndInsuranceTypeTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.InsuranceTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InsuranceCompanyName = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        UpdateDate = c.DateTime(),
                        CreatedBy = c.String(),
                        UpdatedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Patients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FullName = c.String(nullable: false, maxLength: 250),
                        PhoneNumber = c.String(nullable: false, maxLength: 10),
                        Birthdate = c.DateTime(nullable: false),
                        Gender = c.Int(nullable: false),
                        Job = c.String(maxLength: 250),
                        Address = c.String(maxLength: 250),
                        Surgeries = c.String(),
                        Medicines = c.String(),
                        InsuranceTypeId = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        UpdateDate = c.DateTime(),
                        CreatedBy = c.String(),
                        UpdatedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.InsuranceTypes", t => t.InsuranceTypeId, cascadeDelete: true)
                .Index(t => t.InsuranceTypeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Patients", "InsuranceTypeId", "dbo.InsuranceTypes");
            DropIndex("dbo.Patients", new[] { "InsuranceTypeId" });
            DropTable("dbo.Patients");
            DropTable("dbo.InsuranceTypes");
        }
    }
}
