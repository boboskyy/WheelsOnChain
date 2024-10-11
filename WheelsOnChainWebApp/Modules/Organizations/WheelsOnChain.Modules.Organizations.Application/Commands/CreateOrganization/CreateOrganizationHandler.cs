using MediatR;
using WheelsOnChain.Modules.Organizations.Application.Exceptions;
using WheelsOnChain.Modules.Organizations.Application.Repositories;
using WheelsOnChain.Modules.Organizations.Domain.Entities;

namespace WheelsOnChain.Modules.Organizations.Application.Commands.CreateOrganization;

public class CreateOrganizationHandler : IRequestHandler<CreateOrganizationCommand>
{
    private readonly IOrganizationRepository _organizationRepository;
    
    public CreateOrganizationHandler(IOrganizationRepository organizationRepository)
    {
        _organizationRepository = organizationRepository;
    }
    
    public async Task Handle(CreateOrganizationCommand request, CancellationToken cancellationToken)
    {
        var organization = await _organizationRepository.GetByAddressList(new[] { request.Address });
        if (organization.Any()) 
            throw new OrganizationAddressTakenException(request.Address);

        var newOrganization = Organization.CreateOrganization(request.Name, request.Address, request.Trustiness);
        await _organizationRepository.AddAsync(newOrganization);
    }
}