using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarksOOP
{
    internal class StudentCourse
    {
        public double mark;
        public string name;

        public void FillInfo()
        {
            Console.WriteLine("Please fill in the courses's name");
            this.name = Console.ReadLine();

            Console.WriteLine("Please fill in the courses's mark");
            this.mark = Convert.ToDouble(Console.ReadLine());
        }

        public string getGrade(double grade)
        {
            if (grade >= 90 && grade <= 100)
            {
                return "A";
            }
            else if (grade >= 80 && grade <= 89)
            {
                return "B";
            }
            else if (grade >= 70 && grade <= 79)
            {
                return "C";
            }
            else if (grade >= 60 && grade <= 69)
            {
                return "D";
            }
            else if (grade >= 0 && grade <= 59)
            {
                return "F";
            }
            else
            {
                return "Invalid Grade";
            }

        }

        public void PrintGrade()
        {
            string grade = this.getGrade(this.mark);
            Console.WriteLine($"{this.name}: {grade}");
        }
    }
}
