using MediatR;

namespace WheelsOnChain.Modules.Organizations.Application.Commands.DeleteOrganization;

public class DeleteOrganizationCommand : IRequest
{
    public Guid OrganizationId { get; set; }
}