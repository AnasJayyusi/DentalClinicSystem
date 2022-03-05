namespace DentalClinic.Model.Entities.Common
{
    public class OfficeProcedure : IBaseEntity
    {
        public string ProcedureName { get; set; }
        public double Price { get; set; }
    }
}
