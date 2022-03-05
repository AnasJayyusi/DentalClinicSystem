using DentalClinic.Model.Entities.Billing;
using DentalClinic.Model.Entities.Reservation;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Repository
{
    public class BillingRepository : DbContext
    {
        public bool IsBillAlreadyExists(DateTime billDate)
        {
            return _dbContext.Bills.Where(x => DbFunctions.TruncateTime(x.BillDate) == DbFunctions.TruncateTime(billDate)).Any();
        }

        public void AddNewBill(Bill bill)
        {
            _dbContext.Bills.Add(bill);
            _dbContext.SaveChanges();
        }

        public void UpdateBill(Bill bill)
        {
            var obj = _dbContext.Bills.Single(p => p.Id == bill.Id);

            // Set New values
            obj.UpdateDate = DateTime.Now;
            obj.BillDate = bill.BillDate;
            obj.Salary = bill.Salary;
            obj.Meterial = bill.Meterial;
            obj.Rent = bill.Rent;
            obj.Electricity = bill.Electricity;
            obj.Water = bill.Water;
            obj.Tax = bill.Tax;
            obj.AmmanMunicipality = bill.AmmanMunicipality;
            obj.ClinicConsumables = bill.ClinicConsumables;
            obj.Other = bill.Other;
            obj.Note = bill.Note;

            _dbContext.SaveChanges();
        }

        public void DeleteBill(int id)
        {
            var obj = _dbContext.Bills.Single(p => p.Id == id);
            _dbContext.Bills.Remove(obj);
            _dbContext.SaveChanges();
        }

        public (List<Bill> bills, int totalItems) GetBills(int pageNumber, int pageSize)
        {
            int totalSkipRecords = 0;
            if (pageNumber != 1)
                totalSkipRecords = (pageNumber - 1) * pageSize;

            List<Bill> bills = _dbContext.Bills.OrderBy(x => x.BillDate)
                                         .Skip(totalSkipRecords)
                                         .Take(pageSize)
                                         .ToList();

            int totalItems = _dbContext.Bills.Count();

            return (bills, totalItems);
        }

        public List<Bill> GetBillsByPeriod(int year, int month)
        {
            return _dbContext.Bills.Where(x => x.BillDate.Month == month && x.BillDate.Year == year).ToList();
        }

        public List<decimal> GetIncomeByPeriods(int year, int month)
        {
            return _dbContext.FinancialRecords.Where(x => x.CreatedDate.Value.Month == month
                                                  && x.CreatedDate.Value.Year == year
                                                  && !x.IsDeleted
                                                  && x.InvoiceType == InvoiceType.Paid)
                                                 .Select(x => x.Amount)
                                                 .ToList();

        }

        public Bill GetBillByDate(DateTime date)
        {
            var bill = _dbContext.Bills.Where(b => DbFunctions.TruncateTime(b.BillDate) == DbFunctions.TruncateTime(date))
                                       .FirstOrDefault();
            return bill;
        }

        public List<Bill> GetBillsByDate(DateTime date)
        {
            List<Bill> bills = _dbContext.Bills
                                         .Where(b => DbFunctions.TruncateTime(b.BillDate) == DbFunctions.TruncateTime(date))
                                         .ToList();
            return bills;
        }
    }
}
