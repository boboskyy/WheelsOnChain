using MediatR;
using WheelsOnChain.Modules.Organizations.Domain.Enums;

namespace WheelsOnChain.Modules.Organizations.Application.Commands.ChangeOrganization;

public class ChangeOrganizationCommand : IRequest
{
    public Guid OrganizationId { get; set; }
    public string Address { get; set; }
    public string Name { get; set; }
    public Trustiness Trustiness { get; set; }
}