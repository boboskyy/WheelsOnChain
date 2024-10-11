
using WheelsOnChain.Modules.Users.Domain.Entities;
using WheelsOnChain.Modules.Users.Domain.ValueObjects;

namespace WheelsOnChain.Modules.Users.Application.Repositories;

public interface IUserRepository
{
    Task<User> GetAsync(UserId id);
    Task<User> GetUserByEmail(string email);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
}

