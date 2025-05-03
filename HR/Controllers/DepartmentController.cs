using HR.Models;
using Microsoft.AspNetCore.Mvc;

namespace HR.Controllers
{
    public class DepartmentController : Controller
    {
        public IActionResult Index()
        {
            HRContext _context = new HRContext();
            var departments = _context.Departments.ToList();
            return View(departments);
        }
    }
}
