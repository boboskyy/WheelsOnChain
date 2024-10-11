using Microsoft.EntityFrameworkCore;
using WheelsOnChain.Modules.Users.Application.Interfaces.Authentication;
using WheelsOnChain.Modules.Users.Domain.Entities;
using WheelsOnChain.Shared.Initializer;

namespace WheelsOnChain.Modules.Users.Infrastructure.DAL.Initializers;

internal class UserInitializer : IInitializer
{
    private readonly UsersDbContext _context;
    private readonly IPasswordHasher _passwordHasher;

    public UserInitializer(UsersDbContext context, IPasswordHasher passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }
    
    public async Task InitAsync()
    {
        var count = await _context.Users.CountAsync();

        if (count == 0)
        {
            User user = User.CreateUser("admin@wheelsonchain.com", _passwordHasher.Create("admin"));
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}