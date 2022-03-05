using DentalClinic.DAL;
using DentalClinic.Model.Entities.Common;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace DentalClinicSystem.Controllers
{
    public class OfficeProceduresController : Controller
    {
        private DentalClinicDbContext db = new DentalClinicDbContext();

        // GET: OfficeProcedures
        public ActionResult Index()
        {
            return View(db.OfficeProcedures.ToList());
        }

        // GET: OfficeProcedures/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OfficeProcedure officeProcedure = db.OfficeProcedures.Find(id);
            if (officeProcedure == null)
            {
                return HttpNotFound();
            }
            return View(officeProcedure);
        }

        // GET: OfficeProcedures/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: OfficeProcedures/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,ProcedureName,Price,CreatedDate,UpdateDate,CreatedBy,UpdatedBy,IsDeleted")] OfficeProcedure officeProcedure)
        {
            if (ModelState.IsValid)
            {
                db.OfficeProcedures.Add(officeProcedure);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(officeProcedure);
        }

        // GET: OfficeProcedures/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OfficeProcedure officeProcedure = db.OfficeProcedures.Find(id);
            if (officeProcedure == null)
            {
                return HttpNotFound();
            }
            return View(officeProcedure);
        }

        // POST: OfficeProcedures/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,ProcedureName,Price,CreatedDate,UpdateDate,CreatedBy,UpdatedBy,IsDeleted")] OfficeProcedure officeProcedure)
        {
            if (ModelState.IsValid)
            {
                db.Entry(officeProcedure).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(officeProcedure);
        }

        // GET: OfficeProcedures/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OfficeProcedure officeProcedure = db.OfficeProcedures.Find(id);
            if (officeProcedure == null)
            {
                return HttpNotFound();
            }
            return View(officeProcedure);
        }

        // POST: OfficeProcedures/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            OfficeProcedure officeProcedure = db.OfficeProcedures.Find(id);
            db.OfficeProcedures.Remove(officeProcedure);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
