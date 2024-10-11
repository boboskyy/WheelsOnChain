using Microsoft.EntityFrameworkCore;
using WheelsOnChain.Modules.Organizations.Domain.Entities;

namespace WheelsOnChain.Modules.Organizations.Infrastructure.DAL;

public class OrganizationsDbContext : DbContext
{
    public DbSet<Organization> Organizations { get; set; }
    
    public OrganizationsDbContext(DbContextOptions<OrganizationsDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("organizations");
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }
}