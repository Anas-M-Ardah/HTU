using HR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            HRContext _context = new HRContext();
            var employees = _context.Employees
                .Include(x => x.employeeDepartments)
                .ThenInclude(x => x.department)
                .ToList();
            return View(employees);
        }

        public IActionResult Add()
        {
            HRContext _context = new HRContext();
            var departments = _context.Departments.ToList();
            ViewBag.Departments = departments;
            return View();
        }

        public IActionResult AddEmp(Employee employee, int[] departmentIds)
        {
            HRContext _context = new HRContext();
            //add the employee
            Employee newEmp = new Employee()
            {
                employeeName = employee.employeeName,
                salary = employee.salary,
            };
            _context.Employees.Add(newEmp);
            _context.SaveChanges();

            //add the employeeDepartment
            for(int i = 0; i < departmentIds.Length; i++)
            {
                EmployeeDepartment employeeDepartment = new EmployeeDepartment();
                employeeDepartment.employeeId = newEmp.employeeId;
                employeeDepartment.departmentId = departmentIds[i];
                _context.EmployeeDepartments.Add(employeeDepartment);
            }
           
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int employeeId)
        {
            HRContext _context = new HRContext();
            var emp = _context.Employees
                .Include(x => x.employeeDepartments)
                .ThenInclude(x => x.department)
                .SingleOrDefault(x => x.employeeId == employeeId);
            var departments = _context.Departments.ToList();
            ViewBag.Departments = departments;
            return View(emp);
        }

        public IActionResult EditEmp(Employee employee, int[] departmentIds)
        {
            HRContext _context = new HRContext();

            var existingEmp = _context.Employees.Include(x => x.employeeDepartments)
                .FirstOrDefault(x => x.employeeId == employee.employeeId);

            existingEmp.employeeName = employee.employeeName;
            existingEmp.salary = employee.salary;

            // Remove all existing department relationships
            _context.EmployeeDepartments.RemoveRange(existingEmp.employeeDepartments);

            // Add new department relationships
            foreach (var departmentId in departmentIds)
            {
                var employeeDepartment = new EmployeeDepartment
                {
                    employeeId = employee.employeeId,
                    departmentId = departmentId
                };
                _context.EmployeeDepartments.Add(employeeDepartment);
            }

            _context.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
