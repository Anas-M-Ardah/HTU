using Microsoft.AspNetCore.Mvc;
using MVC_TASK_V2.Models;

namespace MVC_TASK_V2.Controllers
{
    public class CourseController : Controller
    {
        public static List<Course> courses = CourseDataSource.courses;

        public IActionResult Index()
        {
            return View(courses);
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
