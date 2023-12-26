
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context , UserManager <AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser {DisplayName ="Bob", UserName ="bob", Email= "bob@test.com"},
                    new AppUser {DisplayName ="David", UserName ="david", Email= "david@test.com"},
                    new AppUser {DisplayName ="Jon", UserName ="jon", Email= "jon@test.com"},
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    
                    
                }

            }

            if (context.Activities.Any()) return;



            if (context.Users.Any()) return;
            
            // var users = new List<Users>
            // {
            //     new Users
            //     {
            //         UserName = "zakhan",
            //         EmailAddress = "zeeshan.khan@softude.com",
            //         Password = "zakhan",
            //         Token = "ABCD12345",
            //         IsDeleted = false,
            //         IsActive = true,
            //         CreationTime=DateTime.UtcNow.AddMonths(-2),
            //     },
              
            // };

            // await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }
    }
}