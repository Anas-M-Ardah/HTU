namespace HR.Models
{
    public class Department
    {
        public int departmentId { get; set; }
        public string departmentName { get; set; }

        public List<EmployeeDepartment> employeeDepartments { get; set; }

    }
}
