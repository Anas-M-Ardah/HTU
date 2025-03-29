namespace MVC_TASK.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string InstructorName { get; set; }

        public Course(int id, string name, string description, string instructorName) 
        {
            Id = id;
            Name = name;
            Description = description;
            InstructorName = instructorName;
        }
    }
}
