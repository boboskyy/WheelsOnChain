using WheelsOnChain.Shared.Exceptions;

namespace WheelsOnChain.Modules.Users.Application.Exceptions;

public class UserAlreadyExistsException : WheelsOnChainExcpetion
{
    public UserAlreadyExistsException(string user) : base($"User: '{user}' already exists.")
    {
    }
}

