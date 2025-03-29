using Microsoft.AspNetCore.Mvc;
using MVC_TASK.Models;

namespace MVC_TASK.Controllers
{
    public class CourseController : Controller
    {
        public static List<Course> courses = new List<Course>
        {
            new Course(1, "English", "description goes here", "Sami"),
            new Course(2, "Math", "description goes here", "Hani"),
            new Course(3, "Science", "description goes here", "Rami")
        };
        public IActionResult Index()
        {
            ViewBag.Courses = courses;
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }

        public IActionResult Create(string cName, string desc, string instructor)
        {
            int generatedId = courses.Count + 1;
            courses.Add(new Course(generatedId, cName, desc, instructor));
            return RedirectToAction("Index");
        }
    }
}
