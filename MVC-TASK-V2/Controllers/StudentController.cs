using Microsoft.AspNetCore.Mvc;
using MVC_TASK_V2.Models;

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

        public IActionResult Create(string sName, string email, int[] CourseIds)
        {
            int generatedId = students.Count + 1;
            List<Course> courses = new List<Course>();
            foreach(int id in CourseIds)
            {
                courses.Add(CourseDataSource.courses[id-1]);
            }
            students.Add(new Student(generatedId, sName, email, courses));
            return RedirectToAction("Index");
        }

        
        public IActionResult Update(int sId)
        {
            ViewBag.Student = students[sId - 1];
            ViewBag.Courses = CourseController.courses;
            return View();
        }

        public IActionResult confirmUpdate(Student student, int[] CourseIds)
        {
            int studentIndex = student.Id - 1;
            students[studentIndex].Name = student.Name;
            students[studentIndex].Email = student.Email;
            List<Course> courses = new List<Course>();
            foreach (int id in CourseIds)
            {
                courses.Add(CourseDataSource.courses[id-1]);
            }
            students[studentIndex].Courses = courses;
            return RedirectToAction("Index");
        }

    }
}
