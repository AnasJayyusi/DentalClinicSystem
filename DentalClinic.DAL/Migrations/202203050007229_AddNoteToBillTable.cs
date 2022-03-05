namespace DentalClinic.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNoteToBillTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Bills", "Note", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Bills", "Note");
        }
    }
}
