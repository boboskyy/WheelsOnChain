using WheelsOnChain.Modules.Users.Shared.DTO;

namespace WheelsOnChain.Modules.Users.Shared;
public interface IUsersModuleApi
{
    Task<UserDetailsDto> GetUserAsync(Guid userId);
    Task<UserDetailsDto> GetUserAsync(string email);
}

