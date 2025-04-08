using Microsoft.AspNetCore.Mvc;
using MVC_TASK_V2.Models;

//replace viewbag with parameters

namespace MVC_TASK_V2.Controllers
{
    public class StudentController : Controller
    {

        static List<Student> students = StudentDataSource.students;

        public IActionResult Index()
        {
            return View(students);
        }

        public IActionResult Add()
        {
            return View(CourseController.courses);
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
            ViewBag.Student = students[sId - 1];
            ViewBag.Courses = CourseController.courses;
            return View();
        }

        public IActionResult Update2(int sId)
        {
            ViewBag.Student = students[sId - 1];
            ViewBag.Courses = CourseController.courses;
            return View();
        }

        public IActionResult confirmUpdate(int sId, string sName, string email, int courseId)
        {
            students[sId - 1].Name = sName;
            students[sId - 1].Email = email;
            students[sId - 1].Course = CourseController.courses[courseId - 1];
            return RedirectToAction("Index");
        }

        public IActionResult confirmUpdate2(Student student, int courseId)
        {
            int studentIndex = student.Id - 1;
            students[studentIndex].Name = student.Name;
            students[studentIndex].Email = student.Email;
            students[studentIndex].Course = CourseDataSource.courses[courseId-1];
            return RedirectToAction("Index");
        }

    }
}
