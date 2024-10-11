using WheelsOnChain.Modules.Users.Shared.DTO;

namespace WheelsOnChain.Modules.Users.Application.DTO;

public record AuthenticationResultDto(
    UserDto User,
    string Token
);
