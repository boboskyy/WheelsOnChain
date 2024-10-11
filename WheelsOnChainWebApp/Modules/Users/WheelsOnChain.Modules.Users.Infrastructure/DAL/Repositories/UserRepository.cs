
using WheelsOnChain.Modules.Users.Application.Repositories;
using WheelsOnChain.Modules.Users.Domain.Entities;
using WheelsOnChain.Modules.Users.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace WheelsOnChain.Modules.Users.Infrastructure.DAL.Repositories;
internal class UserRepository : IUserRepository
{
    private readonly UsersDbContext _context;
    private readonly DbSet<User> _users;

    public UserRepository(UsersDbContext context)
    {
        _context = context;
        _users = context.Users;
    }

    public async Task AddAsync(User user)
    {
        await _users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public Task<User> GetAsync(UserId id) => _users.SingleOrDefaultAsync(u => u.Id == id);

    public Task<User> GetUserByEmail(string email) => _users.SingleOrDefaultAsync(u => u.Email == email);

    public async Task UpdateAsync(User user)
    {
        _users.Update(user);
        await _context.SaveChangesAsync();
    }
}

