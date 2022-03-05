using ClinicSystem.API.Services;
using DentalClinic.Model.Entities.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ClinicSystem.API.Controllers
{
    public class BillingApiController : ApiController
    {
        BillingService _billingService;
        public BillingApiController()
        {
            _billingService = new BillingService();
        }


        [Route("AddNewBill")]
        [HttpPost]
        public IHttpActionResult AddNewBill(Bill bill)
        {
            try
            {
                _billingService.AddNewBill(bill);
                return Ok();
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }


        [Route("DeleteBill/{id}")]
        [HttpGet]
        public IHttpActionResult DeleteBill(int id)
        {
            try
            {
                _billingService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetBillByDate/{dateAsString}")]
        [HttpGet]
        public IHttpActionResult GetBillByDate(string dateAsString)
        {
            try
            {
                Bill bill = _billingService.GetBillByDate(dateAsString);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }

        [Route("GetBillsByDate/{dateAsString}")]
        [HttpGet]
        public IHttpActionResult GetBillsByDate(string dateAsString)
        {
            try
            {
                List<Bill> bills = _billingService.GetBillsByDate(dateAsString);
                return Ok(bills);
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }

        [Route("GetBillsByPeriod/{year}/{month}")]
        [HttpGet]
        public IHttpActionResult GetBillsByPeriod(int year, int month)
        {
            try
            {
                List<Bill> bills = _billingService.GetBillsByPeriod(year, month);
                return Ok(bills);
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }


        [Route("GetIncomeByPeriods/{year}/{month}")]
        [HttpGet]
        public IHttpActionResult GetIncomeByPeriods(int year, int month)
        {
            try
            {
                decimal totalAmount = _billingService.GetIncomeByPeriods(year, month);
                return Ok(totalAmount);
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }


        [Route("GetBills/{pageNumber}/{pageSize}")]
        [HttpGet]
        public IHttpActionResult GetBills(int pageNumber, int pageSize )
        {
            try
            {
                (List<Bill> bills, int totalItems) = _billingService.GetBills(pageNumber, pageSize);
                return Ok(new { bills, totalItems });
            }
            catch (Exception ex)
            {
                // Save Error On Database Later on
                return BadRequest(ex.Message);
            }
        }




    }
}
