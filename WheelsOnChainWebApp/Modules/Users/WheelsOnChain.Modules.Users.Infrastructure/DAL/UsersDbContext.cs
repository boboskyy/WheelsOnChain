
using WheelsOnChain.Modules.Users.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace WheelsOnChain.Modules.Users.Infrastructure.DAL;

internal class UsersDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("users");
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }
}

