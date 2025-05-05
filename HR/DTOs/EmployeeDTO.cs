using HR.Models;

namespace HR
{
    public class EmployeeDTO
    {
        public int employeeId { get; set; }
        public string employeeName { get; set; }
        public double salary { get; set; }
        public List<Department> departments { get; set; }
        public List<EmployeeDepartment> employeeDepartments { get; set; }
    }
}