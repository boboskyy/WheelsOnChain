using WheelsOnChain.Modules.Users.Domain.Entities;

namespace WheelsOnChain.Modules.Users.Application.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}

