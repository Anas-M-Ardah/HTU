namespace HR.Models
{
    public class EmployeeDepartment
    {
        public int employeeId { get; set; }
        public Employee employee { get; set; }
        public int departmentId { get; set; }
        public Department department { get; set; }
    }
}
