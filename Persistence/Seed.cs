
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Users.Any()) return;
            
            var users = new List<Users>
            {
                new Users
                {
                    UserName = "zakhan",
                    EmailAddress = "zeeshan.khan@softude.com",
                    Password = "zakhan",
                    Token = "ABCD12345",
                    IsDeleted = false,
                    IsActive = true,
                    CreationTime=DateTime.UtcNow.AddMonths(-2),
                },
              
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }
    }
}