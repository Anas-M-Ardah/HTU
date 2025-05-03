namespace HR.Models
{
    public class Employee
    {
        public int employeeId { get; set; }
        public string employeeName { get; set; }    
        public double salary { get; set; }

        public List<EmployeeDepartment> employeeDepartments { get; set; }
    }
}
