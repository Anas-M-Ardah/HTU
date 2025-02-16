internal class Program
{
    private static void Main(string[] args)
    {
        double num1, num2;
        string op;

        while (true)
        {
            Console.ForegroundColor = System.ConsoleColor.Blue;
            num1 = TakeDouble();
            Console.ForegroundColor = System.ConsoleColor.Blue;
            op = TakeOperator();
            Console.ForegroundColor = System.ConsoleColor.Blue;
            
            input2:
            num2 = TakeDouble("second");
            Console.ForegroundColor = System.ConsoleColor.Green;
            try{
                Console.WriteLine($"Result = {getResult(num1, num2, op)}");
                Console.ForegroundColor = System.ConsoleColor.White;
            } catch (Exception ex){
                goto input2;
            }
           

            Console.WriteLine("Enter exit to exit or press enter (or anything else) to continue");
            string input = Console.ReadLine().Trim().ToLower();
            if (input == "exit")
            {
                break;
            }
        }      
      
    }

    private static bool isValidOperator(string op)
    {
        if (op == "+" || op == "-" || op == "/" || op == "*")
        {
            return true;
        }

        return false;
    }

    private static double getResult(double num1, double num2, string op)
    {
        switch (op)
        {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "/":
                if(num2 == 0)
                {
                    Console.ForegroundColor = System.ConsoleColor.Red;
                    Console.WriteLine("Can't divid by zero");
                    throw new Exception("Can't divid by zero");
                }
                return num1 / num2;
            case "*":
                return num1 * num2;
            default:
                Console.ForegroundColor = System.ConsoleColor.Red;
                Console.WriteLine("Error");
                throw new Exception("Error"); ;
        }

    }

    private static double TakeDouble(string number = "first")
    {
        string num;
        while (true)
        {
            Console.ForegroundColor = System.ConsoleColor.Blue;
            Console.WriteLine($"Enter the {number} number:");
            num = Console.ReadLine();

            try
            {
                return Convert.ToDouble(num);
            }
            catch
            {
                Console.WriteLine("Please enter a number");
            }
        }
    }

    private static string TakeOperator()
    {
        string op;
        while (true) {
            Console.WriteLine(("Enter your operator:"));
            op = Console.ReadLine().Trim();
            if (!isValidOperator(op))
            {
                Console.ForegroundColor = System.ConsoleColor.Red;
                Console.WriteLine("Not a valid operator\nPlease Try again");
            }
            else
            {
                return op;
            }
        }
    }
}