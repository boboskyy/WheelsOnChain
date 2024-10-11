using WheelsOnChain.Shared.Exceptions;

namespace WheelsOnChain.Modules.Users.Application.Exceptions;

public class InvalidUserPasswordException : WheelsOnChainExcpetion
{
    public InvalidUserPasswordException(string username) : base($"Username {username} provided invalid password")
    {
    }
}

