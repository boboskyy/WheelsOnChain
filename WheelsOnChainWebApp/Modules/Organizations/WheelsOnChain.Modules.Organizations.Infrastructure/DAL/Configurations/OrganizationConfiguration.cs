using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WheelsOnChain.Modules.Organizations.Domain.Entities;
using WheelsOnChain.Modules.Organizations.Domain.ValueObjects;

namespace WheelsOnChain.Modules.Organizations.Infrastructure.DAL.Configurations;

internal class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
{
    public void Configure(EntityTypeBuilder<Organization> builder)
    {
        builder.Property(u => u.Id)
            .HasConversion(u => u.Value, u => new OrganizationId(u));
    }
}