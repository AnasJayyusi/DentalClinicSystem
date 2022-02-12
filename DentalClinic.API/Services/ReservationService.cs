using DentalClinic.Model.Dtos;
using DentalClinic.Model.Entities.Patients;
using DentalClinic.Model.Entities.Reservation;
using DentalClinic.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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

        internal Invoice GetFinancialrecord(int patientId)
        {
            Invoice invoice = _reservationRepository.GetFinancialRecord(patientId);

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

        internal void SaveInvoice(Invoice invoice)
        {
            Invoice invoiceobj = _reservationRepository.GetFinancialRecord(invoice.PatientId);

            // Add
            if (invoiceobj == null)
                _reservationRepository.AddNewInvoice(invoice);

            // Update
            else
                _reservationRepository.UpdateInvoice(invoice);
        }
    }
}