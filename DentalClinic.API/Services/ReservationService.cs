using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Reservation;
using DentalClinic.Repository;
using System;
using System.Collections.Generic;

namespace ClinicSystem.API.Services
{
    public class ReservationService
    {
        ReservationRepository _reservationRepository;

        internal ReservationService()
        {
            _reservationRepository = new ReservationRepository();
        }

        internal List<PatientReservation> GetPatientsReservations()
        {
            return _reservationRepository.GetPatientsReservations();
        }

        internal List<PatientReservation> GetPatientsReservationsByKeyword(string kw)
        {
            return _reservationRepository.GetPatientsReservationsByKeyword(kw);
        }

        internal void BookNewAppointment(Booking booking)
        {
            _reservationRepository.BookNewAppointment(booking);
        }

        internal List<String> GetAvailableHours(Booking booking)
        {
            return _reservationRepository.GetAvailableHours(booking);
        }

        internal List<LiteVisitInfo> GetNextPatientVisit(int patientId)
        {
            return _reservationRepository.GetNextPatientVisit(patientId);
        }

        internal Invoice GetInvoice(int patientId)
        {
            Invoice invoice = _reservationRepository.GetInvoice(patientId);
            if (invoice == null)
                return new Invoice()
                {
                    PatientId = patientId,
                    FullPrice = 0,
                    Paid = 0,
                    FinancialRecords = new List<FinancialRecord>()
                };

            return invoice;
        }

        internal List<FinancialRecord> GetFinancialRecord(int patientId)
        {
            return _reservationRepository.GetFinancialRecord(patientId);
        }

        internal void SaveInvoice(Invoice invoice)
        {
            Invoice invoiceobj = _reservationRepository.GetInvoice(invoice.PatientId);

            // Add
            if (invoiceobj == null)
            {
                _reservationRepository.AddNewInvoice(invoice);
                _reservationRepository.AddFinancialRecord(invoice.FinancialRecords, invoice.PatientId);
            }

            // Update
            else
            {
                _reservationRepository.AddFinancialRecord(invoice.FinancialRecords, invoice.PatientId);
                _reservationRepository.UpdateInvoice(invoice);
            }
        }

        internal void DeleteFinancialRecord(int recordId)
        {
            _reservationRepository.DeleteFinancialRecord(recordId);
        }

        internal List<ProcedureNameDto> GetProceduresNames()
        {
            return _reservationRepository.GetProceduresNames();
        }

        internal void SaveInvoiceViaPatientFile(PatientFile patientFile)
        {
            Invoice invoiceobj = _reservationRepository.GetInvoice(patientFile.PatientId);

          

            if (invoiceobj == null)
            {
                Invoice invoice = new Invoice();

                // Create invoice
                invoice.PatientId = patientFile.PatientId;
                invoice.FullPrice = patientFile.Price;
                invoice.FinancialRecords = new List<FinancialRecord>();
                _reservationRepository.AddNewInvoice(invoice);

                // Create Financial Record
                FinancialRecord financialRecord = new FinancialRecord();
                financialRecord.Amount = patientFile.Price;
                financialRecord.Invoice_PatientId= patientFile.PatientId;
                financialRecord.InvoiceType = InvoiceType.Bill;
                List<FinancialRecord> financialRecords = new List<FinancialRecord>();
                financialRecords.Add(financialRecord);

                _reservationRepository.AddFinancialRecord(financialRecords, invoice.PatientId);
            }
            // Update
            else
            {
                List<FinancialRecord> financialRecords= _reservationRepository.GetFinancialRecord(patientFile.PatientId);

                // Create Financial Record
                FinancialRecord financialRecord = new FinancialRecord();
                financialRecord.Amount = patientFile.Price;
                financialRecord.Invoice_PatientId = patientFile.PatientId;
                financialRecord.InvoiceType = InvoiceType.Bill;
                financialRecords.Add(financialRecord);

                _reservationRepository.AddFinancialRecord(financialRecords, patientFile.PatientId);
                _reservationRepository.UpdateInvoiceFullPrice(patientFile.PatientId, patientFile.Price);
            }

        }
    }
}