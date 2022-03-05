namespace DentalClinic.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProcedureTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OfficeProcedures",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProcedureName = c.String(),
                        Price = c.Double(nullable: false),
                        CreatedDate = c.DateTime(),
                        UpdateDate = c.DateTime(),
                        CreatedBy = c.String(),
                        UpdatedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.PatientFiles", "Amount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.PatientFiles", "OfficeProcedure", c => c.String());
            AddColumn("dbo.PatientFiles", "Qty", c => c.Int(nullable: false));
            AddColumn("dbo.PatientFiles", "ToothCode", c => c.Int(nullable: false));
            AddColumn("dbo.PatientFiles", "Price", c => c.Double(nullable: false));
            DropColumn("dbo.PatientFiles", "ImagePath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PatientFiles", "ImagePath", c => c.String());
            DropColumn("dbo.PatientFiles", "Price");
            DropColumn("dbo.PatientFiles", "ToothCode");
            DropColumn("dbo.PatientFiles", "Qty");
            DropColumn("dbo.PatientFiles", "OfficeProcedure");
            DropColumn("dbo.PatientFiles", "Amount");
            DropTable("dbo.OfficeProcedures");
        }
    }
}
