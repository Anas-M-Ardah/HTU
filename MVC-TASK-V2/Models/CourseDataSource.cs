namespace MVC_TASK_V2.Models
{
    public static class CourseDataSource
    {
        public static List<Course> courses = new List<Course>
        {
            new Course(1, "English", "description goes here", "Sami"),
            new Course(2, "Math", "description goes here", "Hani"),
            new Course(3, "Science", "description goes here", "Rami")
        };
    }
}
