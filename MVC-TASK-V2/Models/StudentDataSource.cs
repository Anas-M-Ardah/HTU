namespace MVC_TASK_V2.Models
{
    public static class StudentDataSource
    {
        public static List<Student> students = new List<Student>
        {
            new Student(1, "Ahmed", "ahmed@gmail.com", new List<Course> {CourseDataSource.courses[0], CourseDataSource.courses[1] }),
            new Student(2, "Emad", "emad@gmail.com", new List<Course> {CourseDataSource.courses[1], CourseDataSource.courses[2] })
        };
    }
}
