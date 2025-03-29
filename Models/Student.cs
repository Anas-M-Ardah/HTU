namespace MVC_TASK.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Course Course { get; set; }

        public Student(int id, string name, string email, Course course)
        {
            Id = id;
            Name = name;
            Email = email;
            Course = course;
        }
    }
}
