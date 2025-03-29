using Microsoft.AspNetCore.Mvc;
using MVC_TASK.Models;

namespace MVC_TASK.Controllers
{
    public class StudentController : Controller
    {
        private static List<Student> students = new List<Student>
        {
            new Student(1, "Ahmed", "ahmed@gmail.com", CourseController.courses[0]),
            new Student(2, "Emad", "emad@gmail.com", CourseController.courses[1])
        };
        public IActionResult Index()
        {
            ViewBag.Students = students;
            return View();
        }

        public IActionResult Add()
        {
            ViewBag.Courses = CourseController.courses;
            return View();
        }

        public IActionResult Create(string sName, string email, int courseId)
        {
            int generatedId = students.Count + 1;
            Console.WriteLine(courseId);
            students.Add(new Student(generatedId, sName, email, CourseController.courses[courseId - 1]));
            return RedirectToAction("Index");
        }

        public IActionResult Update(int sId)
        {
            ViewBag.Student = students[sId-1];
            ViewBag.Courses = CourseController.courses;
            return View();
        }

        public IActionResult confirmUpdate(int sId, string sName, string email, int courseId)
        {
            students[sId-1].Name = sName;
            students[sId-1].Email = email;
            students[sId - 1].Course = CourseController.courses[courseId - 1];
            return RedirectToAction("Index");
        }

    }
}
