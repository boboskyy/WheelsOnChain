using WheelsOnChain.Shared.Exceptions;

namespace WheelsOnChain.Modules.Organizations.Application.Exceptions;

public class OrganizationNotFoundException : WheelsOnChainExcpetion
{
    public OrganizationNotFoundException(Guid id) : base($"Organization with id {id} not found")
    {
    }
}
