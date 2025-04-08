namespace MVC_TASK_V2.Models
{
    public static class StudentDataSource
    {
        public static List<Student> students = new List<Student>
        {
            new Student(1, "Ahmed", "ahmed@gmail.com", CourseDataSource.courses[0]),
            new Student(2, "Emad", "emad@gmail.com", CourseDataSource.courses[1])
        };
    }
}
