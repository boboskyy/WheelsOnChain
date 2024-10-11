using WheelsOnChain.Shared.Exceptions;

namespace WheelsOnChain.Modules.Organizations.Application.Exceptions;

public class OrganizationAddressTakenException : WheelsOnChainExcpetion
{
    public OrganizationAddressTakenException(string address) : base($"Organization with address {address} already exists")
    {
    }
}
