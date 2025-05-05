using HR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR.Repository;

namespace HR.Controllers
{
    public class EmployeeController : Controller
    {
        private EmployeeRepository _employeeRepository { get; set; }
        public EmployeeController(EmployeeRepository employeeRepository) 
        {
            _employeeRepository = employeeRepository;
        }

        public IActionResult Index()
        {
            var employees = _employeeRepository.GetAll();
            return View(employees);
        }

        public IActionResult Add()
        {
            var departments = _employeeRepository.GetAllDepartments();
            ViewBag.Departments = departments;
            return View();
        }

        public IActionResult AddEmp(Employee employee, int[] departmentIds)
        {
            _employeeRepository.Add(employee, departmentIds);
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int employeeId)
        {
            var emp = _employeeRepository.GetAll();
            var departments = _employeeRepository.GetAllDepartments();
            ViewBag.Departments = departments;
            return View(emp);
        }

        public IActionResult EditEmp(Employee employee, int[] departmentIds)
        {
            _employeeRepository.Update(employee, departmentIds);
            return RedirectToAction("Index");
        }
    }
}
