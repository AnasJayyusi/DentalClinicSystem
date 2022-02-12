﻿namespace DentalClinic.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFinancialRecordTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Invoices", "PatientId", "dbo.Patients");
            DropPrimaryKey("dbo.Invoices");
            CreateTable(
                "dbo.FinancialRecords",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Comment = c.String(),
                        InvoiceType = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        UpdateDate = c.DateTime(),
                        CreatedBy = c.String(),
                        UpdatedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        Invoice_PatientId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Invoices", t => t.Invoice_PatientId)
                .Index(t => t.Invoice_PatientId);
            
            AddPrimaryKey("dbo.Invoices", "PatientId");
            AddForeignKey("dbo.Invoices", "PatientId", "dbo.Patients", "Id");
            DropColumn("dbo.Invoices", "Id");
            DropColumn("dbo.Invoices", "CreatedDate");
            DropColumn("dbo.Invoices", "UpdateDate");
            DropColumn("dbo.Invoices", "CreatedBy");
            DropColumn("dbo.Invoices", "UpdatedBy");
            DropColumn("dbo.Invoices", "IsDeleted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Invoices", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Invoices", "UpdatedBy", c => c.String());
            AddColumn("dbo.Invoices", "CreatedBy", c => c.String());
            AddColumn("dbo.Invoices", "UpdateDate", c => c.DateTime());
            AddColumn("dbo.Invoices", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Invoices", "Id", c => c.Int(nullable: false, identity: true));
            DropForeignKey("dbo.Invoices", "PatientId", "dbo.Patients");
            DropForeignKey("dbo.FinancialRecords", "Invoice_PatientId", "dbo.Invoices");
            DropIndex("dbo.FinancialRecords", new[] { "Invoice_PatientId" });
            DropPrimaryKey("dbo.Invoices");
            DropTable("dbo.FinancialRecords");
            AddPrimaryKey("dbo.Invoices", "Id");
            AddForeignKey("dbo.Invoices", "PatientId", "dbo.Patients", "Id", cascadeDelete: true);
        }
    }
}
