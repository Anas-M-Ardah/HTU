using HR.Models;

namespace HR.Repository
{
    public interface IEmployeeRepository
    {
        public List<Employee> GetAll();
        public void Add(Employee employee, int[] departmentIds);
        public List<Department> GetAllDepartments();
        public void Update(Employee employee, int[] departmentIds);

        public Employee GetById(int id);

    }
}
