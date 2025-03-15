using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarksOOP
{
    internal class Student
    {
        public string ID;
        public string Name;
        public List<StudentCourse> studentCourses;

        public Student(int numberOfCourses)
        {
            this.studentCourses = new List<StudentCourse>();
            initializeStudentCourses(numberOfCourses);
        }

        private void initializeStudentCourses(int n)
        {
            for (int i = 0; i < n; i++)
            {
                studentCourses.Add(new StudentCourse());
            }
        }

        public void FillInfo()
        {
            string name, id;
            
            Console.WriteLine("Enter the student's name");
            name = Console.ReadLine();

            Console.WriteLine("Enter the student's id");
            id = Console.ReadLine();

            this.Name = name;
            this.ID = id;
           
        }

        public double getSumOfMarks()
        {
            double sum = 0;
            foreach (StudentCourse studentCourse in studentCourses)
            {
                sum += studentCourse.mark;
            }
            return sum;
        }

        public double calculateAvg()
        {
            return this.getSumOfMarks()/this.studentCourses.Count;
        }

        public void PrintAverage()
        {
            Console.WriteLine($"{this.Name} has an average of {this.calculateAvg():F2}");
        }
    }
}
