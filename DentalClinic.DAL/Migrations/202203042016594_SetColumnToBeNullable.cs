namespace DentalClinic.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SetColumnToBeNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PatientFiles", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.PatientFiles", "Amount");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PatientFiles", "Amount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.PatientFiles", "Price", c => c.Double(nullable: false));
        }
    }
}
