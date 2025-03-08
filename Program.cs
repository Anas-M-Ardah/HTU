namespace MarksOOP
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter the Number of students");
            int n = int.Parse(Console.ReadLine());

            Student[] students = new Student[n];

            for (int i = 0; i < n; i++)
            {
                //number of courses
                Console.WriteLine($"Enter the number of courses student {i+1} has");
                int numberOfCourses = int.Parse(Console.ReadLine());
                students[i] = new Student(numberOfCourses);

                //fill in the students info 
                students[i].FillInfo();

                //fill in the courses info
                for (int j = 0; j < numberOfCourses; j++)
                {
                    Console.WriteLine($"course {j+1}");
                    students[i].studentCourses[j].FillInfo();
                }
            }

            //print grades
            foreach (Student student in students)
            {
                Console.WriteLine($"{student.Name}: ");
                for (int i = 0; i < student.studentCourses.Length; i++)
                {
                    student.studentCourses[i].PrintGrade();
                }
            }

            //print average
            foreach(Student student in students)
                student.PrintAverage();


        }
    }
}
