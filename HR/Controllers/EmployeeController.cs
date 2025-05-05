using HR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR.Repository;

namespace HR.Controllers
{
    public class EmployeeController : Controller
    {
        private IEmployeeRepository _employeeRepository { get; set; }
        public EmployeeController(IEmployeeRepository employeeRepository) 
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
            var employee = _employeeRepository.GetById(employeeId);

            var employeeDTO = new EmployeeDTO
            {
                employeeId = employee.employeeId,
                employeeName = employee.employeeName,
                salary = employee.salary,
                departments = _employeeRepository.GetAllDepartments()
            };

            return View(employeeDTO);
        }
        public IActionResult EditEmp(Employee employee, int[] departmentIds)
        {
            _employeeRepository.Update(employee, departmentIds);
            return RedirectToAction("Index");
        }
    }
}
