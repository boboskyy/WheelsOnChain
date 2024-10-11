using MediatR;
using WheelsOnChain.Modules.Organizations.Domain.Enums;

namespace WheelsOnChain.Modules.Organizations.Application.Commands.CreateOrganization;

public record CreateOrganizationCommand
(
    string Address,
    string Name,
    Trustiness Trustiness
) : IRequest;