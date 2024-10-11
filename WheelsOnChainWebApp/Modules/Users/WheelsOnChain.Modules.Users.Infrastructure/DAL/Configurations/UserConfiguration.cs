using WheelsOnChain.Modules.Users.Domain.Entities;
using WheelsOnChain.Modules.Users.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WheelsOnChain.Modules.Users.Infrastructure.DAL.Configurations;

internal class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.Id)
            .HasConversion(u => u.Value, u => new UserId(u));
    }
}

