using WheelsOnChain.Modules.Users.Domain.ValueObjects;

namespace WheelsOnChain.Modules.Users.Domain.Entities;
public class User
{
    public UserId Id { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }

    private User()
    {
    }

    private User(
        UserId id,
        string email,
        string passwordHash)
    {
        Id = id;
        Email = email;
        PasswordHash = passwordHash;
    }

    public static User CreateUser(
        string email,
        string passwordHash)
    {
        return new User(
            Guid.NewGuid(),
            email,
            passwordHash);
    }
}

