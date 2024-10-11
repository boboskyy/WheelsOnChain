using WheelsOnChain.Shared.Exceptions;

namespace WheelsOnChain.Modules.Users.Application.Exceptions;

public class UserNotFoundException : WheelsOnChainExcpetion
{
    public UserNotFoundException(Guid userId) : base($"User with id: '{userId}' was not found.")
    {
    }
}