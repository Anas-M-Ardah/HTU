namespace MVC_TASK_V2.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Course Course { get; set; }

        public Student()
        {
            // Default constructor needed for model binding
        }

        public Student(int id, string name, string email, Course course)
        {
            Id = id;
            Name = name;
            Email = email;
            Course = course;
        }
    }
}
