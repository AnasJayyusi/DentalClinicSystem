using DentalClinic.Model.Entities.Billing;
using DentalClinic.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClinicSystem.API.Services
{
    public class BillingService
    {
        BillingRepository _billingRepository;
        public BillingService()
        {
            _billingRepository = new BillingRepository();
        }

        #region Serve Api

        internal void AddNewBill(Bill bill)
        {
            bool isExists = _billingRepository.IsBillAlreadyExists(bill.BillDate);

            if (isExists || bill.Id != 0)
                _billingRepository.UpdateBill(bill);
            else
                _billingRepository.AddNewBill(bill);
        }

        internal Bill GetBillByDate(string dateAsString)
        {
            DateTime date = DateTime.Parse(dateAsString);
            return _billingRepository.GetBillByDate(date);
        }
        internal List<Bill> GetBillsByDate(string dateAsString)
        {
            DateTime date = DateTime.Parse(dateAsString);
            return _billingRepository.GetBillsByDate(date);
        }

        internal List<Bill> GetBillsByPeriod(int year, int month)
        {
            return _billingRepository.GetBillsByPeriod(year, month);
        }


        internal decimal GetIncomeByPeriods(int year, int month)
        {
            return _billingRepository.GetIncomeByPeriods(year, month).Sum();
        }

        internal void Delete(int id)
        {
            _billingRepository.DeleteBill(id);
        }

        internal (List<Bill> bills, int totalItems) GetBills(int pageNumber,int pageSize)
        {
            return _billingRepository.GetBills(pageNumber, pageSize);
        }
        #endregion
    }
}