using HR.Models;
using Microsoft.EntityFrameworkCore;

namespace HR.Repository
{
    public class EmployeeRepository
    {
        public HRContext _hrContext { get; set; }

        public EmployeeRepository(HRContext hrContext)
        {
            _hrContext = hrContext;
        }

        public List<Employee> GetAll()
        {
            return _hrContext.Employees
                .Include(x => x.employeeDepartments)
                .ThenInclude(x => x.department)
                .ToList();
        }

        public void Add(Employee employee, int[] departmentIds)
        {

            Employee newEmp = new Employee()
            {
                employeeName = employee.employeeName,
                salary = employee.salary,
            };

            _hrContext.Employees.Add(newEmp);
            _hrContext.SaveChanges();

            //add the employeeDepartment
            for (int i = 0; i < departmentIds.Length; i++)
            {
                EmployeeDepartment employeeDepartment = new EmployeeDepartment();
                employeeDepartment.employeeId = newEmp.employeeId;
                employeeDepartment.departmentId = departmentIds[i];
                _hrContext.EmployeeDepartments.Add(employeeDepartment);
            }

            _hrContext.SaveChanges();

        }

        public List<Department> GetAllDepartments()
        {
            return _hrContext.Departments.ToList();
        }

        public void Update(Employee employee, int[] departmentIds)
        {
            var existingEmp = _hrContext.Employees
                .Include(e => e.employeeDepartments)
                .FirstOrDefault(e => e.employeeId == employee.employeeId);

            if (existingEmp != null)
            {
                existingEmp.employeeName = employee.employeeName;
                existingEmp.salary = employee.salary;

                // Remove old groups
                _hrContext.EmployeeDepartments.RemoveRange(existingEmp.employeeDepartments);

                // Add new groups
                foreach (var deptId in departmentIds)
                {
                    _hrContext.EmployeeDepartments.Add(new EmployeeDepartment
                    {
                        employeeId = employee.employeeId,
                        departmentId = deptId
                    });
                }
                _hrContext.SaveChanges();
            }
        }
    }
}
