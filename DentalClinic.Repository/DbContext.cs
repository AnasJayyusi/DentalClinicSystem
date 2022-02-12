using DentalClinic.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DentalClinic.Repository
{
    public class DbContext
    {
        public DentalClinicDbContext _dbContext;
        public DbContext()
        {
            _dbContext = new DentalClinicDbContext();
        }
    }
}
