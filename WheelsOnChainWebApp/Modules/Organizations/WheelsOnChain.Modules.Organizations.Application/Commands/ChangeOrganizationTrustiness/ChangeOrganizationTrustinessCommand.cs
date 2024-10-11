using MediatR;
using WheelsOnChain.Modules.Organizations.Domain.Enums;

namespace WheelsOnChain.Modules.Organizations.Application.Commands.ChangeOrganizationTrustiness;

public class ChangeOrganizationTrustinessCommand : IRequest
{
    public Guid OrganizationId { get; set; }
    public Trustiness Trustiness { get; set; }
}