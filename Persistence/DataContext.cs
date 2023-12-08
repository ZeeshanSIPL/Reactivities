using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options)  :base(options)
        {


        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Users> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure the primary key for the Users entity
        modelBuilder.Entity<Users>()
            .HasKey(u => u.UserId);

        // Other entity configurations can go here

        // ...
    }

    }
}