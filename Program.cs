//Author github: Anas-M-Ardah
internal class Program
{
    private static void Main(string[] args)
    {
        Dictionary<string, double> items = new Dictionary<string, double>()
        {
            { "matrix", 0.35 },
            { "water", 0.25 },
            { "chips", 0.50 }
        };
        Print("\nVending Machine\n");

        while (true)
        {
            //Print Menu
            Console.ForegroundColor = ConsoleColor.White;
            PrintMenu(items);
            Print("");

            InsertMoney:
            double money = TakeMoney();
            if (!isMoneyMoreThanZero(money))
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Can't insert zero or negative values");
                Console.ForegroundColor = ConsoleColor.White;
                goto InsertMoney;
            }

            UserChoice:
            string userChoice = TakeUserChoice(items);
            if (!isValidUserChoice(userChoice)) goto UserChoice;
            double itemPrice = items[userChoice];
            if (!isBalanceValid(money, itemPrice)) goto InsertMoney;

            //Print Output
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"\nCollect your item '{userChoice}'");
            Console.WriteLine($"Collect your change {ReturnChange(money, itemPrice)}\n");
        }


    }

    private static bool isMoneyMoreThanZero(double money)
    {
        return money > 0;
    }

    private static bool isValidUserChoice(string userChoice)
    {
        if (userChoice == "N/A")
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("Invalid choice");
            Console.ForegroundColor = ConsoleColor.Blue;
            return false;
        }

        return true;
    }

    private static bool isBalanceValid(double money, double itemPrice)
    {
        if(itemPrice > money)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Insufficient funds!");
            Console.WriteLine($"You need ${itemPrice - money:F2} more");
            Console.ForegroundColor = ConsoleColor.White;
            return false;
        }

        return true;
    }

    private static void Print(string message)
    {
        Console.WriteLine(message);
    }

    private static void PrintMenu(Dictionary<string, double> items)
    {
        int i = 1;
        foreach (var item in items)
        {
            Console.WriteLine($"{i}- {item.ToString()}");
            i++;
        }
    }

    private static double TakeMoney()
    {
        string num;
        while (true)
        {
            Console.ForegroundColor = System.ConsoleColor.Blue;
            Print("Please insert some coins");
            num = Console.ReadLine();

            try
            {
                return Convert.ToDouble(num);
            }
            catch
            {
                Console.ForegroundColor=System.ConsoleColor.Red;
                Console.WriteLine("Please enter a number");
                
            }
        }
    }

    private static string TakeUserChoice(Dictionary<string, double> items)
    {
        int numOfItems = items.Count;
        Print("Please select your item");
        while (true) { 
            try
            {
                int userChoice = int.Parse(Console.ReadLine());
                if (userChoice > numOfItems || userChoice <= 0)
                {
                    return "N/A";
                }

                return SelectItem(userChoice);
            }
            catch
            {
                Console.ForegroundColor = System.ConsoleColor.Red;
                Console.WriteLine("Please enter a number");
            }
        }
    }

    private static string SelectItem(int num)
    {
        switch (num)
        {
            case 1:
                return "matrix";
            case 2:
                return "water";
            case 3:
                return "chips";
            default:
                return "N/A";
        }
    }

    private static double ReturnChange(double money, double itemPrice)
    {
        return money - itemPrice;
    }
}