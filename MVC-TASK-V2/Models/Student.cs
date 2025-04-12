namespace MVC_TASK_V2.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<Course> Courses { get; set; }

        public Student()
        {
            // Default constructor needed for model binding
        }

        public Student(int id, string name, string email, List<Course> courses)
        {
            Id = id;
            Name = name;
            Email = email;
            Courses = courses;
        }
    }
}
