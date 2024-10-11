namespace WheelsOnChain.Modules.Users.Application.Interfaces.Authentication;

public interface IPasswordHasher
{
    string Create(string password);
    bool Verify(string passwordHash, string inputHash);
}